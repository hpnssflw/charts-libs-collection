"use client";

import { Suspense } from "react";
import CandlestickChart from "./components/candlestick";
import { generateRandomData } from "@/utils";

// Update data generator with analysis

export default function ChartsJsPage() {
  // const [mockData, setMockData] = useState<unknown[]>([]);

  return (
    <Suspense
      fallback={
        <div className="text-center text-9xl text-red-500">Loading...</div>
      }
    >
      <div className="w-full h-full bg-white/10 rounded-xl p-4">
        <CandlestickChart data={generateRandomData()} />
      </div>
    </Suspense>
  );
}
