import OverBudgetCategoryButton from "./OverBudgetCategoryButton";
import Markdown from "react-markdown";
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
      <div className="flex h-full flex-col items-center justify-center p-4">
        <div className="mb-4 animate-bounce text-4xl">🤖</div>
        <div className="mb-2 font-bold text-gray-700">
          AI Budget Wizard at Work
        </div>
        <div className="text-center text-gray-600">
          Crunching numbers and analyzing your budget...
        </div>
        <div className="mt-4 flex space-x-1">
          <div className="h-3 w-3 animate-bounce rounded-full bg-blue-500"></div>
          <div
            className="h-3 w-3 animate-bounce rounded-full bg-blue-500"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="h-3 w-3 animate-bounce rounded-full bg-blue-500"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
      </div>
    );
  }

  const handleRefresh = () => {
    setIsLoading(true);
    fetchAxios(
      {
        url: `/api/budget_status/refresh?month=${summaryMonth.getMonth() + 1}&year=${summaryMonth.getFullYear()}`,
      },
      apiCalls.session,
    )
      .then(() => {
        apiCalls.summary.updateData();
        setIsLoading(false);
      })
      .catch((err) => {
        setError(formatAxiosErrors(err));
        setIsLoading(false);
      });
  };

  return (
    <div className="p-4">
      <div className="mb-4 flex flex-col items-start justify-between space-y-2 sm:flex-row sm:items-center sm:space-y-0">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Budget Status</h2>
          <p className="text-sm text-gray-500">
            Generated on:{" "}
            {new Date(apiCalls.summary.data.generated_at).toLocaleString()}
          </p>
        </div>
        <button
          className="inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto sm:justify-start"
          onClick={handleRefresh}
        >
          <svg
            className="mr-2 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            ></path>
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
