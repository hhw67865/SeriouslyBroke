import { useState } from "react";
import AssetCard from "./AssetCard";
import AssetHeader from "./AssetHeader";
import AddAssetForm from "./AddAssetForm";

const AssetContainer = ({
  assetTypeId,
  session,
  getAssetTypes,
  getTransactions,
}) => {
  const [showForm, setShowForm] = useState(false);

  const assetType = getAssetTypes.data?.find((type) => type.id === assetTypeId);

  return (
    <>
      {assetType ? (
        <>
          <AssetHeader assetType={assetType} setShowForm={setShowForm} />
          <div className="grid grid-cols-1 gap-4 pt-4">
            {assetType.assets.map((asset) => (
              <AssetCard
                key={asset.id}
                asset={asset}
                session={session}
                getTransactions={getTransactions}
                getAssetTypes={getAssetTypes}
              />
            ))}
            {showForm && (
              <AddAssetForm
                setShowForm={setShowForm}
                session={session}
                assetType={assetType}
                getAssetTypes={getAssetTypes}
              />
            )}
          </div>
        </>
      ) : (
        <div className="rounded border bg-white p-4 shadow">
          <h2 className="mb-2 text-lg font-semibold">No Asset Type Selected</h2>
          <p className="text-gray-600">
            Please select an asset type from the list on the left.
          </p>
        </div>
      )}
    </>
  );
};
export default AssetContainer;
