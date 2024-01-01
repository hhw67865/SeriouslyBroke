import { useState } from "react";
import formatMoney from "../../../utils/moneyFormatter";
import TransactionCard from "./TransactionCard";
import TransactionForm from "./TransactionForm";
import TransactionsPagination from "./TransactionsPagination";

const AssetCard = ({ asset, getTransactions, session, getAssetTypes }) => {
  const [showTransactions, setShowTransactions] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const assetTransactions = getTransactions.data?.filter(
    (transaction) => transaction.asset.id === asset.id,
  );
  const transactionsPerPage = 5;
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = assetTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction,
  );

  return (
    <div className="rounded border bg-white p-4 shadow">
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <h2 className="mb-2 text-lg font-semibold">{asset.name}</h2>
        <p className="text-gray-600">Value: {formatMoney(asset.value)}</p>
      </div>
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <button
          className="text-secondary underline hover:text-primary"
          onClick={() => setShowTransactions(!showTransactions)}
        >
          Show Recent Transactions
        </button>
        <button
          onClick={() => setShowForm(true)}
          className="text-secondary underline hover:text-primary"
        >
          Add Transaction
        </button>
      </div>
      {showForm && (
        <TransactionForm
          asset={asset}
          setShowForm={setShowForm}
          session={session}
          getTransactions={getTransactions}
          getAssetTypes={getAssetTypes}
        />
      )}

      {showTransactions && (
        <div className="grid grid-cols-1 gap-4 pt-4">
          {currentTransactions.map((transaction) => (
            <TransactionCard
              key={transaction.id}
              transaction={transaction}
              session={session}
              getTransactions={getTransactions}
              getAssetTypes={getAssetTypes}
            />
          ))}
          <TransactionsPagination
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            assetTransactions={assetTransactions}
            transactionsPerPage={transactionsPerPage}
          />
        </div>
      )}
    </div>
  );
};
export default AssetCard;
