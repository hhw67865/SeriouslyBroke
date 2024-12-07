const LoadingPage = ({ apiCalls }) => {
  const loadingItems = Object.entries(apiCalls)
    .filter(([key]) => key !== 'session')
    .map(([key, value]) => ({
      label: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1'),
      loaded: !!value.data
    }));

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Loading your financial data...</h2>
        <ul className="space-y-2">
          {loadingItems.map(({ label, loaded }) => (
            <li key={label} className="flex items-center">
              {loaded ? (
                <svg className="h-5 w-5 mr-3 text-green-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="animate-spin h-5 w-5 mr-3 text-blue-500" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              )}
              <span className={loaded ? 'text-gray-400' : 'text-gray-600'}>{label}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-gray-500">This may take a moment. Thanks for your patience!</p>
      </div>
    </div>
  );
};

export default LoadingPage;