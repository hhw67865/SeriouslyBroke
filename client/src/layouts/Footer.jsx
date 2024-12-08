const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="mb-4 text-xl font-bold">SeriouslyBroke</h2>
            <p className="text-sm text-gray-300">
              Providing simple solutions for your financial management needs.
            </p>
          </div>
          
          <div>
            <h2 className="mb-4 text-xl font-bold">Quick Links</h2>
            <ul className="space-y-2">
              {['About Us', 'Privacy Policy', 'Terms & Conditions'].map((item) => (
                <li key={item}>
                  <a 
                    href={`/${item.toLowerCase().replace(/\s+/g, '-')}`} 
                    className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h2 className="mb-4 text-xl font-bold">Contact Us</h2>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Please do not contact us.</li>

            </ul>
          </div>
          
          <div>
            <h2 className="mb-4 text-xl font-bold">Follow Us</h2>
            <div className="flex space-x-4">
              {[
                { name: 'Twitter', icon: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z' },
                { name: 'Facebook', icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
                { name: 'Instagram', icon: 'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 19.5h11a3 3 0 003-3v-11a3 3 0 00-3-3h-11a3 3 0 00-3 3v11a3 3 0 003 3z' },
                { name: 'LinkedIn', icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M2 4a2 2 0 114 0 2 2 0 01-4 0z' },
              ].map((social) => (
                <div
                  key={social.name}
                  className="text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer"
                >
                  <span className="sr-only">{social.name}</span>
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={social.icon} />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
