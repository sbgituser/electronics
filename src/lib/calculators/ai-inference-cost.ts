export function calculateAiInferenceCost(
  values: Record<string, number | string>,
) {
  const modelSize = String(
    values.modelSize || "\u5C0F\u578B\u30E2\u30C7\u30EB(<100M\u30D1\u30E9\u30E1\u30FC\u30BF)",
  );
  const requestsPerDay = Number(values.requestsPerDay) || 1000;
  const device = String(values.device || "\u30AF\u30E9\u30A6\u30C9GPU");

  const cloudCostPerInference: Record<string, number> = {
    "\u5C0F\u578B\u30E2\u30C7\u30EB(<100M\u30D1\u30E9\u30E1\u30FC\u30BF)": 0.1,
    "\u4E2D\u578B\u30E2\u30C7\u30EB(100M\u301C1B\u30D1\u30E9\u30E1\u30FC\u30BF)": 0.5,
    "\u5927\u578B\u30E2\u30C7\u30EB(>1B\u30D1\u30E9\u30E1\u30FC\u30BF)": 2.0,
  };

  const latencyTable: Record<string, Record<string, string>> = {
    "\u30AF\u30E9\u30A6\u30C9GPU": {
      "\u5C0F\u578B\u30E2\u30C7\u30EB(<100M\u30D1\u30E9\u30E1\u30FC\u30BF)": "50\u301C150 ms",
      "\u4E2D\u578B\u30E2\u30C7\u30EB(100M\u301C1B\u30D1\u30E9\u30E1\u30FC\u30BF)": "100\u301C300 ms",
      "\u5927\u578B\u30E2\u30C7\u30EB(>1B\u30D1\u30E9\u30E1\u30FC\u30BF)": "300\u301C1,000 ms",
    },
    "\u30A8\u30C3\u30B8GPU(Jetson Orin Nano)": {
      "\u5C0F\u578B\u30E2\u30C7\u30EB(<100M\u30D1\u30E9\u30E1\u30FC\u30BF)": "5\u301C20 ms",
      "\u4E2D\u578B\u30E2\u30C7\u30EB(100M\u301C1B\u30D1\u30E9\u30E1\u30FC\u30BF)": "20\u301C80 ms",
      "\u5927\u578B\u30E2\u30C7\u30EB(>1B\u30D1\u30E9\u30E1\u30FC\u30BF)": "100\u301C400 ms",
    },
    "Raspberry Pi": {
      "\u5C0F\u578B\u30E2\u30C7\u30EB(<100M\u30D1\u30E9\u30E1\u30FC\u30BF)": "200\u301C600 ms",
      "\u4E2D\u578B\u30E2\u30C7\u30EB(100M\u301C1B\u30D1\u30E9\u30E1\u30FC\u30BF)": "1,000\u301C5,000 ms",
      "\u5927\u578B\u30E2\u30C7\u30EB(>1B\u30D1\u30E9\u30E1\u30FC\u30BF)": "10,000 ms \u4EE5\u4E0A",
    },
  };

  const monthlyRequests = requestsPerDay * 30;
  let monthlyCost: number;
  if (device === "\u30AF\u30E9\u30A6\u30C9GPU") {
    const unitCost = cloudCostPerInference[modelSize] ?? 0.5;
    monthlyCost = monthlyRequests * unitCost;
  } else if (device === "\u30A8\u30C3\u30B8GPU(Jetson Orin Nano)") {
    monthlyCost = (10 / 1000) * 24 * 30 * 31;
  } else {
    monthlyCost = (5 / 1000) * 24 * 30 * 31;
  }

  const yearlyCost = monthlyCost * 12;
  const latencyMs =
    (latencyTable[device] ?? latencyTable["\u30AF\u30E9\u30A6\u30C9GPU"])[modelSize] ??
    "\u2014";
  const fmt = (n: number) => Math.round(n).toLocaleString("ja-JP");

  return {
    monthlyCost: fmt(monthlyCost),
    yearlyCost: fmt(yearlyCost),
    latencyMs,
    costPer1000:
      device === "\u30AF\u30E9\u30A6\u30C9GPU"
        ? fmt(monthlyCost / (monthlyRequests / 1000)) + " \u5186/\u5343\u56DE"
        : "\u96FB\u6C17\u4EE3\u56FA\u5B9A",
  };
}
