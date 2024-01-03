import { useClerk } from "@clerk/clerk-react";

const Home = () => {
 const clerk = useClerk();

 return (
 <div className="min-h-screen py-6 flex flex-col items-center mt-20 sm:py-12">
   <div className="relative py-3 sm:max-w-xl sm:mx-auto">
     <div className="absolute inset-0 bg-gradient-to-r from-secondary shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
     <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
       <h1 className="text-4xl font-bold text-center mb-8 text-secondary">SeriouslyBroke</h1>
       <p className="text-center mb-8 text-secondary">For the meticulous. Step up from excel but still control your finances.</p>
       <button className="w-full px-4 py-2 text-white font-bold bg-tertiary-dark hover:bg-tertiary-light rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tertiary-dark" onClick={() => clerk.openSignIn({})}>Sign in</button>
     </div>
   </div>
 </div>
 );
};

export default Home;

