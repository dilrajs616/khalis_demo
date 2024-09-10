import Navbar from "./Navbar";
import "../SCSS/Search.scss";
import { useState } from "react";
import toast from "react-hot-toast";
import { CiMicrophoneOn } from "react-icons/ci";
export default function Search() {
  // const [timingForMic, settimingForMic] = useState(5);
  // function handleTimingChange(time: number) {
  //   settimingForMic(time);
  //   toast.success(`Mic Time Changed to ${time} seconds`);
  // }
  return (
    <>
      <div className="search-parent-container">
        <Navbar />
        <div className="content-container">
          {/* <div className="timing-tab-container">
            <label htmlFor="" className="timing-label">
              Select Timing For Mic:
            </label>
            <div
              className={
                timingForMic === 5
                  ? "timing-tab timing-tab-active"
                  : "timing-tab"
              }
              onClick={() => handleTimingChange(5)}
            >
              5 sec
            </div>
            <div
              className={
                timingForMic === 10
                  ? "timing-tab timing-tab-active"
                  : "timing-tab"
              }
              onClick={() => handleTimingChange(10)}
            >
              10 sec
            </div>
          </div> */}
          <div className="main-heading">Search Gurbani</div>
          <div className="search-input-box-container">
            <input
              type="search"
              placeholder="Enter your input please"
              id="search-box"
            />
            <button className="mic-btn">
              <CiMicrophoneOn size={45} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
