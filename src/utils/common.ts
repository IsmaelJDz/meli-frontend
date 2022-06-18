export const fetchData = async (query: string) => {
  const res = await fetch(`${process.env.PATH_URL}/api/${query}`);
  const data = await res.json();
  return data;
};

/**
 * Format number to $XX,XXX.XX
 */
export function formatCurrency(
  number: number | bigint,
  maximumFractionDigits = 2
): string {
  if (!number && number !== 0) return "";

  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits,
    style: "currency",
    currency: "USD"
  }).format(number);

  // return new Intl.NumberFormat("es-ar", {
  //   maximumFractionDigits,
  //   style: "currency",
  //   currency: "ARS"
  // }).format(number);
}
