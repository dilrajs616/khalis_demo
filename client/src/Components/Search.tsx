import Navbar from "./Navbar";
import "../SCSS/Search.scss";
import { useRef, useState } from "react";
import { CiMicrophoneOn } from "react-icons/ci";
export default function Search() {
  const [isRecording, setisRecording] = useState(false);
  const recorderRef = useRef<any>(null);
  let chunks: any = [];
  let result: any;
  async function listenToVoice() {
    if (isRecording) {
      recorderRef.current.stop();
      setisRecording(false);
    } else {
      let stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      recorderRef.current = new MediaRecorder(stream);

      recorderRef.current.ondataavailable = (e: BlobEvent) => {
        chunks.push(e.data);
      };
      recorderRef.current.onstop = async () => {
        let voiceBlog = new Blob(chunks, { type: "audio/wav" });
        chunks = [];
        if (voiceBlog) {
          let reader = new FileReader();
          reader.readAsDataURL(voiceBlog);
          reader.onload = async () => {
            result =
              typeof reader.result == "string"
                ? reader.result.split(",")[1]
                : reader.result;
            console.log(result, typeof result);
          };
          let url = "http://localhost:3000/api/transcript";
          try {
            let response = await fetch(url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ audioData: result }),
            });
            if (!response.ok) {
              console.log("error", response.status);
            } else {
              let data = await response.json();
              console.log(data);
            }
          } catch (e: any) {
            console.log(e.message);
          }
        }
      };
      recorderRef.current.start();
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
