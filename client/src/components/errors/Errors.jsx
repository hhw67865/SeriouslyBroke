const Errors = ({ errors }) => {
  if (errors && !Array.isArray(errors)) {
    <>
      <div className="text-center text-tertiary-dark" role="alert">
        {errors}
      </div>
    </>
  }

  return (
    <>
      {errors && (
        <div className="text-center text-tertiary-dark" role="alert">
          {errors.map((error, idx) => (
            <span key={idx}>{error}</span>
          ))}
        </div>
      )}
    </>
  );
};
export default Errors;
