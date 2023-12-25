let formatter = new Intl.NumberFormat("en-US", {
  style: "decimal",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const formatMoney = (amount) => {
  return formatter.format(amount);
};

export default formatMoney;
