from flask import Flask, render_template, request, jsonify
import os
import cv2
import numpy as np
from keras.models import load_model
from flask_cors import CORS

app = Flask(__name__)
CORS(app,origins='*') 
# Define constants
img_size = 64
label_to_disease = {
    "0001": "Healthy",
    "0010": "Root rot",
    "1000": "Leaf rust",
    "0100": "Loose smut"
}

# Load the pre-trained model
loaded_model = load_model('wheatDiseaseModel.h5')

def predict_disease(image):
    # Convert image to RGB (OpenCV uses BGR by default)
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

    # Resize the image to the required size
    resized_image = cv2.resize(image_rgb, (img_size, img_size))

    # Normalize pixel values to [0, 1]
    preprocessed_image = resized_image / 255.0

    # Expand dimensions to create batch of size 1
    preprocessed_image = np.expand_dims(preprocessed_image, axis=0)

    # Make prediction
    prediction = loaded_model.predict(preprocessed_image)

    # Round the prediction to get binary labels
    rounded_prediction = np.round(prediction).astype(int)

    # Convert the rounded prediction to a string label
    predicted_label = ''.join(map(str, rounded_prediction[0]))
    # Determine the predicted disease based on label
    if predicted_label in label_to_disease:
        predicted_disease = label_to_disease[predicted_label]
    else:
        predicted_disease = "Unknown Disease"

    return predicted_disease

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    # Check if POST request contains file part
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']

    # Check if the file is empty
    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    # Check if the file is allowed
    allowed_extensions = {'png', 'jpg', 'jpeg'}
    if '.' not in file.filename or file.filename.rsplit('.', 1)[1].lower() not in allowed_extensions:
        return jsonify({'error': 'Invalid file type'})

    # Read the image file
    image = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_COLOR)

    if image is None:
        return jsonify({'error': 'Failed to read image'})

    # Perform disease prediction
    predicted_disease = predict_disease(image)

    # Return the predicted disease
    return jsonify({'predicted_disease': predicted_disease})

if __name__ == '__main__':
    app.run(debug=True)