import formatMoney from "../../../utils/moneyFormatter";

const AssetTypeCard = ({ type, setAssetTypeId }) => {
  return (
    <div
      onClick={() => setAssetTypeId(type.id)}
      className="rounded border bg-white p-4 shadow hover:border-secondary hover:shadow-md"
    >
      <h2 className="mb-2 text-lg font-semibold">{type.name}</h2>
      <p className="text-gray-600">Value: {formatMoney(type.total_value)}</p>
    </div>
  );
};
export default AssetTypeCard;
