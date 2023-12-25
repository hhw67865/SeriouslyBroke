import { WeekViewer, ExpenseForm } from "../features/expense-edit";
import { SessionContext } from "../context/SessionContext";
import { useContext, useState } from "react";

const EditExpenses = () => {
  const [update, setUpdate] = useState(false);
  const session = useContext(SessionContext);

  function updateExpenses() {
    setUpdate(!update);
  }

  return (
    <>
      <WeekViewer
        session={session}
        update={update}
        updateExpenses={updateExpenses}
      />
      <ExpenseForm session={session} updateExpenses={updateExpenses} />
    </>
  );
};
export default EditExpenses;
