import Navbar from "./Navbar";
import "../SCSS/Shabad.scss";
import { useContext, useEffect, useState } from "react";
import { ShabadContext } from "../Context/ShabadContext";

export default function Shabad() {
  const { shabad } = useContext(ShabadContext);
  const [shabadData, setShabadData] = useState<any>();

  useEffect(() => {
    async function getShabad() {
      try {
        const response = await fetch(
          `https://api.banidb.com/v2/shabads/${shabad}`
        );
        if (!response.ok) {
          console.log(response.status);
        } else {
          const data = await response.json();
          console.log(data.verses[0].verse);
          setShabadData(data);
        }
      } catch (e: any) {
        console.log(e.message);
      }
    }
    getShabad();
  }, [0]);
  return (
    <>
      <div className="shabad-container">
        <Navbar />
        <div className="shabad-content-container">
          {shabadData.verses.map((shabad: any) => {
            return <p className="shabad-line">{shabad.verse.unicode}</p>;
          })}
        </div>
      </div>
    </>
  );
}
