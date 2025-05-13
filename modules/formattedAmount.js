function formattedAmount(amount) {
  return amount.toLocaleString("pt-br", {
    currency: "BRL",
    style: "currency",
  });
}

function formattedAmountNumber(value) {
  let amount = value.replace("R$", "").trim();
  amount = amount.replace(/\./g, "");
  amount = amount.replace(",", ".");
  return Number(amount);
}

export { formattedAmount, formattedAmountNumber };
