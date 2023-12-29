const Errors = ({ errors }) => {
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
