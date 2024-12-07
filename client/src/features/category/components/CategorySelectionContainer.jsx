import { useState, useContext } from "react";
import Errors from "../../../components/errors/Errors";
import CategorySelectionCard from "./CategorySelectionCard";
import AddCategoryForm from "./AddCategoryForm";
import { ApiContext } from "../../../context/ApiContext";

const CategorySelectionContainer = () => {
  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState(null);
  const apiCalls = useContext(ApiContext);
  return (
    <>
      <div className="mb-4">
        <h1 className="text-xl font-bold">Categories</h1>
      </div>
      <div className="grid max-h-[32rem] grid-cols-1 gap-4 overflow-auto">
        {apiCalls.categories.data.map((category) => (
          <CategorySelectionCard key={category.id} category={category} />
        ))}
        {showForm && (
          <AddCategoryForm
            setErrors={setErrors}
            setShowForm={setShowForm}
          />
        )}
      </div>
      <div className="mt-8 flex flex-col items-center justify-center">
        <div style={{ maxWidth: "200px", margin: "auto" }}>
          <button
            onClick={() => setShowForm(true)}
            className="rounded bg-secondary px-4 py-2 font-bold text-white hover:bg-primary hover:shadow-lg"
          >
            Add Category
          </button>
        </div>
        <Errors errors={errors} />
      </div>
    </>
  );
};
export default CategorySelectionContainer;
