import { Link } from "react-router-dom";

const Income = () => {
  return (
    <>
      <h1> Household Income per month </h1>
      <Link to="/income/paycheck"  className="border bg-secondary p-2">Add a Paycheck</Link>
      <h1> Piechart </h1>
      <h1> Current Sources of Income </h1>

    </>
  );
};
export default Income;
