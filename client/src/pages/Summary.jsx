import { useState } from 'react';

const Summary = () => {
  const [date, setDate] = useState(new Date());

  const nextMonth = () => {
    setDate(new Date(date.setMonth(date.getMonth() + 1)));
  };

  const prevMonth = () => {
    setDate(new Date(date.setMonth(date.getMonth() - 1)));
  };

  return (
    <div className="container mx-auto px-4">
      <div className="sticky top-24 z-50 grid grid-cols-1 gap-4 border border-gray-400 max-w-md mx-auto shadow-lg rounded-lg overflow-hidden">
        <div className="p-4 flex justify-between items-center bg-secondary text-quaternary">
          <button className="text-4xl font-extrabold" onClick={prevMonth}>
            &#8592;
          </button>
          <h2 className="text-2xl font-extrabold">{date.toLocaleString('default', { month: 'long' })} {date.getFullYear()}</h2>
          <button className="text-4xl font-extrabold" onClick={nextMonth}>
            &#8594;
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-gray-300 p-4 mt-8 bg-quaternary shadow-lg rounded-lg overflow-hidden">
        <div className="border border-gray-200 p-2">Section 2.1</div>
        <div className="border border-gray-200 p-2">Section 2.2</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border border-gray-300 p-4 mt-8 bg-quaternary shadow-lg rounded-lg overflow-hidden">
        <div className="border border-gray-200 p-2">Section 3.1</div>
        <div className="border border-gray-200 p-2">Section 3.2</div>
        <div className="border border-gray-200 p-2">Section 3.3</div>
      </div>
    </div>
  );
};
export default Summary;
