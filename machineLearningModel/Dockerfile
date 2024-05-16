FROM python:3.11

WORKDIR /app

# Install necessary packages for OpenCV
RUN apt-get update && \
    apt-get install -y libgl1-mesa-glx libglib2.0-0

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

CMD ["gunicorn", "main:app", "--bind", "0.0.0.0:5500"]