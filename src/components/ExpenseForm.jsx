import { useState, useEffect } from "react";

export default function ExpenseForm({ addExpense, itemToEdit, cancelEdit }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (itemToEdit) {
      setTitle(itemToEdit.title);
      setAmount(itemToEdit.amount);
    } else {
      setTitle("");
      setAmount("");
    }
  }, [itemToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount) return;
    addExpense(title, amount, itemToEdit?._id);
    setTitle("");
    setAmount("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Expense title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button type="submit">{itemToEdit ? "Update" : "Add"}</button>
      {itemToEdit && (
        <button type="button" onClick={cancelEdit}>
          Cancel
        </button>
      )}
    </form>
  );
}
