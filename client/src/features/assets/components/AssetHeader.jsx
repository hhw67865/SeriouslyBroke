const AssetHeader = ({ assetType, setShowForm }) => {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 pb-4">
      <h1 className="text-2xl font-bold">{assetType.name}</h1>
      <button
        onClick={() => setShowForm(true)}
        className="rounded bg-secondary px-4 py-2 font-bold text-white hover:bg-primary hover:shadow-lg"
      >
        Add Asset
      </button>
    </div>
  );
};
export default AssetHeader;
