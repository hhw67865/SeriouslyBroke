import { SessionContext } from "../context/SessionContext";
import { useContext } from "react";
import {
  CategoryContainer,
  CategorySelectionContainer,
} from "../features/category";

const Categories = ({ getCategories, getExpenses }) => {
  const session = useContext(SessionContext);

  return (
    <div className="container mx-auto flex flex-col px-4 md:flex-row md:space-x-4">
      <div className="w-full md:w-1/3">
        <CategorySelectionContainer
          session={session}
          getCategories={getCategories}
        />
      </div>
      <div className="w-full md:w-2/3">
        <CategoryContainer
          session={session}
          getCategories={getCategories}
          getExpenses={getExpenses}
        />
      </div>
    </div>
  );
};
export default Categories;
