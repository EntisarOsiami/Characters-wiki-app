import { Link , useNavigate} from 'react-router';
import { GiBookshelf } from 'react-icons/gi';
import { useState } from 'react';

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || {});
  const isLoggedIn = user.loggedIn;

  const logout = () => {
    localStorage.removeItem('user');
    setUser({});
    navigate('/');
  };

  return (
    <nav className='bg-gray-900 border-b border-gray-800'>
      <div className='container mx-auto px-4 py-3 flex items-center justify-between'>
        <Link to='/' className='flex items-center gap-2'>
          <GiBookshelf className='text-indigo-400 text-2xl' />
          <span className='text-xl font-bold text-white'>Character Wiki</span>
        </Link>

        {isLoggedIn ? (
          <button
            onClick={logout}
            className='bg-red-700 text-white px-4 py-2 rounded-md'>
            Logout
          </button>
        ) : (
          <Link
            to='/login'
            className='bg-indigo-600 text-white px-4 py-2 rounded-md'>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
