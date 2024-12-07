import { useState, useContext } from "react";
import fetchAxios from "../../../lib/fetchAxios";
import formatAxiosErrors from "../../../utils/formatAxiosErrors";
import Errors from "../../../components/errors/Errors";
import { ApiContext } from "../../../context/ApiContext";

const frequencyOptions = [
  { value: 0, label: "Daily" },
  { value: 1, label: "Monthly" },
  { value: 2, label: "Annual" },
];

const ExpenseForm = () => {
  const apiCalls = useContext(ApiContext);
  const [expenses, setExpenses] = useState([
    { name: "", category_id: "", amount: "", frequency: 0 },
  ]);
  const [date, setDate] = useState("");
  const [errors, setErrors] = useState(null);

  const handleChange = (index, event) => {
    const values = [...expenses];
    if (event.target.name === "name") {
      values[index].name = event.target.value;
    } else if (event.target.name === "category") {
      values[index].category_id = event.target.value;
    } else if (event.target.name === "amount") {
      values[index].amount = event.target.value;
    } else if (event.target.name === "frequency") {
      values[index].frequency = parseInt(event.target.value);
    }
    setExpenses(values);
  };

  const handleAddFields = () => {
    setExpenses([
      ...expenses,
      { name: "", category_id: "", amount: "", frequency: 0 },
    ]);
  };

  const handleRemoveFields = (index) => {
    const values = [...expenses];
    values.splice(index, 1);
    setExpenses(values);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = expenses.map((expense) => ({
      ...expense,
      date,
    }));
    fetchAxios(
      { method: "POST", url: "/api/expenses", data: { expenses: data } },
      apiCalls.session,
    )
      .then(() => {
        setExpenses([{ name: "", category_id: "", amount: "", frequency: 0 }]);
        apiCalls.expenses.updateData();
        apiCalls.categories.updateData();
      })
      .catch((err) => setErrors(formatAxiosErrors(err)));
  };

  const sortedCategories = apiCalls.categories.data?.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    } else {
      return 1;
    }
  });

  return (
    <div className="mt-6 rounded-md bg-gray-100 p-6 shadow-md">
      <h2 className="mb-4 text-center text-2xl font-semibold text-gray-700">
        Add Expenses
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mb-4 rounded border p-2"
          required
        />
        <h2 className="mb-4 text-lg font-bold">Expenses</h2>
        {expenses.map((input, idx) => (
          <div key={`${input}-${idx}`} className="flex items-center space-x-4">
            <div className="flex w-1/3 flex-col">
              <label htmlFor="name" className="mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={input.name}
                onChange={(event) => handleChange(idx, event)}
                required
                className="rounded border p-2"
              />
            </div>
            <div className="flex w-1/3 flex-col">
              <label htmlFor="category" className="mb-1">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={input.category_id}
                onChange={(event) => handleChange(idx, event)}
                required
                className="rounded border p-2"
              >
                <option value="">Select a category</option>
                {sortedCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex w-1/3 flex-col">
              <label htmlFor="amount" className="mb-1">
                Amount
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={input.amount}
                onChange={(event) => handleChange(idx, event)}
                required
                className="rounded border p-2"
              />
            </div>
            <div className="flex w-1/4 flex-col">
              <label htmlFor="frequency" className="mb-1">
                Frequency
              </label>
              <select
                id="frequency"
                name="frequency"
                value={input.frequency}
                onChange={(event) => handleChange(idx, event)}
                required
                className="rounded border p-2"
              >
                {frequencyOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="button"
              onClick={() => handleRemoveFields(idx)}
              className="rounded p-2 font-bold text-tertiary-dark hover:text-tertiary-light"
            >
              X
            </button>
          </div>
        ))}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => handleAddFields()}
            className="w-12 rounded bg-primary p-2 text-xl text-white hover:bg-secondary"
          >
            +
          </button>
        </div>
        <input
          type="submit"
          value="Submit"
          className="rounded bg-primary p-2 text-xl text-white hover:bg-secondary"
        />
        <Errors errors={errors} />
      </form>
    </div>
  );
};
export default ExpenseForm;
