import { useClerk } from "@clerk/clerk-react";

const Home = () => {
  const clerk = useClerk();

  return (
    <div className="mt-20 flex min-h-screen flex-col items-center py-6 sm:py-12">
      <div className="relative py-3 sm:mx-auto sm:max-w-xl">
        <div className="absolute inset-0 -skew-y-6 transform bg-gradient-to-r from-secondary shadow-lg sm:-rotate-6 sm:skew-y-0 sm:rounded-3xl"></div>
        <div className="relative bg-white px-4 py-10 shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="mb-8 text-center text-4xl font-bold text-secondary">
            SeriouslyBroke
          </h1>
          <p className="mb-8 text-center text-secondary">
            For the meticulous. Step up from excel but still control your
            finances.
          </p>
          <button
            className="w-full rounded-full bg-tertiary-dark px-4 py-2 font-bold text-white hover:bg-tertiary-light focus:outline-none focus:ring-2 focus:ring-tertiary-dark focus:ring-offset-2"
            onClick={() => clerk.openSignIn({})}
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
