import { useContext } from "react";
import formatMoney from "../../../utils/moneyFormatter";
import { ApiContext } from "../../../context/ApiContext";
import fetchAxios from "../../../lib/fetchAxios";

const TransactionCard = ({ transaction }) => {
  const apiCalls = useContext(ApiContext);

  function handleDelete() {
    fetchAxios(
      { method: "DELETE", url: `/api/asset_transactions/${transaction.id}` },
      apiCalls.session,
    ).then(() => {
      apiCalls.transactions.updateData();
      apiCalls.assetTypes.updateData();
    });
  }

  return (
    <div className="flex">
      <div
        key={transaction.id}
        className="mx-10 flex flex-grow items-center justify-between border-b border-gray-200"
      >
        <h2 className="mb-2 text-sm font-semibold text-gray-500">
          {transaction.date}
        </h2>
        <p className="text-sm text-gray-500">
          {formatMoney(transaction.amount)}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <button
          onClick={handleDelete}
          className="mr-10 text-sm text-tertiary-dark hover:underline"
        >
          remove
        </button>
      </div>
    </div>
  );
};
export default TransactionCard;
