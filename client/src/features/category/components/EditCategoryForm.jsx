import Wheel from "@uiw/react-color-wheel";
import { hsvaToHex, hexToHsva } from "@uiw/color-convert";
import { useState, useContext } from "react";
import { ApiContext } from "../../../context/ApiContext";
import fetchAxios from "../../../lib/fetchAxios";
import Errors from "../../../components/errors/Errors";
import formatAxiosErrors from "../../../utils/formatAxiosErrors";

const EditCategoryForm = ({ category, setShowForm }) => {
  const apiCalls = useContext(ApiContext);
  const [hsva, setHsva] = useState(
    category.color ? hexToHsva(category.color) : { h: 214, s: 43, v: 90, a: 1 },
  );
  const [minimum_amount, setMinimumAmount] = useState(() =>
    category.minimum_amount ? category.minimum_amount : 0,
  );
  const [errors, setErrors] = useState(null);
  const [name, setName] = useState(category.name);

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      color: hsvaToHex(hsva),
      minimum_amount: minimum_amount,
      name: name,
    };
    fetchAxios(
      { method: "PUT", url: `/api/categories/${category.id}`, data: data },
      apiCalls.session,
    )
      .then(() => {
        apiCalls.categories.updateData();
        setShowForm(false);
        apiCalls.expenses.updateData();
      })
      .catch((err) => setErrors(formatAxiosErrors(err)));
  }

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <div className="flex items-start justify-between">
        <div>
          <input
            className="mb-4 p-2 text-3xl font-extrabold"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button
          onClick={() => setShowForm(false)}
          className="rounded bg-white px-4 py-2 font-bold text-black hover:bg-gray-200"
        >
          Cancel
        </button>
      </div>
      <div className="flex flex-grow justify-between">
        <div className="mt-2 font-bold text-gray-500">
          Color:
          <Wheel
            color={hsva}
            onChange={(color) => setHsva({ ...hsva, ...color.hsva })}
          />
          <button onClick={() => setHsva({ h: 214, s: 43, v: 90, a: 1 })}>
            Reset Color
          </button>
        </div>
        <div className="flex flex-col">
          <label htmlFor="minimum_amount" className="mb-1">
            Budget:
          </label>
          <input
            id="minimum_amount"
            name="minimum_amount"
            value={minimum_amount}
            onChange={(e) => setMinimumAmount(e.target.value)}
            required
            className="rounded border p-2"
          />
        </div>
      </div>
      <Errors errors={errors} />
      <input
        type="submit"
        className="mr-2 self-end text-lg font-bold text-secondary hover:underline"
      />
    </form>
  );
};
export default EditCategoryForm;
