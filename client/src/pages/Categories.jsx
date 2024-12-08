import {
  CategoryContainer,
  CategorySelectionContainer,
} from "../features/category";

const Categories = () => {
  return (
    <div className="container mx-auto flex flex-col px-4 md:flex-row md:space-x-4 h-screen">
      <div className="w-full md:w-1/3 mb-4 md:mb-0">
        <CategorySelectionContainer/>
      </div>
      <div className="w-full md:w-2/3">
        <CategoryContainer/>
      </div>
    </div>
  );
};
export default Categories;
