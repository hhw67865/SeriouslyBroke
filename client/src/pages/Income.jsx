import { Link } from "react-router-dom";
import { SessionContext } from "../context/SessionContext";
import { useContext } from "react";
import { MonthlyChart } from "../features/income";

const Income = () => {
  const session = useContext(SessionContext);

  return (
    <div className="flex flex-col items-center">
      <MonthlyChart session={session} />
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
