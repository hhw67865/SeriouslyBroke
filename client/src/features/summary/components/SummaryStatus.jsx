import OverBudgetCategoryButton from "./OverBudgetCategoryButton";
import Markdown from 'react-markdown'
import { ApiContext } from "../../../context/ApiContext";
import { useContext } from "react";

const SummaryStatus = ({ summaryMonth }) => {
  const apiCalls = useContext(ApiContext);
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  if (apiCalls.summary.loading) {
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

  return (
    <div className="p-4">
      <div className="font-bold text-gray-700">Budget Status</div>
      <div className="text-sm text-gray-500 mb-2">
        {`Generated on: ${new Date(apiCalls.summary.data.generated_at).toLocaleString()}`}
      </div>
      <div className="text-lg font-semibold text-gray-600 mb-2">
        {`${monthNames[apiCalls.summary.data.month - 1]} ${apiCalls.summary.data.year}`}
      </div>
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
