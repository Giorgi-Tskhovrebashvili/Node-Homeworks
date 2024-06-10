const expensesList = document.getElementById("expenses-list");
const expenseForm = document.getElementById("expense-form");
const nameInput = document.getElementById("name");
const costInput = document.getElementById("cost");
const addCost = document.getElementById("click");

const fetchExpenses = async () => {
  const response = await fetch("http://localhost:3004/api/expenses");
  const expenses = await response.json();
  expensesList.innerHTML = "";
  expenses.forEach((expense) => {
    const div = document.createElement("div");
    div.innerHTML = `<strong>${expense.name}</strong>: $${expense.cost} <button onclick="deleteExpense('${expense.id}')">Delete</button>`;
    expensesList.appendChild(div);
  });
};

// const deleteExpense = async (id) => {
//   await fetch(`http://localhost:3004/api/expenses/${id}`, {
//     method: "DELETE",
//   });
//   fetchExpenses();
// };

// addCost.addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const name = nameInput.value;
//   const cost = costInput.value;

//   await fetch("http://localhost:3004/api/expenses", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ name, cost }),
//   });

//   nameInput.value = "";
//   costInput.value = "";
//   fetchExpenses();
// });

fetchExpenses();
