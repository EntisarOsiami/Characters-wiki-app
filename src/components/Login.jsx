import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router';
import axios from 'axios';

function Login() {
  const url = 'https://6836f2e3664e72d28e42d386.mockapi.io/auth';
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState('');

  const onSubmit = async (data) => {
    try {
      const response = await axios.get(url);
      const user = response.data.find(
        (u) => u.email === data.email && u.password === data.password
      );

      if (user) {
        localStorage.setItem('user', JSON.stringify({
          id: user.id,
          email: user.email,
          loggedIn: true,
        }));
        navigate('/');
        window.location.reload();
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.', err);
    }
  };

  return (
<div className="flex justify-center flex-col items-center w-full px-2">
      <div className="w-full max-w-md bg-gray-800 rounded-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6 text-white">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div>
            <label className='block text-gray-300 mb-1'>
              Email:
            </label>
            <input
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              className='w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-md'
            />
            {errors.email && (
              <p className='text-red-400 text-sm mt-1'>
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className='block text-gray-300 mb-1'>
              Password:
            </label>
            <input
              type='password'
              {...register('password', {
                required: 'Password is required',
              })}
              className='w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-md'
            />
            {errors.password && (
              <p className='text-red-400 text-sm mt-1'>
                {errors.password.message}
              </p>
            )}
          </div>
          {error && <p className='text-red-400 text-center'>{error}</p>}
          <button className='w-full bg-indigo-600 text-white py-2 rounded-md'>
            Login
          </button>
        </form>
        <p className='mt-4 text-center text-gray-400'>
          Don't have an account?{' '}
          <Link to='/signup' className='text-indigo-400'>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
