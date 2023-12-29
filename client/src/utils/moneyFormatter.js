let formatter = new Intl.NumberFormat("en-US", {
  style: "decimal",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const formatMoney = (amount) => {
  let formattedAmount = formatter.format(Math.abs(amount));
  return amount >= 0 ? `$${formattedAmount}` : `-$${formattedAmount}`;
};

export default formatMoney;
