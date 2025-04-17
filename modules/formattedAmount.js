
function formattedAmount(amount) {
    return amount.toLocaleString("pt-br", {
        currency: "BRL",
        style: "currency"
    });
}

export { formattedAmount };