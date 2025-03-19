import { useState } from 'react';
import axios from 'axios';

const TestAuth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [user, setUser] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (isLogin) {
        const response = await axios.post('/api/login', { email, password });
        localStorage.setItem('token', response.data.token);
        setSuccess('Logged in successfully!');
        fetchUser();
      } else {
        const response = await axios.post('/api/signup', {
          user: { email, password, password_confirmation: passwordConfirmation }
        });
        localStorage.setItem('token', response.data.token);
        setSuccess('Account created successfully!');
        fetchUser();
      }
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.errors?.join(', ') || 'An error occurred');
    }
  };

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/users', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setUser(response.data);
    } catch (err) {
      console.error('Error fetching user:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setSuccess('Logged out successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h1 className="text-2xl font-bold mb-8 text-center">
                  {isLogin ? 'Login' : 'Sign Up'}
                </h1>

                {user && (
                  <div className="mb-4 p-4 bg-green-100 rounded">
                    <h2 className="font-bold">Logged in as:</h2>
                    <p>{user.email}</p>
                  </div>
                )}

                {error && (
                  <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
                    {success}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      required
                    />
                  </div>

                  {!isLogin && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                      />
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {isLogin ? 'Login' : 'Sign Up'}
                  </button>
                </form>

                <div className="mt-4 text-center">
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-sm text-indigo-600 hover:text-indigo-500"
                  >
                    {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
                  </button>
                </div>

                {user && (
                  <div className="mt-4">
                    <button
                      onClick={handleLogout}
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestAuth; 