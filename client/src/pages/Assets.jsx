import { AssetContainer, AssetTypeContainer } from "../features/assets";
import { useState } from "react";

const Assets = () => {
  const [assetTypeId, setAssetTypeId] = useState(null);

  return (
    <div className="container mx-auto flex flex-col px-4 md:flex-row md:space-x-4">
      <div className="w-full md:w-1/3">
        <AssetTypeContainer setAssetTypeId={setAssetTypeId} />
      </div>
      <div className="w-full md:w-2/3">
        <AssetContainer assetTypeId={assetTypeId} />
      </div>
    </div>
  );
};
export default Assets;
