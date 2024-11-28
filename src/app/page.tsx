import Image from "next/image";
import ChartsJsPage from "./components/charts-js/charts-js";
import RechartsPage from "./components/recharts/recharts";
import EchartsPage from "./components/echarts/echarts";
import PlotlyCandlestick from "./components/plotly/plotly";

export default function Home() {
  return (
    <div className="mx-auto w-full  flex items-center justify-center">
      <main className="flex flex-col gap-8 row-start-2 items-start sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <div className="grid grid-cols-2 gap-4">
          <ChartsJsPage />
          <RechartsPage />
          <EchartsPage />
          <PlotlyCandlestick />
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
