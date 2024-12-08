import { useSearchParams } from "react-router-dom";
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';

const CategorySelectionCard = ({ category, onMoveUp, onMoveDown, isFirst, isLast }) => {
  const [, setSearchParams] = useSearchParams();

  const handleClick = () => {
    setSearchParams({ category: category.name });
  };

  return (
    <div className="flex items-center rounded-lg border bg-white p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
         style={{ borderColor: category.color, borderLeftWidth: '4px' }}>
      <div className="flex-grow cursor-pointer" onClick={handleClick}>
        <h2 className="text-lg font-semibold text-gray-800">{category.name}</h2>
      </div>
      <div className="flex flex-col space-y-1">
        <button 
          onClick={onMoveUp} 
          className={`p-1 rounded-full hover:bg-gray-100 transition-colors duration-200 ${isFirst ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-secondary'}`}
          disabled={isFirst}
        >
          <FaChevronUp size={16} />
        </button>
        <button 
          onClick={onMoveDown} 
          className={`p-1 rounded-full hover:bg-gray-100 transition-colors duration-200 ${isLast ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-secondary'}`}
          disabled={isLast}
        >
          <FaChevronDown size={16} />
        </button>
      </div>
    </div>
  );
};

export default CategorySelectionCard;
