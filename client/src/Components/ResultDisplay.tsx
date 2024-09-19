import { useEffect, useState } from "react";
import "../SCSS/ResultDisplay.scss";
interface Props {
  resultsFromBaniDB: any;
}
export default function ResultDisplay({ resultsFromBaniDB }: Props) {
  const [verse, setverse] = useState(null);

  return (
    <>
      <div className="result-display-container">
        <div className="result-display-container-heading">Results</div>
        {resultsFromBaniDB.map((gurbani: any, index: number) => {
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
        })}
      </div>
    </>
  );
}
