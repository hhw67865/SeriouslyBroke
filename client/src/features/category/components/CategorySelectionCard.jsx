const CategorySelectionCard = ({ setCategoryId, category }) => {
  return (
    <div
      onClick={() => setCategoryId(category.id)}
      className="rounded border-4 bg-white p-4 shadow hover:border-secondary hover:shadow-md"
      style={{ borderColor: category.color }}
    >
      <h2 className="mb-2 text-lg font-semibold">{category.name}</h2>
      {/* <p className="text-gray-600">Value: {formatMoney(category.total_value)}</p> */}
    </div>
  );
};
export default CategorySelectionCard;
