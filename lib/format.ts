export function formatValue(
  value: number,
  format: "currency" | "number" | "percent"
): string {
  if (format === "currency") {
    return "$" + value.toLocaleString("en-US", { maximumFractionDigits: 0 });
  }
  if (format === "percent") {
    return value.toLocaleString("en-US", { maximumFractionDigits: 1 }) + "%";
  }
  return value.toLocaleString("en-US");
}

export function formatCurrency(value: number): string {
  return "$" + value.toLocaleString("en-US", { maximumFractionDigits: 0 });
}
