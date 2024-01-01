import { useState } from "react";
import EditCategoryForm from "./EditCategoryForm";

const CategoryContainer = ({ categoryId, session, getCategories, getExpenses }) => {
  const [showForm, setShowForm] = useState(false);

  const category = getCategories.data?.find(
    (category) => category.id === categoryId,
  );

  return (
    <>
      {category ? (
        <>
          <div
            className={`m-4 mx-auto max-w-md overflow-hidden rounded-xl border-4 bg-white shadow-md md:max-w-2xl`}
            style={{ borderColor: category.color }}
          >
            <div className="p-8">
              {!showForm ? (
                <>
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="mb-4 text-3xl font-extrabold">
                        {category.name}
                      </h2>
                    </div>
                    <button
                      onClick={() => setShowForm(true)}
                      className="rounded bg-white px-4 py-2 font-bold text-black hover:bg-gray-200"
                    >
                      Edit
                    </button>
                  </div>

                  <div>
                    <p className="mt-2 text-gray-500">
                      <span className="font-bold">Previous Month Total:</span>{" "}
                      {category.last_month_total}
                    </p>
                    <p className="mt-2 text-gray-500">
                      <span className="font-bold">
                        Three Month Average Total:
                      </span>{" "}
                      {category.last_three_month_average}
                    </p>
                    <p className="mt-2">
                      <span className="text-lg font-bold">Budget:</span>{" "}
                      {category.minimum_amount
                        ? category.minimum_amount
                        : "No budget set yet."}
                    </p>
                  </div>
                </>
              ) : (
                <EditCategoryForm
                  session={session}
                  getCategories={getCategories}
                  setShowForm={setShowForm}
                  category={category}
                  getExpenses={getExpenses}
                />
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="rounded border bg-white p-4 shadow">
          <h2 className="mb-2 text-lg font-semibold">No Category Selected</h2>
          <p className="text-gray-600">
            Please select a Category from the list on the left.
          </p>
        </div>
      )}
    </>
  );
};
export default CategoryContainer;
