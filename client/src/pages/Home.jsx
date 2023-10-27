import { useClerk } from "@clerk/clerk-react";

const Home = () => {
  const clerk = useClerk();

  return (
    <>
      <h1> This is Home </h1>
      <button onClick={() => clerk.openSignIn({})}>Sign in</button>;
    </>
  );
};
export default Home;
