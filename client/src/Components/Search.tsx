import Navbar from "./Navbar";
import "../SCSS/Search.scss";
import { useRef, useState } from "react";
import { CiMicrophoneOn } from "react-icons/ci";
import toast from "react-hot-toast";
import { CiSearch } from "react-icons/ci";
import ResultDisplay from "./ResultDisplay";

export default function Search() {
  const [isRecording, setisRecording] = useState(false);
  const recorderRef = useRef<any>(null);
  const resultRef = useRef<any>(null);
  let streamRef = useRef<any>(null);
  let chunks: any = [];
  let inputRef = useRef<HTMLInputElement>(null);
  const [result, setresult] = useState<any>(null);
  const [searchType, setsearchType] = useState<string>("gurbani");

  async function listenToVoice(e: any) {
    e.preventDefault();
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
            let url = "https://gurbani-search.onrender.com/transcript";
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
                if (inputRef.current) {
                  inputRef.current.value = data.transcript;
                }
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
  async function getGurbani(e: any, transcript?: any) {
    e.preventDefault();
    const baniDBURL = `https://api.banidb.com/v2/search/${
      transcript || inputRef.current?.value
    }?searchtype=2&source=all`;
    let response = await fetch(baniDBURL);
    if (!response.ok) {
      console.log("error");
    } else {
      let data = await response.json();
      setresult(data.verses);
    }
  }

  return (
    <>
      <div className="search-parent-container">
        <Navbar />
        <div className="content-container">
          <div className="main-heading">ਗੁਰਬਾਣੀ ਖੋਜ</div>
          <div className="search-input-box-container">
            <form className="form" onSubmit={getGurbani}>
              <input
                type="search"
                placeholder="Enter your input please"
                id="search-box"
                ref={inputRef}
              />
              <button className="mic-btn">
                <CiMicrophoneOn size={45} onClick={listenToVoice} />
              </button>
              <button type="submit" className="search-icon">
                <CiSearch size={40} onClick={getGurbani} />
              </button>
            </form>
          </div>
          <div className="results">
            {result !== null ? (
              <ResultDisplay resultsFromBaniDB={result} />
            ) : undefined}
          </div>
        </div>
      </div>
    </>
  );
}
