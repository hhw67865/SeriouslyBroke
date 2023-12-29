import { useState } from "react";
import fetchAxios from "../../../lib/fetchAxios";
import Errors from "../../../components/errors/Errors";
import formatAxiosErrors from "../../../utils/formatAxiosErrors";
import AssetTypeCard from "./AssetTypeCard";
import formatMoney from "../../../utils/moneyFormatter";

const AssetTypeContainer = ({
  session,
  assetTypes,
  updateAssetTypes,
  setAssetTypeId,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [errors, setErrors] = useState(null);

  const handleAddAsset = (e) => {
    e.preventDefault();
    fetchAxios(
      { method: "POST", url: "/api/asset_types", data: { name } },
      session,
    )
      .then(() => {
        updateAssetTypes();
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

  const totalAssetsValue = assetTypes.reduce(
    (total, type) => total + parseFloat(type.total_value),
    0,
  );

  return (
    <>
      <div className="mb-4">
        <h1 className="text-xl font-bold">
          Total Asset Value: {formatMoney(totalAssetsValue)}
        </h1>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {assetTypes.map((type) => (
          <AssetTypeCard
            key={type.id}
            type={type}
            setAssetTypeId={setAssetTypeId}
          />
        ))}
        {showForm && (
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
        )}
      </div>
      <div className="mt-8 flex flex-col items-center justify-center">
        <div style={{ maxWidth: "200px", margin: "auto" }}>
          <button
            onClick={() => setShowForm(true)}
            className="rounded bg-secondary px-4 py-2 font-bold text-white hover:bg-primary hover:shadow-lg"
          >
            Add Asset Type
          </button>
        </div>
        <Errors errors={errors} />
      </div>
    </>
  );
};

export default AssetTypeContainer;
