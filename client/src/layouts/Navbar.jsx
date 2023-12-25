import { UserButton } from "@clerk/clerk-react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="fixed top-0 z-50 m-0 flex h-24 h-24 w-full bg-primary px-16 text-quaternary shadow-lg">
      <NavLink
        to="/"
        className="flex items-center px-16 text-4xl font-extrabold hover:text-secondary"
      >
        Home
      </NavLink>
      <NavLink
        to="/Expenses"
        className="flex items-center px-16 text-4xl font-extrabold hover:text-secondary"
      >
        Expenses
      </NavLink>
      <NavLink
        to="/Income"
        className="flex items-center px-16 text-4xl font-extrabold hover:text-secondary"
      >
        Income
      </NavLink>
      <div className="flex flex-grow items-center justify-end">
        <UserButton afterSignOutUrl={"/"} userProfileMode="modal" />
      </div>
    </div>
  );
};
export default Navbar;
