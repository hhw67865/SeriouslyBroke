import { useState } from "react";
import Errors from "../../../components/errors/Errors";
import AssetTypeCard from "./AssetTypeCard";
import formatMoney from "../../../utils/moneyFormatter";
import AddAssetTypeForm from "./AddAssetTypeForm";

const AssetTypeContainer = ({ session, getAssetTypes, setAssetTypeId }) => {
  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState(null);

  const totalAssetsValue = getAssetTypes.data.reduce(
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
        {getAssetTypes.data.map((type) => (
          <AssetTypeCard
            key={type.id}
            type={type}
            setAssetTypeId={setAssetTypeId}
          />
        ))}
        {showForm && (
          <AddAssetTypeForm
            session={session}
            getAssetTypes={getAssetTypes}
            setErrors={setErrors}
            setShowForm={setShowForm}
          />
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
