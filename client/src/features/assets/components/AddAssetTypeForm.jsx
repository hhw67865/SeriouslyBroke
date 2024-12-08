import { useState, useContext } from "react";
import fetchAxios from "../../../lib/fetchAxios";
import formatAxiosErrors from "../../../utils/formatAxiosErrors";
import { ApiContext } from "../../../context/ApiContext";

const AddAssetTypeForm = ({ setShowForm, setErrors }) => {
  const apiCalls = useContext(ApiContext);
  const [name, setName] = useState("");

  const handleAddAsset = (e) => {
    e.preventDefault();
    fetchAxios(
      { method: "POST", url: "/api/asset_types", data: { name } },
      apiCalls.session,
    )
      .then(() => {
        apiCalls.assetTypes.updateData();
        setName("");
        setShowForm(false);
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
      <form onSubmit={handleAddAsset}>
        <input
          type="text"
          placeholder="Asset Type Name"
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
export default AddAssetTypeForm;
