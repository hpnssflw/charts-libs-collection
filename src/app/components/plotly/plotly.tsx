"use client";

import dynamic from "next/dynamic";
import { generateRandomData } from "@/utils";

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
  loading: () => <div>Loading chart...</div>,
});

const PlotlyCandlestick = () => {
  const candleData = generateRandomData(30);

  // Transform the data for Plotly format
  const plotlyData = {
    x: candleData.map((d) => new Date(d.x).toISOString()),
    open: candleData.map((d) => d.o),
    high: candleData.map((d) => d.h),
    low: candleData.map((d) => d.l),
    close: candleData.map((d) => d.c),
  };

  return (
    <Plot
      data={[
        {
          x: plotlyData.x,
          open: plotlyData.open,
          high: plotlyData.high,
          low: plotlyData.low,
          close: plotlyData.close,
          type: "candlestick",
          xaxis: "x",
          yaxis: "y",
          increasing: { line: { color: "#26A69A" } },
          decreasing: { line: { color: "#EF5350" } },
        },
      ]}
      layout={{
        title: "Candlestick Chart",
        paper_bgcolor: "#1a1a1a",
        plot_bgcolor: "#1a1a1a",
        font: {
          color: "#ffffff",
        },
        xaxis: {
          title: "Date",
          gridcolor: "#303030",
          zerolinecolor: "#303030",
          rangeslider: { visible: false },
        },
        yaxis: {
          title: "Price",
          gridcolor: "#303030",
          zerolinecolor: "#303030",
        },
        margin: { t: 40, b: 40, r: 40, l: 40 },
        autosize: true,
        height: 600,
      }}
      style={{ width: "100%", height: "100%" }}
      useResizeHandler={true}
    />
  );
};

export default PlotlyCandlestick;
