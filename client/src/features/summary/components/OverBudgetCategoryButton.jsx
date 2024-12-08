import { Link } from "react-router-dom";

const OverBudgetCategoryButton = ({ category, summaryMonth }) => {
  const to = {
    pathname: "/categories",
    search: `?category=${encodeURIComponent(
      category.name,
    )}&isDescending=true&month=${
      summaryMonth.getMonth() + 1
    }&year=${summaryMonth.getFullYear()}`,
  };

  return (
    <Link to={to}>
      <button className="focus:tertiary m-2 inline-flex items-center rounded-md border border-transparent bg-secondary px-6 py-3 text-base font-medium text-white hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2">
        {category.name}
      </button>
    </Link>
  );
};
export default OverBudgetCategoryButton;
