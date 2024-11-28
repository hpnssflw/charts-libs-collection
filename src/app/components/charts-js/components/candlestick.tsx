import React, { useEffect, useRef } from "react";
import {
  Chart,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";
import {
  CandlestickController,
  CandlestickElement,
} from "chartjs-chart-financial";
import "chartjs-adapter-moment";
import moment from "moment";
import { EnhancedCandleData } from "../types";

// Register required components
Chart.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  CandlestickController,
  CandlestickElement,
  Tooltip
);

const CandlestickChart = ({ data }: { data?: EnhancedCandleData[] }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    const chart = new Chart(ctx, {
      type: "candlestick",
      data: {
        datasets: [
          {
            label: "Price",
            data: data?.map((d) => ({
              x: typeof d.x === "string" ? moment(d.x).valueOf() : d.x,
              o: d.o,
              h: d.h,
              l: d.l,
              c: d.c,
              analysis: d.analysis, // Pass through the analysis data
            })),
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            type: "time",
            time: {
              unit: "day",
            },
          },
          y: {
            type: "linear",
          },
        },
        interaction: {
          mode: "index",
          intersect: false,
        },
        plugins: {
          tooltip: {
            enabled: true,
            callbacks: {
              label: (context) => {
                const data = context.raw as EnhancedCandleData;
                const change = (((data.c - data.o) / data.o) * 100).toFixed(2);
                const changeColor = data.c >= data.o ? "🟢" : "🔴";

                return [
                  `Open: ${data.o}`,
                  `High: ${data.h}`,
                  `Low: ${data.l}`,
                  `Close: ${data.c}`,
                  `Change: ${changeColor} ${change}%`,
                  ``,
                  `Pattern: ${data.analysis.pattern}`,
                  `Strength: ${data.analysis.strength}`,
                  `Analysis: ${data.analysis.description}`,
                ];
              },
              // title: (tooltipItems) => {
              //   return moment(tooltipItems[0].parsed.x).format("YYYY-MM-DD");
              // },
              labelTextColor: (context) => {
                const data = context.raw as EnhancedCandleData;
                switch (data.analysis.type) {
                  case "bullish":
                    return "#4CAF50";
                  case "bearish":
                    return "#F44336";
                  default:
                    return "#9E9E9E";
                }
              },
            },
          },
        },
      },
    });

    return () => chart.destroy();
  }, [data]);

  return <canvas ref={chartRef} width={768} height={500} />;
};

export default CandlestickChart;
