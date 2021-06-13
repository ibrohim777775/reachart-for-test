// import data from "./db";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import "./App.css";

function App() {
  // console.log(data);
  const [newData, setNewData] = useState([]);
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
      oneuv: 3509.23,
      zScoreuv: 1.69,
      onepv: 6819.94,
      zScorepv: -0.78,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
      oneuv: 3509.23,
      zScoreuv: 0.29,
      onepv: 6819.94,
      zScorepv: -1.19,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
      oneuv: 3509.23,
      zScoreuv: -1.11,
      onepv: 6819.94,
      zScorepv: 2.2,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
      oneuv: 3509.23,
      zScoreuv: -0.02,
      onepv: 6819.94,
      zScorepv: -0.18,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
      oneuv: 3509.23,
      zScoreuv: -1.26,
      onepv: 6819.94,
      zScorepv: 0.18,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
      oneuv: 3509.23,
      zScoreuv: -0.56,
      onepv: 6819.94,
      zScorepv: -0.22,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
      oneuv: 3509.23,
      zScoreuv: 0.97,
      onepv: 6819.94,
      zScorepv: -0.02,
    },
  ];

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
      console.log(avarage, "ortacha qiymat");
      console.log(variance, "otkloneniya");
      item["one" + prop] =
        Math.round((variance + avarage + Number.EPSILON) * 100) / 100;
      item["zScore" + prop] = zScore;
      // console.log(item.name, item[prop], " da z-score", zScore, " boladi");
      console.log(item);
    });
  };
  useEffect(() => {
    // newArr("uv");
    // newArr("pv");
  }, []);
  // newArr("amt");
  console.log(data);
  return (
    <ResponsiveContainer width="100%" aspect={3}>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="pv"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="uv"
          stroke="green"
          activeDot={{ r: 8 }}
        />
        {/* <Line 
        type="monotone" 
        dataKey="amt" 
        stroke="red" 
        activeDot={{ r: 8 }} 
      /> */}
        {/* <Line
        type="monotone"
        dataKey="zScorepv"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      /> */}
        {/* <Line
        type="monotone"
        dataKey="zScoreamt"
        stroke="red"
        activeDot={{ r: 8 }}
      /> */}
        {/* <Line 
        type="monotone" 
        dataKey="zScoreuv" 
        stroke="green" 
        activeDot={{ r: 8 }} 
      />  */}
        <Line
          type="monotone"
          dataKey="oneuv"
          stroke="green"
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="onepv"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default App;
