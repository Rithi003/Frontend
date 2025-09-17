export default function ExpenseSummary({ proexpenses }) {
  const income = proexpenses
    .filter((exp) => exp.amount > 0)
    .reduce((acc, exp) => acc + exp.amount, 0);

  const expense = proexpenses
    .filter((exp) => exp.amount < 0)
    .reduce((acc, exp) => acc + exp.amount, 0);

  const total = income + expense;

  return (
    <div>
      <h3>Summary</h3>
      <p>Total Income: {income}</p>
      <p>Total Expense: {expense}</p>
      <p>Balance: {total}</p>
    </div>
  );
}
