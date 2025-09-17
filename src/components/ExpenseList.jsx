export default function ExpenseList({ proexpenses, deleteExpenses, editExpenses }) {
  return (
    <ul>
      {proexpenses.map((exp) => (
        <li key={exp._id}>
          {exp.title} - {exp.amount}
          <button onClick={() => editExpenses(exp)}>Edit</button>
          <button onClick={() => deleteExpenses(exp._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
