import { useState } from "react";
import Errors from "../../../components/errors/Errors";
import fetchAxios from "../../../lib/fetchAxios";
import formatAxiosErrors from "../../../utils/formatAxiosErrors";
import formatMoney from "../../../utils/moneyFormatter";

const AssetCard = ({asset, getTransactions, session, updateAssetTypes}) => {
  const [showTransactions, setShowTransactions] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState(null);
  const [formData, setFormData] = useState({
    date: "",
    amount: "",
    asset_id: asset.id,
  });
  const [currentPage, setCurrentPage] = useState(1);


const nextPage = () => setCurrentPage(currentPage + 1);
const prevPage = () => setCurrentPage(currentPage - 1);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const assetTransactions = getTransactions.data?.filter((transaction) => transaction.asset.id === asset.id);
  const transactionsPerPage = 5;
  const indexOfLastTransaction = currentPage * transactionsPerPage;
const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
const currentTransactions = assetTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const handleCancel = () => {
    setShowForm(false);
    setErrors(null);
    setFormData({
      date: "",
      amount: "",
      asset_id: asset.id,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchAxios(
      { method: "POST", url: "/api/asset_transactions", data: formData },
      session,
    )
      .then(() => {
        getTransactions.updateData();
        updateAssetTypes();
        setShowForm(false);
        setFormData({
          date: "",
          amount: "",
          asset_id: asset.id,
        });
      })
      .catch((err) => setErrors(formatAxiosErrors(err)));
  }
  

  return (
    <div className="rounded border bg-white p-4 shadow">
      <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                <h2 className="mb-2 text-lg font-semibold">{asset.name}</h2>
                <p className="text-gray-600">Value: {formatMoney(asset.value)}</p>
                </div>
                <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                  <button className="text-secondary underline hover:text-primary" onClick={
                    () => setShowTransactions(!showTransactions)
                  }>Show Recent Transactions</button>
                  <button onClick={()=>setShowForm(true)}  className="text-secondary underline hover:text-primary">Add Transaction</button>
                </div>
                {showForm && (
 <div className=" p-4 shadow">
 <form onSubmit={handleSubmit} className="space-y-4">
   <div className="flex justify-between space-x-4">
     <input
       type="date"
       placeholder="Date"
       value={formData.date}
       onChange={handleFormChange}
       name="date"
       required
       className="flex-grow text-lg rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 px-4"
     />
     <input
       type="number"
       placeholder="Amount"
       name="amount"
       value={formData.amount}
       onChange={handleFormChange}
       required
       className="flex-grow text-lg rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 px-4"
     />
   </div>
   <div className="flex justify-between">
     <button
       type="submit"
       className="bg-secondary text-white rounded-md px-3 py-1 cursor-pointer hover:bg-primary transition duration-200 ease-in-out"
     >
       Confirm
     </button>
     <button
       onClick={handleCancel}
       className="bg-tertiary-dark text-white rounded-md px-3 py-1 cursor-pointer hover:bg-tertiary-dark-dark transition duration-200 ease-in-out"
     >
       Cancel
     </button>
   </div>
 </form>
 <Errors errors={errors} />
 </div>
)}



                {showTransactions && (
                  <div className="grid grid-cols-1 gap-4 pt-4">
 {currentTransactions.map((transaction) => (
 <div key={transaction.id} className="flex justify-between items-center border-b border-gray-200 mx-10">
   <h2 className="mb-2 font-semibold text-sm text-gray-500">{transaction.date}</h2>
   <p className="text-sm text-gray-500">{formatMoney(transaction.amount)}</p>
 </div>
 ))}
 <div className="flex justify-between items-center">
 <button 
   onClick={prevPage} 
   disabled={currentPage === 1}
   className="bg-white text-black border border-gray-300 rounded-md px-3 py-1 cursor-pointer hover:bg-gray-200"
 >
   &#8592; Prev
 </button>
 <span className="text-sm text-gray-500">
   Page {currentPage} of {Math.ceil(assetTransactions.length / transactionsPerPage)}
 </span>
 <button 
   onClick={nextPage} 
   disabled={currentPage === Math.ceil(assetTransactions.length / transactionsPerPage)}
   className="bg-white text-black border border-gray-300 rounded-md px-3 py-1 cursor-pointer hover:bg-gray-200"
 >
   Next &#8594;
 </button>
 </div>
</div>
)}


              </div>
  );
}
export default AssetCard;