import { WeekViewer, ExpenseForm } from "../features/expense-edit";
import { SessionContext } from "../context/SessionContext";
import { useContext, useState } from "react";

const EditExpenses = ({ getExpenses, getCategories }) => {
  const [update, setUpdate] = useState(false);
  const session = useContext(SessionContext);

  function updateExpenses() {
    setUpdate(!update);
  }

  return (
    <>
      <WeekViewer
        session={session}
        getExpenses={getExpenses}
        update={update}
        updateExpenses={updateExpenses}
      />
      <ExpenseForm
        session={session}
        getCategories={getCategories}
        getExpenses={getExpenses}
      />
    </>
  );
};
export default EditExpenses;
