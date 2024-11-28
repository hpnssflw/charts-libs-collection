export type CandleType = "bullish" | "bearish" | "neutral";

export interface CandleData {
  x: string | number;
  o: number;
  h: number;
  l: number;
  c: number;
}

export interface CandleDescription {
  type: CandleType;
  pattern?: string;
  strength: "weak" | "moderate" | "strong";
  description: string;
}

export interface EnhancedCandleData extends CandleData {
  analysis: CandleDescription;
}
