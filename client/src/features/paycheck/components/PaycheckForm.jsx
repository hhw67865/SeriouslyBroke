import { useState } from "react";
import CreatableSelect from "react-select/creatable";
import fetchAxios from "../../../lib/fetchAxios";
import useIncomeSources from "../hooks/useIncomeSources";
import formatAxiosErrors from "../../../utils/formatAxiosErrors";

const PaycheckForm = ({ session, updatePaychecks }) => {
  const { incomeSources } = useIncomeSources("/api/income_sources", session);
  const [errors, setErrors] = useState(null);

  const [formData, setFormData] = useState({
    date: "",
    income_source_id: "",
    amount: 0,
  });

  function handleFormChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSelectChange(e) {
    setFormData((prev) => {
      const newData = { ...prev };
      delete newData.income_source_id;
      delete newData.income_source_attributes;

      if (e?.__isNew__) {
        newData.income_source_attributes = { name: e?.value };
      } else {
        newData.income_source_id = e?.value;
      }

      return newData;
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetchAxios(
      {
        method: "POST",
        url: "/api/paychecks",
        data: formData,
      },
      session,
    )
      .then(() => {
        setFormData((prev) => ({ ...prev, date: "", amount: 0 }));
        updatePaychecks();
      })
      .catch((err) => {
        setErrors(formatAxiosErrors(err));
      });
  }

  return (
    <>
      <form
        className="my-10 w-full max-w-lg rounded bg-white px-5 py-10 shadow-lg"
        onSubmit={handleSubmit}
      >
        <div className="mb-6">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="date"
          >
            Date:
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleFormChange}
          />
        </div>
        <div className="mb-6">
          <CreatableSelect
            isClearable
            options={incomeSources}
            onChange={handleSelectChange}
          />
        </div>
        <div className="mb-6">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="amount"
          >
            Amount:
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            name="amount"
            value={formData.amount}
            onChange={handleFormChange}
          />
        </div>
        <div className="mb-6">
          <input
            className="focus:shadow-outline w-full rounded bg-primary px-4 py-2 font-bold text-white hover:bg-secondary focus:outline-none"
            type="submit"
            value="Submit"
          />
        </div>
        {errors
          ? errors.map((error, index) => (
              <p className="text-xs italic text-red-500" key={index}>
                {error}
              </p>
            ))
          : null}
      </form>
    </>
  );
};

export default PaycheckForm;
