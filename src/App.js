import array from "./db";
import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

import "./App.css";

function App() {
  // console.log(data);
  const data = [...array];
  const [persentageForUv, setPersentageForUv] = useState(null);
  const [persentageForPv, setPersentageForPv] = useState(null);
  const [persentageForAmt, setPersentageForAmt] = useState(null);

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

      item["one" + prop] =
        Math.round((variance + avarage + Number.EPSILON) * 100) / 100;
      item["zScore" + prop] = zScore; // значения когда zScore = 1
      // console.log(item);
    });
  };
  const getMax = (prop) => {
    const dataMax = Math.max(...data.map((i) => i[prop]));

    if (dataMax <= 0) {
      return 0;
    }

    return dataMax;
  };
  useEffect(() => {
    newArr("uv");
    newArr("pv");
    newArr("amt");
    setPersentageForUv(100 - (data[0].oneuv * 100) / getMax("uv"));
    setPersentageForPv(100 - (data[0].onepv * 100) / getMax("pv"));
    setPersentageForAmt(100 - (data[0].onepv * 100) / getMax("amt"));
  }, []);

  // console.log(data);
  // console.log(persentageForPv);
  return (
    <ResponsiveContainer width="100%" height="100%" aspect={3}>
      <AreaChart
        width={500}
        height={500}
        data={data}
        margin={{
          top: 50,
          right: 20,
          left: 10,
          bottom: 5,
        }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset={`${persentageForUv}%`}
              stopColor="red"
              stopOpacity={0.7}
            />
            <stop
              offset={`${persentageForUv}%`}
              stopColor="#8884d8"
              stopOpacity={0.6}
            />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset={`${persentageForPv}%`}
              stopColor="red"
              stopOpacity={0.7}
            />
            <stop
              offset={`${persentageForPv}%`}
              stopColor="#82ca9d"
              stopOpacity={0.6}
            />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset={`${persentageForAmt}%`}
              stopColor="red"
              stopOpacity={0.7}
            />
            <stop
              offset={`${persentageForAmt}%`}
              stopColor="#f9e75e"
              stopOpacity={0.6}
            />
            <stop offset="95%" stopColor="#f9e75e" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid opacity={0.1} vertical={false} />
        <XAxis
          dataKey="name"
          tick={{ fill: "#fff" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: "#fff" }}
          axisLine={false}
          tickLine={false}
          tickCount={8}
        />
        <Tooltip
          contentStyle={{ backgroundColor: "#1c2e52", color: "#fff" }}
          cursor={false}
        />
        {/* <Tooltip /> */}
        {/* <CartesianGrid strokeDasharray="3 3" /> */}

        <Legend />
        <ReferenceLine
          y={data[0].oneuv}
          x="page A"
          label="Z-Score > 1  in uv"
          strokeOpacity={0.5}
          stroke="red"
          strokeWidth={2}
          strokeDasharray="3 3"
        />
        <ReferenceLine
          y={data[0].onepv}
          x="page A"
          label="Z-Score > 1  in pv"
          strokeOpacity={0.5}
          stroke="red"
          strokeWidth={2}
          strokeDasharray="3 3"
        />
        {/* <ReferenceLine
          y={data[0].oneamt}
          x="page A"
          label="Z-Score > 1"
          strokeOpacity={0.5}
          stroke="red"
          strokeWidth={2}
          strokeDasharray="3 3"
        /> */}
        <Area
          type="monotone"
          dataKey="uv"
          stroke="#8884d8"
          dot={{ fill: "#8884d8", r: 5 }}
          activeDot={{ r: 8 }}
          fillOpacity={0.6}
          fill="url(#colorUv)"
        />
        {/* <Area
          type="monotone"
          dataKey="amt"
          stroke="#f9e75e"
          dot={{ fill: "#f9e75e", r: 5 }}
          activeDot={{ r: 8 }}
          fillOpacity={0.6}
          fill="url(#colorAmt)"
        /> */}
        <Area
          type="monotone"
          dataKey="pv"
          stroke="#82ca9d"
          dot={{ fill: "#82ca9d", r: 5 }}
          activeDot={{ r: 8 }}
          fillOpacity={0.6}
          fill="url(#colorPv)"
        />
        {/* <Area
          type="monotone"
          dataKey="oneuv" // значения когда zScore = 1
          stroke="red"
          activeDot={{ r: 8 }}
          fillOpacity={0.1}
          fill="url(#colorUv)"
        /> */}
        {/* <Area
          type="monotone"
          dataKey="onepv" // значения когда zScore = 1
          stroke="black"
          activeDot={{ r: 8 }}
          fillOpacity={0.1}
          fill="url(#colorPv)"
        /> */}
        {/* <Area
          type="monotone"
          dataKey="zScoreuv"
          stroke="black"
          activeDot={{ r: 8 }}
          fillOpacity={0.1}
          fill="url(#colorUv)"
        /> */}
        {/* <Area 
        type="monotone" 
        dataKey="amt" 
        stroke="red" 
        activeDot={{ r: 8 }} 
      /> */}
        {/* <Area
        type="monotone"
        dataKey="zScorepv"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      /> */}
        {/* <Area
        type="monotone"
        dataKey="zScoreamt"
        stroke="red"
        activeDot={{ r: 8 }}
      /> */}
        {/* <Area 
        type="monotone" 
        dataKey="zScoreuv" 
        stroke="green" 
        activeDot={{ r: 8 }} 
      />  */}
        {/* <Area
          type="monotone"
          dataKey="oneuv"
          stroke="green"
          activeDot={{ r: 8 }}
        />
        <Area
          type="monotone"
          dataKey="onepv"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        /> */}
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default App;
