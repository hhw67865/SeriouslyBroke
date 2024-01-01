import { SessionContext } from "../context/SessionContext";
import { useContext, useState } from "react";
import { CategoryContainer, CategorySelectionContainer } from "../features/category";

const Categories = ({getCategories}) => {
  const session = useContext(SessionContext);
  const [categoryId, setCategoryId] = useState(null);

  return (
    <div className="container mx-auto flex flex-col px-4 md:flex-row md:space-x-4">
      <div className="w-full md:w-1/3">
        <CategorySelectionContainer
          session={session}
          getCategories={getCategories}
          setCategoryId={setCategoryId}
        />
      </div>
      <div className="w-full md:w-2/3">
        <CategoryContainer
          session={session}
          getCategories={getCategories}
          categoryId={categoryId}
        />
      </div>
    </div>
  );
}
export default Categories;