import { useSearchParams } from "react-router-dom";

const Filter = ({ isDescending }) => {
  const [, setSearchParams] = useSearchParams();

  const handleCheckboxChange = (event) => {
    setSearchParams(
      (prev) => {
        prev.set("isDescending", String(event.target.checked));
        return prev;
      },
      { replace: true },
    );
  };

  return (
    <div className="flex items-center space-x-2 py-2">
      <input
        type="checkbox"
        checked={isDescending}
        onChange={handleCheckboxChange}
        className="form-checkbox h-4 w-4 text-blue-600"
      />
      <label className="text-sm font-light text-gray-700">
        Order by amount (descending)
      </label>
    </div>
  );
};
export default Filter;
