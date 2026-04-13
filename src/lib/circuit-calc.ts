/**
 * 回路計算ロジック
 */

// コンデンサの直列合成容量
export function capacitorsInSeries(values: number[]): number {
  if (values.length === 0) return 0;
  if (values.some((v) => v <= 0)) return 0;
  const reciprocalSum = values.reduce((sum, v) => sum + 1 / v, 0);
  return reciprocalSum > 0 ? 1 / reciprocalSum : 0;
}

// コンデンサの並列合成容量
export function capacitorsInParallel(values: number[]): number {
  return values.reduce((sum, v) => sum + v, 0);
}

// RC時定数（秒）
export function rcTimeConstant(resistance: number, capacitance: number): number {
  return resistance * capacitance;
}

// 充電電圧 V(t) = Vmax * (1 - e^(-t/RC))
export function chargingVoltage(
  vMax: number,
  resistance: number,
  capacitance: number,
  time: number
): number {
  const tau = rcTimeConstant(resistance, capacitance);
  if (tau <= 0) return 0;
  return vMax * (1 - Math.exp(-time / tau));
}

// 放電電圧 V(t) = V0 * e^(-t/RC)
export function dischargingVoltage(
  v0: number,
  resistance: number,
  capacitance: number,
  time: number
): number {
  const tau = rcTimeConstant(resistance, capacitance);
  if (tau <= 0) return 0;
  return v0 * Math.exp(-time / tau);
}

// 容量単位変換ヘルパー
export function formatCapacitance(farad: number): string {
  if (farad >= 1) return `${farad.toFixed(2)} F`;
  if (farad >= 1e-3) return `${(farad * 1e3).toFixed(2)} mF`;
  if (farad >= 1e-6) return `${(farad * 1e6).toFixed(2)} μF`;
  if (farad >= 1e-9) return `${(farad * 1e9).toFixed(2)} nF`;
  return `${(farad * 1e12).toFixed(2)} pF`;
}

// 時間単位変換
export function formatTime(seconds: number): string {
  if (seconds >= 1) return `${seconds.toFixed(3)} 秒`;
  if (seconds >= 1e-3) return `${(seconds * 1e3).toFixed(3)} ms`;
  return `${(seconds * 1e6).toFixed(3)} μs`;
}
