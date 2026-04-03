export interface LedSpec {
  color: string;
  forwardVoltage: number;
  forwardCurrent: number;
}

export interface CalcResult {
  resistance: number;
  nearestE24: number;
  powerDissipation: number;
  ledCurrent: number;
  recommendedWattage: string;
}

export type CircuitType = "single" | "series" | "parallel";

export const E24_BASE: number[] = [
  1.0, 1.1, 1.2, 1.3, 1.5, 1.6, 1.8, 2.0, 2.2, 2.4, 2.7, 3.0, 3.3, 3.6,
  3.9, 4.3, 4.7, 5.1, 5.6, 6.2, 6.8, 7.5, 8.2, 9.1,
];
