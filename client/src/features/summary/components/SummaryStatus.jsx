import OverBudgetCategoryButton from "./OverBudgetCategoryButton";
import Markdown from 'react-markdown'
import { ApiContext } from "../../../context/ApiContext";
import { useContext, useState } from "react";
import Errors from "../../../components/errors/Errors";
import formatAxiosErrors from "../../../utils/formatAxiosErrors";
import fetchAxios from "../../../lib/fetchAxios";

const SummaryStatus = ({ summaryMonth }) => {
  const apiCalls = useContext(ApiContext);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  if (apiCalls.summary.loading || isLoading) {
    return (
      <div className="p-4 flex flex-col items-center justify-center h-full">
        <div className="text-4xl mb-4 animate-bounce">🤖</div>
        <div className="font-bold text-gray-700 mb-2">AI Budget Wizard at Work</div>
        <div className="text-gray-600 text-center">
          Crunching numbers and analyzing your budget...
        </div>
        <div className="mt-4 flex space-x-1">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
        </div>
      </div>
    );
  }

  const handleRefresh = () => {
    setIsLoading(true);
    fetchAxios({
      url: `/api/budget_status/refresh?month=${summaryMonth.getMonth() + 1}&year=${summaryMonth.getFullYear()}`
    }, apiCalls.session)
    .then(() => {
      apiCalls.summary.updateData();
      setIsLoading(false);
    })
    .catch((err) => {
      setError(formatAxiosErrors(err));
      setIsLoading(false);
    });
  }

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-2 sm:space-y-0">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Budget Status</h2>
          <p className="text-sm text-gray-500">
            Generated on: {new Date(apiCalls.summary.data.generated_at).toLocaleString()}
          </p>
        </div>
        <button
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full sm:w-auto justify-center sm:justify-start"
          onClick={handleRefresh}
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
          Refresh
        </button>
      </div>
      <Errors error={error} />
      <Markdown>{apiCalls.summary.data.description}</Markdown>
      <div className="mt-4 text-gray-600">
        <div className="mb-5 font-bold text-gray-700">
          What happened? Take a closer look &#x1F440;
        </div>
        {apiCalls.summary.data.exceeding_categories.map((category, id) => (
          <OverBudgetCategoryButton
            key={id}
            category={category}
            summaryMonth={summaryMonth}
          />
        ))}
      </div>
    </div>
  );
};

export default SummaryStatus;
