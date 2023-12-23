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
        className="mt-4 focus:shadow-outline rounded bg-secondary px-4 py-2 font-bold text-white hover:bg-primary focus:outline-none w-full max-w-xs mx-auto text-center"
      >
        Paychecks
      </Link>
    </div>
  );
};
export default Income;
