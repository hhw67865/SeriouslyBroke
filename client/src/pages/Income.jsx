import { Link } from "react-router-dom";

const Income = () => {
  return (
    <>
      <h1> Household Income per month </h1>
      <Link
        to="/income/paycheck"
        className="focus:shadow-outline rounded bg-secondary px-4 py-2 font-bold text-white hover:bg-primary focus:outline-none"
      >
        Add a Paycheck
      </Link>
      <h1> Piechart </h1>
      <h1> Current Sources of Income </h1>
    </>
  );
};
export default Income;
