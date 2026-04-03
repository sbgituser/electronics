import type { LedSpec } from "@/types/led-calculator";

export const LED_PRESETS: LedSpec[] = [
  { color: "赤", forwardVoltage: 2.0, forwardCurrent: 20 },
  { color: "緑", forwardVoltage: 2.1, forwardCurrent: 20 },
  { color: "青", forwardVoltage: 3.2, forwardCurrent: 20 },
  { color: "白", forwardVoltage: 3.3, forwardCurrent: 20 },
  { color: "黄", forwardVoltage: 2.1, forwardCurrent: 20 },
  { color: "赤外線", forwardVoltage: 1.3, forwardCurrent: 20 },
  { color: "UV", forwardVoltage: 3.5, forwardCurrent: 20 },
];

export const SUPPLY_VOLTAGE_PRESETS = [
  { label: "Arduino 5V", voltage: 5.0 },
  { label: "Arduino 3.3V", voltage: 3.3 },
  { label: "ESP32 3.3V", voltage: 3.3 },
  { label: "Raspberry Pi 3.3V", voltage: 3.3 },
  { label: "USB 5V", voltage: 5.0 },
  { label: "単3電池×2", voltage: 3.0 },
  { label: "単3電池×4", voltage: 6.0 },
  { label: "9V電池", voltage: 9.0 },
  { label: "12V ACアダプタ", voltage: 12.0 },
];
