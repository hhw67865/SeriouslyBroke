import { Link } from "react-router-dom";
import { MonthlyChart } from "../features/income";

const Income = ({ graphData, setMonths, months }) => {

  return (
    <div className="flex flex-col items-center">
      <MonthlyChart graphData={graphData} setMonths={setMonths} months={months} />
      <Link
        to="/income/paycheck"
        className="focus:shadow-outline mx-auto mt-4 w-full max-w-xs rounded bg-secondary px-4 py-2 text-center font-bold text-white hover:bg-primary focus:outline-none"
      >
        Paychecks
      </Link>
    </div>
  );
};
export default Income;
