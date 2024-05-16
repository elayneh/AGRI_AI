export interface UserProfilePageProps {
    handleImageSubmit: (value:File)=>void;
    predictedDisease:string;
    diseaseTitle:string;
}
type OnCaptureFunction = (imageSrc: string) => void;

export interface CustomWebcamProps{
    onCapture: OnCaptureFunction;
}