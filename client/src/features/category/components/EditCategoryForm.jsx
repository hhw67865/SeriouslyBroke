import Wheel from '@uiw/react-color-wheel';
import { hsvaToHex } from '@uiw/color-convert';
import { useState } from "react";
import fetchAxios from '../../../lib/fetchAxios';
import Errors from '../../../components/errors/Errors';
import formatAxiosErrors from '../../../utils/formatAxiosErrors';


const EditCategoryForm = ({category, session, setShowForm, getCategories}) => {
  const [hsva, setHsva] = useState({ h: 214, s: 43, v: 90, a: 1 });
  const [minimum_amount, setMinimumAmount] = useState(()=>category.minimum_amount?category.minimum_amount:0);
  const [errors, setErrors] = useState(null);
  const [name, setName] = useState(category.name);

  console.log(hsvaToHex(hsva));

  function handleSubmit (e) {
    e.preventDefault()
    const data = {
      color: hsvaToHex(hsva),
      minimum_amount: minimum_amount,
      name: name
    }
    fetchAxios({ method: "PUT", url: `/api/categories/${category.id}`, data: data }, session)
    .then(()=>{
      getCategories.updateData();
      setShowForm(false);
    })
    .catch((err) => setErrors(formatAxiosErrors(err)));
  }

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <div className="flex justify-between items-start">
        <div>
        <input className="text-3xl font-extrabold mb-4 p-2" value={name} onChange={(e)=>setName(e.target.value)} />
        </div>
        <button onClick={() => setShowForm(false)} className="bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 rounded">Cancel</button>
      </div>
      <div className="flex justify-between flex-grow">
        <div className="mt-2 font-bold text-gray-500">Color:<Wheel color={hsva} onChange={(color) => setHsva({ ...hsva, ...color.hsva })} /></div>
        <div className='flex flex-col'>
          <label htmlFor="minimum_amount" className="mb-1">Budget:</label>
          <input id="minimum_amount" name="minimum_amount" value={minimum_amount} onChange={(e)=>setMinimumAmount(e.target.value)} required className="rounded border p-2" />
        </div>
      </div>
      <Errors errors={errors} />
      <input type="submit" className="mr-2 text-lg font-bold text-secondary hover:underline self-end" />
    </form>
  );
}
export default EditCategoryForm;