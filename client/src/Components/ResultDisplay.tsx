import { useContext } from "react";
import { ShabadContext } from "../Context/ShabadContext";
import "../SCSS/ResultDisplay.scss";
import { Link } from "react-router-dom";

interface Props {
  resultsFromBaniDB: any;
  searchType: string;
}
export default function ResultDisplay({
  resultsFromBaniDB,
  searchType,
}: Props) {
  console.log(resultsFromBaniDB);
  const { shabad, setShabad } = useContext(ShabadContext);
  function handleShabadCcontext(shabadID: number): void {
    setShabad(shabadID);
  }
  console.log(shabad);
  return (
    <>
      <div className="result-display-container">
        <div className="result-display-container-heading">Results</div>
        {searchType === "gurbani"
          ? resultsFromBaniDB.verses.map((gurbani: any, index: number) => {
              return (
                <Link to={"/shabad"} style={{ textDecoration: "none" }}>
                  <div
                    className="result-display-container"
                    key={index}
                    onClick={() => {
                      handleShabadCcontext(gurbani.shabadId);
                    }}
                  >
                    <div className="result-display-gurbani-name">
                      {gurbani.verse.unicode}
                    </div>
                    <div className="result-display-gurbani-ang">
                      Ang Number -{gurbani.pageNo}
                    </div>
                  </div>
                </Link>
              );
            })
          : resultsFromBaniDB.verses.map((bani: any) => {
              return (
                <div className="gurbani-line">{bani.verse.verse.unicode}</div>
              );
            })}
      </div>
    </>
  );
}
