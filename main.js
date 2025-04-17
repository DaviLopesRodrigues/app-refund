import { Refund } from "./modules/refund.js";
import { formattedAmount } from "./modules/formattedAmount.js";

const expenseName = document.getElementById("expense");
const expenseCategory = document.getElementById("category");
const expenseAmout = document.getElementById("amount");
const form = document.querySelector("form");



form.addEventListener("submit", (event) => {
    event.preventDefault();
    const refund = new Refund(expenseName.value, expenseCategory.value, expenseAmout.value);
    Refund.createRefund(refund);
})

async function refundSummary() {
    const data = await Refund.fetchRefunds()

    const refundRequestCounter = document.querySelector("aside header p span");

    refundRequestCounter.textContent = `${data.length} ${data.length <= 1 ? "despesa" : "despesas"}`

    const totalRefundAmount = document.querySelector("aside header h2");

    const total = data.reduce((sum, current) => {
        const amount = parseFloat(
            current.amount.toString().replace(".", "").replace(",", ".")
        );

        return sum + amount;
    }, 0)

    totalRefundAmount.innerHTML = formattedAmount(total).replace("R$", "<small>R$</small>");
}
refundSummary();
