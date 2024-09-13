import Navbar from "./Navbar";
import "../SCSS/Search.scss";
import { useRef, useState } from "react";
import { CiMicrophoneOn } from "react-icons/ci";
import toast from "react-hot-toast";

export default function Search() {
  const [isRecording, setisRecording] = useState(false);
  const recorderRef = useRef<any>(null);
  const resultRef = useRef<any>(null);
  let streamRef = useRef<any>(null);
  let chunks: any = [];

  async function listenToVoice() {
    if (isRecording) {
      recorderRef.current.stop();
      streamRef.current.getTracks().forEach((track: any) => track.stop());
      setisRecording(false);
    } else {
      streamRef.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      recorderRef.current = new MediaRecorder(streamRef.current);
      recorderRef.current.ondataavailable = (e: BlobEvent) => {
        chunks.push(e.data);
      };
      recorderRef.current.onstop = async () => {
        toast.success("Mic Off");
        let voiceBlog = new Blob(chunks, { type: "audio/wav" });
        chunks = [];
        if (voiceBlog) {
          let reader = new FileReader();
          reader.readAsDataURL(voiceBlog);
          reader.onload = async () => {
            if (reader.result) {
              resultRef.current = reader.result.toString().split(",")[1];
            }
            let url = "http://localhost:3000/api/transcript";
            try {
              let response = await fetch(url, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ audioData: resultRef.current }),
              });
              if (!response.ok) {
                toast.error("Error Occurred");
              } else {
                let data = await response.json();
                console.log(data);
              }
            } catch (e: any) {
              console.log(e.message);
            }
          };
        }
      };
      recorderRef.current.start();
      toast.success("Mic On");
      setisRecording(true);
    }
  }

  return (
    <>
      <div className="search-parent-container">
        <Navbar />
        <div className="content-container">
          <div className="main-heading">ਗੁਰਬਾਣੀ ਖੋਜ</div>
          <div className="search-input-box-container">
            <input
              type="search"
              placeholder="Enter your input please"
              id="search-box"
            />
            <button className="mic-btn">
              <CiMicrophoneOn size={45} onClick={listenToVoice} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
