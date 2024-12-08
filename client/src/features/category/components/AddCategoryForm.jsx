import { useState, useContext } from "react";
import fetchAxios from "../../../lib/fetchAxios";
import formatAxiosErrors from "../../../utils/formatAxiosErrors";
import { ApiContext } from "../../../context/ApiContext";
import { useSearchParams } from "react-router-dom";

const AddCategoryForm = ({ setErrors, setShowForm }) => {
  const apiCalls = useContext(ApiContext);
  const [name, setName] = useState("");
  const [, setSearchParams] = useSearchParams();

  const handleForm = (e) => {
    e.preventDefault();
    fetchAxios(
      { method: "POST", url: "/api/categories", data: { name } },
      apiCalls.session,
    )
      .then(() => {
        apiCalls.categories.updateData();
        setName("");
        setShowForm(false);
        setSearchParams({ category: name });
      })
      .catch((err) => setErrors(formatAxiosErrors(err)));
  };

  const handleCancel = () => {
    setShowForm(false);
    setName("");
    setErrors(null);
  };
  return (
    <div className="rounded border bg-white p-4 shadow">
      <form onSubmit={handleForm}>
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mb-2 w-full text-lg"
        />
        <div className="flex justify-between">
          <button
            type="submit"
            className="ml-2 font-bold text-secondary hover:underline"
          >
            Confirm
          </button>
          <button
            onClick={handleCancel}
            className="mr-2 font-bold text-tertiary-dark hover:underline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddCategoryForm;
