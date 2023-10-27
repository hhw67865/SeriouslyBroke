import { UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  return (
    <div className="fixed top-0 m-0 flex h-24 h-24 w-full px-16 text-quaternary shadow-lg ">
      <i className="flex items-center px-16 text-4xl font-extrabold hover:text-secondary">
        Home
      </i>
      <i className="flex items-center px-16 text-4xl font-extrabold hover:text-secondary">
        Expenses
      </i>
      <i className="flex items-center px-16 text-4xl font-extrabold hover:text-secondary">
        Income
      </i>
      <div className="flex flex-grow items-center justify-end">
        <UserButton afterSignOutUrl={"/"} userProfileMode="modal" />
      </div>
    </div>
  );
};
export default Navbar;
