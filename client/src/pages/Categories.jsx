import {
  CategoryContainer,
  CategorySelectionContainer,
} from "../features/category";

const Categories = () => {
  return (
    <div className="container mx-auto flex flex-col px-4 md:flex-row md:space-x-4">
      <div className="w-full md:w-1/3">
        <CategorySelectionContainer/>
      </div>
      <div className="w-full md:w-2/3">
        <CategoryContainer/>
      </div>
    </div>
  );
};
export default Categories;
