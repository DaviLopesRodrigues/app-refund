import { Refund } from "./modules/refund.js";
import {
  formattedAmount,
  formattedAmountNumber,
} from "./modules/formattedAmount.js";
import { Alerts } from "./modules/alerts.js";

const expenseName = document.getElementById("expense");
const expenseCategory = document.getElementById("category");
const expenseAmout = document.getElementById("amount");
const form = document.querySelector("form");
const refundList = document.querySelector("ul");
const refundRequestCounter = document.querySelector("aside header p span");
const totalRefundAmount = document.querySelector("aside header h2");

expenseAmout.addEventListener("input", () => {
  let value = expenseAmout.value.replace(/\D/g, "");
  value = Number(value) / 100;
  expenseAmout.value = formattedAmount(value);
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!expenseName.value || !expenseCategory.value || !expenseAmout.value) {
    return Alerts.toast({
      icon: "warning",
      title: "Preencha todos os campos antes de enviar.",
    });
  }

  try {
    const refund = new Refund(
      expenseName.value,
      expenseCategory.value,
      formattedAmountNumber(expenseAmout.value)
    );
    await Refund.createRefund(refund);
  } catch (error) {
    Alerts.toast({
      icon: "error",
      title: error,
    });
  }
});

const categoryInfos = {
  food: {
    icon: "img/food.svg",
    option_value: "Alimentação",
  },
  accommodation: {
    icon: "img/accommodation.svg",
    option_value: "Hospedagem",
  },
  services: {
    icon: "img/services.svg",
    option_value: "Serviços",
  },
  transport: {
    icon: "img/transport.svg",
    option_value: "Transporte",
  },
  others: {
    icon: "img/others.svg",
    option_value: "Outros",
  },
};

async function renderAllRefunds() {
  try {
    const response = await Refund.fetchRefunds();
    await createRefundItem(response);
    refundSummary(response);
  } catch (error) {
    Alerts.toast({
      icon: "error",
      title: error,
    });
  }
}

async function createRefundItem(listRefunds) {
  listRefunds.forEach((refund) => {
    const { id, category, amount, name } = refund;
    const listItem = document.createElement("li");
    listItem.classList.add("expense");
    listItem.dataset.id = id;

    const categoryIcon = document.createElement("img");
    categoryIcon.setAttribute("src", `${categoryInfos?.[category]?.icon}`);

    const refundExpenseInfo = document.createElement("div");
    refundExpenseInfo.classList.add("expense-info");

    const expenseNameItem = document.createElement("strong");
    expenseNameItem.textContent = `${name}`;

    const expenseCategoryItem = document.createElement("span");
    expenseCategoryItem.textContent = `${categoryInfos?.[category]?.option_value}`;
    refundExpenseInfo.append(expenseNameItem, expenseCategoryItem);

    const refundExpenseAmount = document.createElement("span");
    refundExpenseAmount.classList.add("expense-amount");

    const currencySymbol = document.createElement("small");
    currencySymbol.textContent = `R$`;
    refundExpenseAmount.textContent = `${formattedAmount(amount).replace(
      "R$",
      ""
    )}`;

    refundExpenseAmount.prepend(currencySymbol);

    const removeRefundItemIcon = document.createElement("img");
    removeRefundItemIcon.classList.add("remove-icon");
    removeRefundItemIcon.setAttribute("src", "img/remove.svg");
    removeRefundItemIcon.addEventListener("click", async () => {
      try {
        const result = await Alerts.confirmDelete();
        const { isConfirmed } = result;

        if (isConfirmed) {
          await Refund.deleteRefund(refund.id);
          listItem.remove();
        }
      } catch (error) {
        Alerts.toast({
          icon: "error",
          title: error,
        });
      }
    });
    listItem.append(
      categoryIcon,
      refundExpenseInfo,
      refundExpenseAmount,
      removeRefundItemIcon
    );
    refundList.append(listItem);
  });
}

async function refundSummary(data) {
  refundRequestCounter.textContent = `${data.length} ${
    data.length <= 1 ? "despesa" : "despesas"
  }`;

  const total = data.reduce((sum, current) => {
    return sum + current.amount;
  }, 0);

  totalRefundAmount.innerHTML = formattedAmount(total).replace(
    "R$",
    "<small>R$</small>"
  );
}

renderAllRefunds();
