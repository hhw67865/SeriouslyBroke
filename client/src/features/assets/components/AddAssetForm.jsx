import { useState } from "react";
import Errors from "../../../components/errors/Errors";
import fetchAxios from "../../../lib/fetchAxios";
import formatAxiosErrors from "../../../utils/formatAxiosErrors";

const AddAssetForm = ({ setShowForm, session, assetType, getAssetTypes }) => {
  const [name, setName] = useState("");
  const [errors, setErrors] = useState(null);

  const handleCancel = () => {
    setShowForm(false);
    setName("");
    setErrors(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchAxios(
      {
        method: "POST",
        url: "/api/assets",
        data: { name, asset_type_id: assetType.id },
      },
      session,
    )
      .then(() => {
        getAssetTypes.updateData();
        setName("");
        setShowForm(false);
      })
      .catch((err) => setErrors(formatAxiosErrors(err)));
  };

  return (
    <div className="rounded border bg-white p-4 shadow">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Asset Name"
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
      <Errors errors={errors} />
    </div>
  );
};
export default AddAssetForm;
