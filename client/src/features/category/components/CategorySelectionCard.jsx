import { useSearchParams } from "react-router-dom";

const CategorySelectionCard = ({ category }) => {
  const [, setSearchParams] = useSearchParams();

  const handleClick = () => {
    setSearchParams({ category: category.name });
  };

  return (
    <div
      onClick={handleClick}
      className="rounded border-4 bg-white p-4 shadow hover:border-secondary hover:shadow-md"
      style={{ borderColor: category.color }}
    >
      <h2 className="mb-2 text-lg font-semibold">{category.name}</h2>
    </div>
  );
};
export default CategorySelectionCard;
