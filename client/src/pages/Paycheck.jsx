import {
  PaycheckForm,
  PaycheckTable,
  usePaychecks,
} from "../features/paycheck";
import { SessionContext } from "../context/SessionContext";
import { useContext } from "react";

const Paycheck = () => {
  const session = useContext(SessionContext);
  const { paychecks, updatePaychecks } = usePaychecks(
    "/api/paychecks",
    session,
  );

  return (
    <>
      <PaycheckForm session={session} updatePaychecks={updatePaychecks} />
      {paychecks && (
        <PaycheckTable
          session={session}
          paychecks={paychecks}
          updatePaychecks={updatePaychecks}
        />
      )}
    </>
  );
};
export default Paycheck;
