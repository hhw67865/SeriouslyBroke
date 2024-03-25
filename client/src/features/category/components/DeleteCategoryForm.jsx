import fetchAxios from "../../../lib/fetchAxios";
import formatAxiosErrors from "../../../utils/formatAxiosErrors";
import Errors from "../../../components/errors/Errors";
import { useState } from "react";

const DeleteCategoryForm = ({
  session,
  getCategories,
  getExpenses,
  setShowDeleteDialog,
  category,
}) => {
  const [newCategoryId, setNewCategoryId] = useState(null);
  const [errors, setErrors] = useState(null);

  const categoryId = category.id;

  const handleDelete = (e) => {
    e.preventDefault();
    fetchAxios(
      {
        method: "DELETE",
        url: `/api/categories/${categoryId}`,
        params: { category_id: newCategoryId },
      },
      session,
    )
      .then(() => {
        getCategories.updateData();
        getExpenses.updateData();
        setShowDeleteDialog(false);
        setNewCategoryId(null);
      })
      .catch((err) => setErrors(formatAxiosErrors(err)));
  };
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:h-screen sm:align-middle"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <form
          className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle"
          onSubmit={handleDelete}
        >
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3
                  className="text-lg font-medium leading-6 text-gray-900"
                  id="modal-title"
                >
                  Delete Category
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to delete this category? This action
                    cannot be undone.
                  </p>
                  {category.expenses.length > 0 && (
                    <div>
                      <label
                        htmlFor="newCategoryId"
                        className="mt-5 block text-sm font-medium text-gray-700"
                      >
                        Choose a Category to move existing expenses.
                      </label>
                      <select
                        id="newCategoryId"
                        value={newCategoryId}
                        onChange={(e) => setNewCategoryId(e.target.value)}
                        required={category.expenses.length > 0}
                        className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      >
                        <option value="">Select a category</option>
                        {getCategories.data.map((category) => {
                          return category.id === categoryId ? null : (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          );
                        })}
                      </select>
                      <Errors errors={errors} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="submit"
              className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Delete
            </button>
            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:mt-0 sm:w-auto sm:text-sm"
              onClick={() => {
                setShowDeleteDialog(false);
                setNewCategoryId(null);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default DeleteCategoryForm;
