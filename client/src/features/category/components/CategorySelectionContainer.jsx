import { useState } from "react";
import Errors from "../../../components/errors/Errors";
import CategorySelectionCard from "./CategorySelectionCard";
import AddCategoryForm from "./AddCategoryForm";

const CategorySelectionContainer = ({
  getCategories,
  setCategoryId,
  session,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState(null);

  return (
    <>
      <div className="mb-4">
        <h1 className="text-xl font-bold">Categories</h1>
      </div>
      <div className="grid max-h-[32rem] grid-cols-1 gap-4 overflow-auto">
        {getCategories.data.map((category) => (
          <CategorySelectionCard
            key={category.id}
            category={category}
            setCategoryId={setCategoryId}
          />
        ))}
        {showForm && (
          <AddCategoryForm
            session={session}
            getCategories={getCategories}
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
