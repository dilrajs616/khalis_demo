import Navbar from "./Navbar";
import "../SCSS/Search.scss";
import { useState } from "react";
import toast from "react-hot-toast";
export default function Search() {
  const [timingForMic, settimingForMic] = useState(5);
  function handleTimingChange(time: number) {
    settimingForMic(time);
    toast.success(`Mic Time Changed to ${time} seconds`);
  }
  return (
    <>
      <div className="search-parent-container">
        <Navbar />
        <div className="content-container">
          <div className="timing-tab-container">
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
          </div>
        </div>
      </div>
    </>
  );
}
