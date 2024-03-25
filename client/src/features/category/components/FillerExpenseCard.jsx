import ExpenseCard from "./ExpenseCard";

const FillerExpenseCard = () => (
  <div className="opacity-0">
    <ExpenseCard
      expense={{
        id: "filler",
        name: "filler",
        amount: "filler",
        date: "filler",
      }}
    />
  </div>
);

export default FillerExpenseCard;
