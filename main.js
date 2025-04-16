import { Refund } from "./modules/refund.js";

const expenseName = document.getElementById("expense");
const expenseCategory = document.getElementById("category");
const expenseAmout = document.getElementById("amount");
const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const refund = new Refund(expenseName.value, expenseCategory.value, expenseAmout.value)
    postRefund(refund);
    console.log(refund);
})

//Criando refund
async function postRefund(refundItem) {
    try {
        const response = await fetch("http://localhost:3333/refunds", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(refundItem)
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
    } catch (error) {
        console.log("Erro ao criar item:", error)
    }
}

//Listando refunds
async function fetchRefunds() {
    const response = await fetch("http://localhost:3333/refunds").then((res) => res.json());
    console.log(response);
}
fetchRefunds();
