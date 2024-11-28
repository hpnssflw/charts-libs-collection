"use client";

import { Suspense } from "react";
import ReactECharts from "echarts-for-react";
import { generateRandomData } from "@/utils";
import moment from "moment";

const EchartsPage = () => {
  const rawData = generateRandomData();

  const option = {
    backgroundColor: "transparent",
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      formatter: (params: any) => {
        const data = params[0];
        const item = rawData[data.dataIndex];
        const changeColor = item.c >= item.o ? "🟢" : "🔴";
        const change = (((item.c - item.o) / item.o) * 100).toFixed(2);

        return `
          <div class="p-2">
            <div class="font-bold">${moment(item.x).format("YYYY-MM-DD")}</div>
            <div>Open: ${item.o}</div>
            <div>High: ${item.h}</div>
            <div>Low: ${item.l}</div>
            <div>Close: ${item.c}</div>
            <div>Change: ${changeColor} ${change}%</div>
            <div class="border-t mt-2 pt-2">
              <div>Pattern: ${item.analysis.pattern}</div>
              <div>Strength: ${item.analysis.strength}</div>
              <div>Analysis: ${item.analysis.description}</div>
            </div>
          </div>
        `;
      },
    },
    xAxis: {
      type: "category",
      data: rawData.map((item) => moment(item.x).format("MM/DD")),
      axisLabel: {
        color: "#fff",
        fontSize: 11,
        rotate: 30,
      },
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      scale: true,
      axisLabel: {
        color: "#fff",
        fontSize: 11,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "#303030",
        },
      },
    },
    grid: {
      left: "10%",
      right: "10%",
      top: "5%",
      bottom: "15%",
    },
    series: [
      {
        type: "candlestick",
        data: rawData.map((item) => [
          item.o, // open
          item.h, // high
          item.l, // low
          item.c, // close
        ]),
        itemStyle: {
          color: "#4CAF50", // bullish candle color
          color0: "#F44336", // bearish candle color
          borderColor: "#4CAF50", // bullish border color
          borderColor0: "#F44336", // bearish border color
        },
      },
    ],
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="w-full h-[600px] bg-white/10 rounded-lg p-4">
        <ReactECharts
          option={option}
          style={{ height: "100%", width: "100%" }}
          opts={{ renderer: "canvas" }}
          notMerge={true}
          lazyUpdate={true}
        />
      </div>
    </Suspense>
  );
};

export default EchartsPage;
