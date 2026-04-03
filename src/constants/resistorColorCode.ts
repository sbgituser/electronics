export interface ColorBand {
  color: string;
  colorEn: string;
  hex: string;
  digit: number | null;
  multiplier: number | null;
  tolerance: number | null;
  tempCoeff: number | null;
}

export const COLOR_BANDS: ColorBand[] = [
  { color: "黒", colorEn: "Black", hex: "#000000", digit: 0, multiplier: 1, tolerance: null, tempCoeff: 250 },
  { color: "茶", colorEn: "Brown", hex: "#8B4513", digit: 1, multiplier: 10, tolerance: 1, tempCoeff: 100 },
  { color: "赤", colorEn: "Red", hex: "#FF0000", digit: 2, multiplier: 100, tolerance: 2, tempCoeff: 50 },
  { color: "橙", colorEn: "Orange", hex: "#FF8C00", digit: 3, multiplier: 1000, tolerance: null, tempCoeff: 15 },
  { color: "黄", colorEn: "Yellow", hex: "#FFD700", digit: 4, multiplier: 10000, tolerance: null, tempCoeff: 25 },
  { color: "緑", colorEn: "Green", hex: "#228B22", digit: 5, multiplier: 100000, tolerance: 0.5, tempCoeff: 20 },
  { color: "青", colorEn: "Blue", hex: "#0000FF", digit: 6, multiplier: 1000000, tolerance: 0.25, tempCoeff: 10 },
  { color: "紫", colorEn: "Violet", hex: "#8B008B", digit: 7, multiplier: 10000000, tolerance: 0.1, tempCoeff: 5 },
  { color: "灰", colorEn: "Gray", hex: "#808080", digit: 8, multiplier: 100000000, tolerance: 0.05, tempCoeff: 1 },
  { color: "白", colorEn: "White", hex: "#FFFFFF", digit: 9, multiplier: 1000000000, tolerance: null, tempCoeff: null },
  { color: "金", colorEn: "Gold", hex: "#CFB53B", digit: null, multiplier: 0.1, tolerance: 5, tempCoeff: null },
  { color: "銀", colorEn: "Silver", hex: "#C0C0C0", digit: null, multiplier: 0.01, tolerance: 10, tempCoeff: null },
];

export type BandCount = 4 | 5 | 6;

export const E24_BASE = [
  1.0, 1.1, 1.2, 1.3, 1.5, 1.6, 1.8, 2.0, 2.2, 2.4, 2.7, 3.0,
  3.3, 3.6, 3.9, 4.3, 4.7, 5.1, 5.6, 6.2, 6.8, 7.5, 8.2, 9.1,
];

export const E96_BASE = [
  1.00, 1.02, 1.05, 1.07, 1.10, 1.13, 1.15, 1.18, 1.21, 1.24, 1.27, 1.30,
  1.33, 1.37, 1.40, 1.43, 1.47, 1.50, 1.54, 1.58, 1.62, 1.65, 1.69, 1.74,
  1.78, 1.82, 1.87, 1.91, 1.96, 2.00, 2.05, 2.10, 2.15, 2.21, 2.26, 2.32,
  2.37, 2.43, 2.49, 2.55, 2.61, 2.67, 2.74, 2.80, 2.87, 2.94, 3.01, 3.09,
  3.16, 3.24, 3.32, 3.40, 3.48, 3.57, 3.65, 3.74, 3.83, 3.92, 4.02, 4.12,
  4.22, 4.32, 4.42, 4.53, 4.64, 4.75, 4.87, 4.99, 5.11, 5.23, 5.36, 5.49,
  5.62, 5.76, 5.90, 6.04, 6.19, 6.34, 6.49, 6.65, 6.81, 6.98, 7.15, 7.32,
  7.50, 7.68, 7.87, 8.06, 8.25, 8.45, 8.66, 8.87, 9.09, 9.31, 9.53, 9.76,
];
