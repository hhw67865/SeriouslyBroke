const Footer = () => {
  return (
    <div className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between">
        <div className="flex">
          <h1 className="mr-4 text-lg font-bold">Company Name</h1>
          <ul className="space-x-4">
            <li>
              <a href="/about" className="hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:underline">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h1 className="mr-4 text-lg font-bold">Contact Us</h1>
          <p>Email: contact@example.com</p>
          <p>Phone: +1234567890</p>
        </div>
        <div>
          <h1 className="mr-4 text-lg font-bold">Follow Us</h1>
          <div className="space-x-4">
            <a href="https://twitter.com/example" className="hover:underline">
              Twitter
            </a>
            <a href="https://facebook.com/example" className="hover:underline">
              Facebook
            </a>
            <a href="https://instagram.com/example" className="hover:underline">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
