/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Suspense } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import moment from "moment";
import { generateRandomData } from "@/utils";

// Define types
interface RawCandleData {
  x: number;
  o: number;
  h: number;
  l: number;
  c: number;
  analysis: {
    pattern: string;
    strength: "weak" | "moderate" | "strong";
    description: string;
  };
}

interface ProcessedCandleData {
  x: number;
  high: number;
  low: number;
  openClose: [number, number]; // [open, close]
  analysis: {
    pattern: string;
    strength: "weak" | "moderate" | "strong";
    description: string;
  };
}

// Prepare data function
const prepareData = (data: RawCandleData[]): ProcessedCandleData[] => {
  return data.map(({ o, c, h, l, x, analysis }) => ({
    x,
    high: h,
    low: l,
    openClose: [o, c],
    analysis,
  }));
};

// Custom candlestick component
const Candlestick = (props: any) => {
  const {
    x,
    y,
    width,
    height,
    low,
    high,
    openClose: [open, close],
  } = props;

  console.log("Candlestick props:", {
    x,
    y,
    width,
    height,
    low,
    high,
    open,
    close,
  }); // Debug log

  const isGrowing = close > open;
  const color = isGrowing ? "#4CAF50" : "#F44336";

  // Adjust width to prevent overlap
  const candleWidth = width * 0.8; // Make candle 80% of available width
  const xCenter = x + (width - candleWidth) / 2;

  return (
    <g stroke={color} fill={color}>
      {/* Wick */}
      <line
        x1={xCenter + candleWidth / 2}
        y1={y}
        x2={xCenter + candleWidth / 2}
        y2={y + height}
        strokeWidth={1}
      />
      {/* Body */}
      <rect x={xCenter} y={y} width={candleWidth} height={height} />
    </g>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const [open, close] = data.openClose;
    const changeColor = close >= open ? "🟢" : "🔴";
    const change = (((close - open) / open) * 100).toFixed(2);

    return (
      <div className="bg-gray-800/90 p-4 rounded-lg shadow-lg">
        <p className="text-white font-bold mb-2">
          {moment(data.x).format("YYYY-MM-DD")}
        </p>
        <p className="text-white">Open: {open}</p>
        <p className="text-white">High: {data.high}</p>
        <p className="text-white">Low: {data.low}</p>
        <p className="text-white">Close: {close}</p>
        <p className="text-white">
          Change: {changeColor} {change}%
        </p>
        <div className="mt-2 pt-2 border-t border-gray-600">
          <p className="text-white">Pattern: {data.analysis.pattern}</p>
          <p className="text-white">Strength: {data.analysis.strength}</p>
          <p className="text-white">Analysis: {data.analysis.description}</p>
        </div>
      </div>
    );
  }
  return null;
};

export default function RechartsPage() {
  const rawData = generateRandomData();
  const data = prepareData(rawData as RawCandleData[]);

  // Calculate min and max for domain
  const minValue = data.reduce(
    (min, { low, openClose: [open, close] }) => Math.min(min, low, open, close),
    Infinity
  );

  const maxValue = data.reduce(
    (max, { high, openClose: [open, close] }) =>
      Math.max(max, high, open, close),
    -Infinity
  );

  return (
    <Suspense
      fallback={
        <div className="text-center text-9xl text-red-500">Loading...</div>
      }
    >
      <div className="w-full h-[600px] bg-white/10 rounded-xl p-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis
              dataKey="x"
              tickFormatter={(timestamp) => moment(timestamp).format("MM/DD")}
              type="number"
              domain={["dataMin", "dataMax"]}
              scale="time"
            />
            <YAxis domain={[minValue, maxValue]} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="openClose" shape={<Candlestick />} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Suspense>
  );
}
