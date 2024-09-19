import { useEffect, useState } from "react";
import "../SCSS/ResultDisplay.scss";
interface Props {
  resultsFromBaniDB: any;
  searchType: string;
}
export default function ResultDisplay({
  resultsFromBaniDB,
  searchType,
}: Props) {
  console.log(resultsFromBaniDB);
  return (
    <>
      <div className="result-display-container">
        <div className="result-display-container-heading">Results</div>
        {searchType === "gurbani"
          ? resultsFromBaniDB.verses.map((gurbani: any, index: number) => {
              return (
                <div className="result-display-container" key={index}>
                  <div className="result-display-gurbani-name">
                    {gurbani.verse.unicode}
                  </div>
                  <div className="result-display-gurbani-ang">
                    Ang Number -{gurbani.pageNo}
                  </div>
                </div>
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
