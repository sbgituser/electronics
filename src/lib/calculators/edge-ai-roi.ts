export function calculateEdgeAiRoi(values: Record<string, number | string>) {
  const initialCost = Number(values.initialCost) || 0;
  const devices = Number(values.devices) || 0;
  const commSaving = Number(values.commSaving) || 0;
  const apiSaving = Number(values.apiSaving) || 0;
  const totalInitial = initialCost * devices;
  const monthlySaving = (commSaving + apiSaving) * devices;
  const paybackMonths = monthlySaving > 0 ? totalInitial / monthlySaving : 0;
  const saving3year = monthlySaving * 36;
  const roi3year =
    totalInitial > 0 ? ((saving3year - totalInitial) / totalInitial) * 100 : 0;
  const fmt = (n: number) => Math.round(n).toLocaleString("ja-JP");
  return {
    totalInitial: fmt(totalInitial),
    monthlySaving: fmt(monthlySaving),
    paybackMonths: paybackMonths > 0 ? paybackMonths.toFixed(1) : "\u2014",
    roi3year: roi3year.toFixed(1),
    saving3year: fmt(saving3year),
  };
}
