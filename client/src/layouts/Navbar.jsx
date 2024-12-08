import { useState } from "react";
import { UserButton } from "@clerk/clerk-react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { to: "/", text: "Home" },
    { to: "/Expenses", text: "Expenses" },
    { to: "/Categories", text: "Categories" },
    { to: "/Income", text: "Income" },
    { to: "/Assets", text: "Assets" },
  ];

  return (
    <nav className="fixed top-0 z-50 w-full bg-primary text-quaternary shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            <NavLink to="/" className="text-2xl sm:text-3xl font-extrabold hover:text-secondary transition-colors duration-200">
              SeriouslyBroke
            </NavLink>
          </div>
          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2 text-lg font-medium transition-colors duration-200 ${
                    isActive ? 'bg-primary-dark text-secondary' : 'hover:bg-primary-dark hover:text-secondary'
                  }`
                }
              >
                {item.text}
              </NavLink>
            ))}
            <div className="ml-4">
              <UserButton 
                afterSignOutUrl={"/"} 
                userProfileMode="modal"
                appearance={{
                  elements: {
                    avatarBox: "h-10 w-10"
                  }
                }}
              />
            </div>
          </div>
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center rounded-md p-2 text-quaternary hover:bg-primary-dark hover:text-secondary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors duration-200"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden">
          <div className="space-y-2 px-4 pb-4 pt-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `block rounded-md px-4 py-3 text-lg font-medium transition-colors duration-200 ${
                    isActive ? 'bg-primary-dark text-secondary' : 'hover:bg-primary-dark hover:text-secondary'
                  }`
                }
                onClick={toggleMenu}
              >
                {item.text}
              </NavLink>
            ))}
          </div>
          <div className="border-t border-primary-dark pb-4 pt-4">
            <div className="flex items-center px-5">
              <UserButton 
                afterSignOutUrl={"/"} 
                userProfileMode="modal"
                appearance={{
                  elements: {
                    avatarBox: "h-12 w-12"
                  }
                }}
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
