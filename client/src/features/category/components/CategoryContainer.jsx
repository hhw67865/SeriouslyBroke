import { useState } from "react";
import EditCategoryForm from "./EditCategoryForm";

const CategoryContainer = ({
  categoryId,
  session,
  getCategories,
}) => {
  const [showForm, setShowForm] = useState(false);

  const category = getCategories.data?.find((category) => category.id === categoryId);

  return (
    <>
      {category ? (
        <>
 <div className={`max-w-md mx-auto border-4 bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4`} style={{borderColor: category.color}}>
           <div className="p-8">
           {!showForm ?
           <>
             <div className="flex justify-between items-start">
               <div>
                <h2 className="text-3xl font-extrabold mb-4">{category.name}</h2>
               </div>
               <button onClick={() => setShowForm(true)} className="bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 rounded">Edit</button>
             </div>
             
             <div>
               <p className="mt-2 text-gray-500"><span className="font-bold">Previous Month Total:</span> {category.last_month_total}</p>
               <p className="mt-2 text-gray-500"><span className="font-bold">Three Month Average Total:</span> {category.last_three_month_average}</p>
               <p className="mt-2"><span className="font-bold text-lg">Budget:</span> {category.minimum_amount?category.minimum_amount: "No budget set yet." }</p>
             </div>
             </>
              :
                <EditCategoryForm
                  session={session}
                  getCategories={getCategories}
                  setShowForm={setShowForm}
                  category={category}
                />
             }
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
}
export default CategoryContainer;