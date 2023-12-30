import {
  PaycheckForm,
  PaycheckTable,
  usePaychecks,
} from "../features/paycheck";
import { SessionContext } from "../context/SessionContext";
import { useContext } from "react";

const Paycheck = ({getPaychecks}) => {
  const session = useContext(SessionContext);

  return (
    <>
      <PaycheckForm session={session} getPaychecks={getPaychecks} />
      <PaycheckTable
          getPaychecks={getPaychecks}
      />
    </>
  );
};
export default Paycheck;
