import { useState } from "react";
import Errors from "../../../components/errors/Errors";
import fetchAxios from "../../../lib/fetchAxios";
import formatAxiosErrors from "../../../utils/formatAxiosErrors";
import AssetCard from "./AssetCard";

const AssetContainer = ({assetTypeId, session, updateAssetTypes, assetTypes, getTransactions}) => {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [errors, setErrors] = useState(null);

  const assetType = assetTypes?.find((type) => type.id === assetTypeId);
 
  const handleCancel = () => {
    setShowForm(false);
    setName("");
    setErrors(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchAxios(
      { method: "POST", url: "/api/assets", data: { name, asset_type_id: assetType.id } },
      session,
    )
      .then(() => {
        updateAssetTypes();
        setName("");
        setShowForm(false);
      })
      .catch((err) => setErrors(formatAxiosErrors(err)));
  }
 
  return (
    <>
      {assetType ? (
        <>
          <div className="flex justify-between items-center border-b border-gray-200 pb-4">
            <h1 className="text-2xl font-bold">{assetType.name}</h1>
            <button
              onClick={() => setShowForm(true)}
              className="rounded bg-secondary px-4 py-2 font-bold text-white hover:bg-primary hover:shadow-lg"
            >
              Add Asset
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4 pt-4">
            {assetType.assets.map((asset) => (
              <AssetCard key={asset.id} asset={asset} session={session} getTransactions={getTransactions} updateAssetTypes={updateAssetTypes}/>
            ))}
            {showForm && (
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
            )}
          </div>
        </>
      ) : (
        <div className="rounded border bg-white p-4 shadow">
          <h2 className="mb-2 text-lg font-semibold">No Asset Type Selected</h2>
          <p className="text-gray-600">Please select an asset type from the list on the left.</p>
        </div>
      )}
    </>
  );
 }
 export default AssetContainer;
 