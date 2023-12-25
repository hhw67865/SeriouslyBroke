import { Link } from "react-router-dom";

const Expenses = () => {
  return (
    <>
      <h1> Total Expenses: $$$/Month </h1>
      <h1> Estimated minimum: $$$/Month </h1>
      <Link
        to="/expenses/edit"
        className="focus:shadow-outline mx-auto mt-4 w-full max-w-xs rounded bg-secondary px-4 py-2 text-center font-bold text-white hover:bg-primary focus:outline-none"
      >
        Expenses
      </Link>
      <h1>Piechart of expenses</h1>
      <h1>You are up $$$ or down $$$ from last month</h1>
      <h1>Edit expenses</h1>
    </>
  );
};
export default Expenses;
