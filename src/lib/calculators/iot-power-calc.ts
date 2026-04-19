export function calculateIotPower(values: Record<string, number | string>) {
  const sensorType = String(values.sensorType || "\u6E29\u5EA6\u30BB\u30F3\u30B5\u30FC");
  const samplingInterval = Number(values.samplingInterval) || 60;
  const mode = String(values.mode || "\u9593\u6B20\u7A3C\u50CD");
  const devices = Number(values.devices) || 1;

  const sensorSpecs: Record<
    string,
    { always: number; active: number; standby: number }
  > = {
    "\u6E29\u5EA6\u30BB\u30F3\u30B5\u30FC": { always: 1.0, active: 2.0, standby: 0.05 },
    "\u6E7F\u5EA6\u30BB\u30F3\u30B5\u30FC": { always: 2.0, active: 3.5, standby: 0.1 },
    "\u52A0\u901F\u5EA6\u30BB\u30F3\u30B5\u30FC": { always: 3.5, active: 5.0, standby: 0.15 },
    "CO2\u30BB\u30F3\u30B5\u30FC": { always: 25.0, active: 100.0, standby: 0.5 },
    "GPS\u30BB\u30F3\u30B5\u30FC": { always: 50.0, active: 120.0, standby: 1.0 },
    "\u30AB\u30E1\u30E9\u30E2\u30B8\u30E5\u30FC\u30EB": { always: 500.0, active: 800.0, standby: 10.0 },
  };

  const spec = sensorSpecs[sensorType] || sensorSpecs["\u6E29\u5EA6\u30BB\u30F3\u30B5\u30FC"];
  let powerPerDeviceMw: number;
  if (mode === "\u5E38\u6642\u7A3C\u50CD") {
    powerPerDeviceMw = spec.always;
  } else {
    const activeTimeSec = 0.1;
    const dutyCycle = activeTimeSec / samplingInterval;
    powerPerDeviceMw =
      spec.active * dutyCycle + spec.standby * (1 - dutyCycle);
  }
  const monthlyKwhPerDevice =
    ((powerPerDeviceMw / 1000) * 24 * 30) / 1000;
  const monthlyKwhTotal = monthlyKwhPerDevice * devices;
  const batteryCapacityMwh = 6600; // 2000mAh @ 3.3V
  const batteryDays = batteryCapacityMwh / (powerPerDeviceMw * 24);

  return {
    powerPerDevice:
      powerPerDeviceMw < 10
        ? powerPerDeviceMw.toFixed(2) + " mW"
        : Math.round(powerPerDeviceMw) + " mW",
    monthlyKwh:
      monthlyKwhTotal < 0.01
        ? (monthlyKwhTotal * 1000).toFixed(3) + " Wh"
        : monthlyKwhTotal.toFixed(3) + " kWh",
    batteryDays:
      batteryDays > 9999
        ? "> 9,999 \u65E5"
        : batteryDays > 365
          ? (batteryDays / 365).toFixed(1) + " \u5E74"
          : Math.round(batteryDays).toLocaleString("ja-JP") + " \u65E5",
  };
}
