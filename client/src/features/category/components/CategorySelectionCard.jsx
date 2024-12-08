import { useSearchParams } from "react-router-dom";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

const CategorySelectionCard = ({
  category,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}) => {
  const [, setSearchParams] = useSearchParams();

  const handleClick = () => {
    setSearchParams({ category: category.name });
  };

  return (
    <div
      className="flex items-center rounded-lg border bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-md cursor-pointer"
      style={{ borderColor: category.color, borderLeftWidth: "4px" }}
      onClick={handleClick}
    >
      <div className="flex-grow">
        <h2 className="text-lg font-semibold text-gray-800">{category.name}</h2>
      </div>
      <div className="flex flex-col space-y-1" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onMoveUp}
          className={`rounded-full p-1 transition-colors duration-200 hover:bg-gray-100 ${isFirst ? "cursor-not-allowed text-gray-300" : "text-gray-500 hover:text-secondary"}`}
          disabled={isFirst}
        >
          <FaChevronUp size={16} />
        </button>
        <button
          onClick={onMoveDown}
          className={`rounded-full p-1 transition-colors duration-200 hover:bg-gray-100 ${isLast ? "cursor-not-allowed text-gray-300" : "text-gray-500 hover:text-secondary"}`}
          disabled={isLast}
        >
          <FaChevronDown size={16} />
        </button>
      </div>
    </div>
  );
};

export default CategorySelectionCard;
