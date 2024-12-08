import { useState, useContext, useEffect } from "react";
import Errors from "../../../components/errors/Errors";
import CategorySelectionCard from "./CategorySelectionCard";
import AddCategoryForm from "./AddCategoryForm";
import { ApiContext } from "../../../context/ApiContext";
import fetchAxios from "../../../lib/fetchAxios";
import formatAxiosErrors from "../../../utils/formatAxiosErrors";

const CategorySelectionContainer = () => {
  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState(null);
  const [categories, setCategories] = useState([]);
  const [hasChanges, setHasChanges] = useState(false);
  const apiCalls = useContext(ApiContext);

  useEffect(() => {
    setCategories(apiCalls.categories.data);
  }, [apiCalls.categories.data]);

  const moveCategory = (index, direction) => {
    const newCategories = [...categories];
    const temp = newCategories[index];
    newCategories[index] = newCategories[index + direction];
    newCategories[index + direction] = temp;
    setCategories(newCategories);
    setHasChanges(true);
  };

  const saveOrder = () => {
    fetchAxios({
      method: 'post',
      url: '/api/categories/reorder',
      data: { category_ids: categories.map(c => c.id) }
    }, apiCalls.session)
      .then(() => {
        setHasChanges(false);
        setErrors(null);
        apiCalls.categories.updateData();
      })
      .catch(error => {
        setErrors(formatAxiosErrors(error));
      });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Categories</h1>
        <div className="flex items-center space-x-2">
          {hasChanges && (
            <button
              onClick={saveOrder}
              className="px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600"
            >
              Save
            </button>
          )}
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="px-3 py-1 bg-secondary text-white text-sm font-medium rounded hover:bg-primary"
            >
              Add Category
            </button>
          )}
        </div>
      </div>
      {showForm && (
        <div className="mb-4">
          <AddCategoryForm
            setErrors={setErrors}
            setShowForm={setShowForm}
          />
        </div>
      )}
      <div className="flex-grow overflow-auto">
        <div className="space-y-2">
          {categories.map((category, index) => (
            <CategorySelectionCard 
              key={category.id} 
              category={category}
              onMoveUp={() => index > 0 && moveCategory(index, -1)}
              onMoveDown={() => index < categories.length - 1 && moveCategory(index, 1)}
              isFirst={index === 0}
              isLast={index === categories.length - 1}
            />
          ))}
        </div>
      </div>
      <Errors errors={errors} />
    </div>
  );
};

export default CategorySelectionContainer;

