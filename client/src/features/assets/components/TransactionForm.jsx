import Errors from "../../../components/errors/Errors";
import fetchAxios from "../../../lib/fetchAxios";
import formatAxiosErrors from "../../../utils/formatAxiosErrors";
import { useState, useContext } from "react";
import { ApiContext } from "../../../context/ApiContext";

const TransactionForm = ({ asset, setShowForm }) => {
  const apiCalls = useContext(ApiContext);
  const [errors, setErrors] = useState(null);
  const [formData, setFormData] = useState({
    date: "",
    amount: "",
    asset_id: asset.id,
  });

  const handleCancel = () => {
    setShowForm(false);
    setErrors(null);
    setFormData({
      date: "",
      amount: "",
      asset_id: asset.id,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchAxios(
      { method: "POST", url: "/api/asset_transactions", data: formData },
      apiCalls.session,
    )
      .then(() => {
        apiCalls.transactions.updateData();
        apiCalls.assetTypes.updateData();
        setShowForm(false);
        setFormData({
          date: "",
          amount: "",
          asset_id: asset.id,
        });
      })
      .catch((err) => setErrors(formatAxiosErrors(err)));
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white p-4 shadow">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex justify-between space-x-4">
          <input
            type="date"
            placeholder="Date"
            value={formData.date}
            onChange={handleFormChange}
            name="date"
            required
            className="w-1/2 flex-grow rounded-md border-gray-300 px-2 text-base focus:border-blue-500 focus:ring-blue-500"
          />
          <input
            placeholder="Amount"
            name="amount"
            value={formData.amount}
            onChange={handleFormChange}
            required
            className="w-1/2 flex-grow rounded-md border-gray-300 px-2 text-base focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="cursor-pointer rounded-md bg-secondary px-2 py-1 text-white transition duration-200 ease-in-out hover:bg-primary"
          >
            Confirm
          </button>
          <button
            onClick={handleCancel}
            className="hover:bg-tertiary-dark-dark cursor-pointer rounded-md bg-tertiary-dark px-2 py-1 text-white transition duration-200 ease-in-out"
          >
            Cancel
          </button>
        </div>
      </form>
      <Errors errors={errors} />
    </div>
  );
};
export default TransactionForm;
