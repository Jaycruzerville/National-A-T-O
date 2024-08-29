export function formatToCurrency(amount: number | string) {
  const currencyFormatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  })

  if (typeof amount === "string") {
    amount = parseFloat(amount.replaceAll(",", ""))
  }

  return currencyFormatter.format(amount)
}
