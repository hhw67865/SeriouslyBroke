import { useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";

import EditCategoryForm from "./EditCategoryForm";
import ExpensesContainer from "./ExpensesContainer";
import DeleteCategoryForm from "./DeleteCategoryForm";
import formatMoney from "../../../utils/moneyFormatter";
import { ApiContext } from "../../../context/ApiContext";

const CategoryContainer = () => {
  const apiCalls = useContext(ApiContext);
  const [showForm, setShowForm] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [searchParams] = useSearchParams();
  const categoryName = searchParams.get("category");

  const category = apiCalls.categories.data?.find(
    (category) => category.name === categoryName,
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

                  <div className="flex flex-col">
                    <p className="mt-2">
                      <span className="text-lg font-bold">Budget:</span>{" "}
                      {category.minimum_amount
                        ? formatMoney(category.minimum_amount)
                        : "No budget set yet."}
                    </p>
                    <button
                      onClick={() => setShowDeleteDialog(true)}
                      className="self-end rounded bg-white px-4 py-2 font-bold text-tertiary-dark hover:bg-gray-200"
                    >
                      Delete
                    </button>
                    <hr className="my-4 border-gray-200" />
                    <ExpensesContainer category={category} />
                  </div>
                </>
              ) : (
                <EditCategoryForm
                  setShowForm={setShowForm}
                  category={category}
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
      {showDeleteDialog && (
        <DeleteCategoryForm
          setShowDeleteDialog={setShowDeleteDialog}
          category={category}
        />
      )}
    </>
  );
};

export default CategoryContainer;
