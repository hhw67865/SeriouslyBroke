import { AssetContainer, AssetTypeContainer } from "../features/assets";
import { SessionContext } from "../context/SessionContext";
import { useContext, useState } from "react";

const Assets = ({ getTransactions, getAssetTypes }) => {
  const session = useContext(SessionContext);
  const [assetTypeId, setAssetTypeId] = useState(null);

  return (
    <div className="container mx-auto flex flex-col px-4 md:flex-row md:space-x-4">
      <div className="w-full md:w-1/3">
        <AssetTypeContainer
          session={session}
          getAssetTypes={getAssetTypes}
          setAssetTypeId={setAssetTypeId}
        />
      </div>
      <div className="w-full md:w-2/3">
        <AssetContainer
          session={session}
          getAssetTypes={getAssetTypes}
          assetTypeId={assetTypeId}
          getTransactions={getTransactions}
        />
      </div>
    </div>
  );
};
export default Assets;
