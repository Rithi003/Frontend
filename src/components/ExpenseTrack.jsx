import { useState, useEffect } from "react";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import ExpenseSummary from "./ExpenseSummary";
import axios from "axios";

export default function ExpenseTrack() {
  const [expenses, setExpenses] = useState([]);
  const [itemToEdit, setItemToEdit] = useState(null);

  // Fetch all expenses from backend
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/getdata")
      .then((res) => setExpenses(res.data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // Add or Edit Expense
  const addExpense = (title, amount, id) => {
    if (id) {
      // Edit existing expense
      axios
        .put(`http://localhost:3001/api/${id}`, {
          title,
          amount: Number(amount),
        })
        .then((res) => {
          const updated = expenses.map((exp) =>
            exp._id === id ? res.data : exp
          );
          setExpenses(updated);
          setItemToEdit(null); // reset edit mode
        })
        .catch((err) => console.error("Update error:", err));
    } else {
      // Add new expense
      axios
        .post("http://localhost:3001/api/postdata", {
          title,
          amount: Number(amount),
        })
        .then((res) => setExpenses([...expenses, res.data]))
        .catch((err) => console.error("Add error:", err));
    }
  };

  // Delete Expense
  const deleteExpense = (id) => {
    axios
      .delete(`http://localhost:3001/api/${id}`)
      .then(() => setExpenses(expenses.filter((exp) => exp._id !== id)))
      .catch((err) => console.error("Delete error:", err));
  };

  return (
    <div>
      <h2>Expense Tracker</h2>
      <ExpenseForm
        addExpense={addExpense}
        itemToEdit={itemToEdit}
        cancelEdit={() => setItemToEdit(null)}
      />
      <ExpenseList
        proexpenses={expenses}
        deleteExpenses={deleteExpense}
        editExpenses={setItemToEdit}
      />
      <ExpenseSummary proexpenses={expenses} />
    </div>
  );
}
