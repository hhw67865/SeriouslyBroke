import { AssetContainer, AssetTypeContainer } from "../features/assets";
import { SessionContext } from "../context/SessionContext";
import { useContext, useState } from "react";
import useAxiosGet from "../hooks/useAxiosGet";


const Assets = ({getTransactions}) => {
  const session = useContext(SessionContext);
  const { data: assetTypes, updateData: updateAssetTypes } = useAxiosGet(
    "/api/asset_types",
    session,
  );
  const [assetTypeId, setAssetTypeId] = useState(null);

  console.log(assetTypes);

  return (
<div className="container mx-auto px-4 flex flex-col md:flex-row md:space-x-4">
    <div className="w-full md:w-1/3">
      <AssetTypeContainer session={session} assetTypes={assetTypes} updateAssetTypes={updateAssetTypes} setAssetTypeId={setAssetTypeId} />
    </div>
      <div className="w-full md:w-2/3">
        <AssetContainer session={session} assetTypes={assetTypes} assetTypeId={assetTypeId} updateAssetTypes={updateAssetTypes} getTransactions={getTransactions} />
      </div>
  </div>
  );
};
export default Assets;
