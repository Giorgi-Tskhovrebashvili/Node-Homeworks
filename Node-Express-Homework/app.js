import express from "express";
import { port } from "./constants/common.js";
import { UserNotFound, UserWasDeleted } from "./errors/common.js";
import moment from "moment";

const app = express();
const expenses = [];
app.use(express.json())

app.get("/api/expenses", (req, res) => {
  if (!expenses) {
    res.json({ success: false, data: null });
  } else {
    res.json({ success: true, data: expenses });
  }
});

app.get("/api/expenses/:id", (req, res) => {
  const expenseId = parseInt(req.params.id);
  const findExpenseId = expenses.find((u) => u.id === expenseId);
  if (!findExpenseId) {
    const statused = res.status(404).json({ message: UserNotFound });
    res.json({ success: false, data: null, finally: statused });
  }
  res.json({ success: true, data: findExpenseId });
});

app.post("/api/add/expense", (req, res) => {
  const newExpense = req.body;
  const id = expenses.length + 1;
  const createdAt = moment().locale("ka").format("LLL");
  const expense = { id, ...newExpense, createdAt };
  expenses.push(expense);
  if (!expenses) {
    res.json({ success: false, data: null });
  }
  res.json({ success: true, data: expenses.length !== 0 ? expenses : null });
});

app.delete("/api/expenses/:id", (req, res) => {
    const expenseId = parseInt(req.params.id);
    const findExpenseId = expenses.find((u) => u.id === expenseId);
    if (findExpenseId > -1) {
        expenses.splice(findExpenseId, 1);
        const statused = res.status(404).json({ message: UserWasDeleted });
        res.json({ message: statused });
      }
})

app.put("/api/expenses/:id", (req, res) => {
    const expenseId = parseInt(req.params.id);
    const findExpenseId = expenses.find((u) => u.id === expenseId);
    if (findExpenseId === -1) {
      const statused = res.status(404).json({ message: UserNotFound });
      res.json({ success: false, data: null, finally: statused });
    } else {
        const createdAt = moment().locale("ka").format("LLL");
      const updateUser = { ...expenses[findExpenseId], expenseId, ...req.body, createdAt };
      expenses[findExpenseId] = updateUser;
      res.json({ success: true, data: updateUser });
    }
})

app.listen(port, () => {
  console.log(`App running port ${port}`);
});
