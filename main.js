import { Refund } from "./modules/refund.js";
import { formattedAmount } from "./modules/formattedAmount.js";

const expenseName = document.getElementById("expense");
const expenseCategory = document.getElementById("category");
const expenseAmout = document.getElementById("amount");
const form = document.querySelector("form");

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const refund = new Refund(expenseName.value, expenseCategory.value, parseFloat(expenseAmout.value));
    await Refund.createRefund(refund);
})

const categoryInfos = {
    food: {
        icon: "img/food.svg",
        option_value: "Alimentação"
    },
    accommodation: {
        icon: "img/accommodation.svg",
        option_value: "Hospedagem"
    },
    services: {
        icon: "img/services.svg",
        option_value: "Serviços"
    },
    transport: {
        icon: "img/transport.svg",
        option_value: "Transporte"
    },
    others: {
        icon: "img/others.svg",
        option_value: "Outros"
    },
}

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 30000,
    timerProgressBar: true,
    // didOpen: (toast) => {
    //     toast.addEventListener("mouseenter", Swal.stopTimer);
    //     toast.addEventListener("mouseleave", Swal.resumeTimer);
    // }
});

async function renderAllRefunds() {

    const refundList = document.querySelector("ul");

    const res = await Refund.fetchRefunds();
    console.log(res);
    res.map((refund) => {
        const listItem = document.createElement("li");
        listItem.classList.add("expense");
        listItem.dataset.id = refund.id

        const categoryIcon = document.createElement("img");
        categoryIcon.setAttribute("src", `${categoryInfos?.[refund.category]?.icon}`)

        const refundExpenseInfo = document.createElement("div");
        refundExpenseInfo.classList.add("expense-info")
        const expenseNameItem = document.createElement("strong");
        expenseNameItem.textContent = `${refund.name}`
        const expenseCategoryItem = document.createElement("span");
        expenseCategoryItem.textContent = `${categoryInfos?.[refund.category]?.option_value}`
        refundExpenseInfo.append(expenseNameItem, expenseCategoryItem);

        const refundExpenseAmount = document.createElement("span");
        refundExpenseAmount.classList.add("expense-amount");
        const currencySymbol = document.createElement("small");
        currencySymbol.textContent = `R$`
        refundExpenseAmount.textContent = `${formattedAmount(refund.amount).replace("R$", "")}`

        refundExpenseAmount.prepend(currencySymbol)

        const removeRefundItemIcon = document.createElement("img");
        removeRefundItemIcon.classList.add("remove-icon");
        removeRefundItemIcon.setAttribute("src", "img/remove.svg")
        removeRefundItemIcon.addEventListener("click", async () => {
            const result = await Swal.fire({
                title: "Você tem certeza que deseja excluir?",
                showCancelButton: true,
                cancelButtonText: "Cancelar",
                cancelButtonColor: "#696969",

                confirmButtonText: "Sim",
                confirmButtonColor: "#1f8459"
            })

            if (result.isConfirmed) {
                await Refund.deleteRefund(refund.id);
                listItem.remove();
            }
        })
        listItem.append(categoryIcon, refundExpenseInfo, refundExpenseAmount, removeRefundItemIcon);
        refundList.append(listItem);
    })
    refundSummary(res);
}

async function refundSummary(data) {
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

renderAllRefunds();