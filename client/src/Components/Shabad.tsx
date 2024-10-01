import Navbar from "./Navbar";
import "../SCSS/Shabad.scss";
import { useContext, useEffect, useState } from "react";
import { ShabadContext } from "../Context/ShabadContext";
import toast from "react-hot-toast";

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
          {shabadData != null
            ? shabadData.verses.map((shabad: any, index: number) => {
                return (
                  <p className="shabad-line" key={index}>
                    {shabad.verse.unicode}
                  </p>
                );
              })
            : undefined}
        </div>
      </div>
    </>
  );
}
