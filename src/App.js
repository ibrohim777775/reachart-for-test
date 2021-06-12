import data from "./db";
import "./App.css";
import { useState } from "react";

function App() {
  // console.log(data);
  const [newData, setNewData] = useState([]);

  const arr = [...data];
  console.log(arr);
  const newArr = (prop) => {
    let sum = 0;
    data.forEach((item) => (sum += item[prop]));
    let avarage = sum / data.length; // Среднее значение
    let variance = 0; // Стандартное отклонение
    let sumVariance = 0;
    data.forEach((item) => {
      // console.log(item);
      sumVariance += (item[prop] - avarage) ** 2;
    });
    variance = Math.sqrt(sumVariance / data.length); // Стандартное отклонение
    let zScore;
    data.map((item) => {
      zScore =
        Math.round(((item[prop] - avarage) / variance + Number.EPSILON) * 100) /
        100; // Z-Score
      console.log(item.name, item[prop], " da z-score", zScore, " boladi");
    });
    return variance;
  };
  newArr("uv");
  newArr("pv");
  newArr("amt");

  return (
    <div className="App">
      {data.map((item) => (
        <div key={item.uv}>
          <table>
            <tbody>
              <tr>
                <td>
                  <p>{item.name}</p>
                </td>
                <td>
                  <p>{item.uv}</p>
                </td>
                <td>
                  <p>{item.pv}</p>
                </td>
                <td>
                  <p>{item.amt}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default App;
