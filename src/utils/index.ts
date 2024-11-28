import moment from "moment";
import {
  CandleType,
  EnhancedCandleData,
} from "@/app/components/charts-js/types";

export const generateRandomData = (
  count: number = 60
): EnhancedCandleData[] => {
  const patterns = [
    {
      type: "bullish",
      pattern: "Hammer",
      description: "Potential reversal signal after downtrend",
    },
    {
      type: "bullish",
      pattern: "Morning Star",
      description: "Strong bottom reversal pattern",
    },
    {
      type: "bearish",
      pattern: "Shooting Star",
      description: "Potential reversal signal after uptrend",
    },
    {
      type: "bearish",
      pattern: "Evening Star",
      description: "Strong top reversal pattern",
    },
    { type: "neutral", pattern: "Doji", description: "Market indecision" },
  ];

  const data: EnhancedCandleData[] = [];
  let date = moment().subtract(count, "days");
  let lastClose = 100;

  for (let i = 0; i < count; i++) {
    while (date.day() === 0 || date.day() === 6) {
      date = date.add(1, "days");
    }

    const open = +(lastClose * (0.95 + Math.random() * 0.1)).toFixed(2);
    const close = +(open * (0.95 + Math.random() * 0.1)).toFixed(2);
    const high = +Math.max(open, close * (1 + Math.random() * 0.1)).toFixed(2);
    const low = +Math.min(open, close * (0.9 + Math.random() * 0.1)).toFixed(2);

    // Determine candle type based on price action
    const priceChange = close - open;
    const type: CandleType =
      priceChange > 0 ? "bullish" : priceChange < 0 ? "bearish" : "neutral";

    // Randomly select a pattern matching the type
    const matchingPatterns = patterns.filter((p) => p.type === type);
    const randomPattern =
      matchingPatterns[Math.floor(Math.random() * matchingPatterns.length)];

    // Determine strength based on candle size
    const candleSize = Math.abs(high - low);
    const strength =
      candleSize > 5 ? "strong" : candleSize > 2 ? "moderate" : "weak";

    data.push({
      x: date.valueOf(),
      o: open,
      h: high,
      l: low,
      c: close,
      analysis: {
        type,
        pattern: randomPattern.pattern,
        strength,
        description: randomPattern.description,
      },
    });

    lastClose = close;
    date = date.add(1, "days");
  }

  return data;
};
