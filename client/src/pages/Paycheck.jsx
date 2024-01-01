import { PaycheckForm, PaycheckTable } from "../features/paycheck";
import { SessionContext } from "../context/SessionContext";
import { useContext } from "react";

const Paycheck = ({ getPaychecks, getIncomeSources }) => {
  const session = useContext(SessionContext);

  return (
    <>
      <PaycheckForm
        session={session}
        getPaychecks={getPaychecks}
        getIncomeSources={getIncomeSources}
      />
      <PaycheckTable getPaychecks={getPaychecks} />
    </>
  );
};
export default Paycheck;
