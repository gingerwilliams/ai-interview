import { useState, useRef } from "react";
import Mic from "./Mic";

const AudioRecorder = ({ onStop, disabled }) => {
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const streamRef = useRef(null)

  const startRecording = async () => {
	  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
	  streamRef.current = stream

    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    audioChunksRef.current = [];

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunksRef.current.push(event.data);
      }
    };

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/mp3" });
      
      onStop(audioBlob);
    };

    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
	    streamRef.current.getTracks().forEach(track => track.stop());
      setRecording(false);
    }
  };

  const onClick = (e) => {
    e.preventDefault()
    if (disabled) return;

    if (recording) {
      stopRecording()
    } else {
      startRecording()
    }
  }

  return (
    <div className="mt-2">
      <button 
        className="w-7"
        onClick={onClick}>
          <Mic fill={recording ? "#ff0000" : "#000000" } />
	    </button>
    </div>
  );
}

export default AudioRecorder;