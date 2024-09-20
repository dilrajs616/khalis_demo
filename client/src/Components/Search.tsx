import Navbar from "./Navbar";
import "../SCSS/Search.scss";
import { useRef, useState } from "react";
import { CiMicrophoneOn } from "react-icons/ci";
import toast from "react-hot-toast";
import { CiSearch } from "react-icons/ci";
import ResultDisplay from "./ResultDisplay";
import { banis } from "../Data/Bani";

export default function Search() {
  const [isRecording, setisRecording] = useState(false);
  const recorderRef = useRef<any>(null);
  const resultRef = useRef<any>(null);
  let streamRef = useRef<any>(null);
  let baniRef = useRef<number>(0);
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
        toast.success("LISTENING STOPPED, MIC OFF");
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

                if (inputRef.current) {
                  inputRef.current.value = data.transcript;
                  if (searchType != "gurabni") {
                    console.log(data.transcript);

                    banis.forEach((bani) => {
                      if (data.transcript == bani.gurmukhiUni) {
                        console.log(bani);
                        baniRef.current = bani.ID;
                      }
                    });
                  }
                }
              }
            } catch (e: any) {
              console.log(e.message);
            }
          };
        }
      };
      recorderRef.current.start();
      toast.success("LISTENING");
      setisRecording(true);
    }
  }
  console.log(searchType);
  async function getGurbani(e: any) {
    e.preventDefault();
    banis.forEach((bani) => {
      if (inputRef.current?.value == bani.gurmukhiUni) {
        console.log(bani);
        baniRef.current = bani.ID;
      }
    });
    const baniDBURL =
      searchType === "gurbani"
        ? `https://api.banidb.com/v2/search/${inputRef.current?.value}?searchtype=1&source=all`
        : `https://api.banidb.com/v2/banis/${baniRef.current}`;
    let response = await fetch(baniDBURL);
    if (!response.ok) {
      console.log("error");
    } else {
      let data = await response.json();
      setresult(data);
    }
  }
  function handleTypeChnage(e: any) {
    setsearchType(e.target.value);
  }
  return (
    <>
      <div className="search-parent-container">
        <Navbar />
        <div className="content-container">
          <div className="main-heading">ਗੁਰਬਾਣੀ ਖੋਜ</div>
          <div className="search-input-box-container">
            <form className="form" onSubmit={getGurbani}>
              <div className="wrapper">
                <input
                  type="search"
                  placeholder="Enter your input please"
                  id="search-box"
                  ref={inputRef}
                />
                {/* <button className="mic-btn"> */}
                <CiMicrophoneOn
                  size={45}
                  onClick={listenToVoice}
                  className={isRecording ? "mic-working" : "mic-btn"}
                  color="#fd9a10f1"
                />
                {/* </button> */}
                <button type="submit" className="search-icon">
                  <CiSearch size={40} onClick={getGurbani} />
                </button>
              </div>
              <select name="" id="search-type" onChange={handleTypeChnage}>
                <option value="gurbani" className="option">
                  Gurbani
                </option>
                <option value="bani" className="option">
                  Bani (Enter Bani Name)
                </option>
              </select>
            </form>
          </div>
          <div className="results">
            {result !== null ? (
              <ResultDisplay
                resultsFromBaniDB={result}
                searchType={searchType}
              />
            ) : undefined}
          </div>
        </div>
      </div>
    </>
  );
}
