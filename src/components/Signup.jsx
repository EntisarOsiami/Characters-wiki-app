import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

function Signup() {
  const url = "https://6836f2e3664e72d28e42d386.mockapi.io/auth";
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [error, setError] = useState('');

 const onSubmit = async (data) => {
  try {
    const allUsers = await axios.get(url); 
    const emailExists = allUsers.data.find(user => user.email === data.email);

    if (emailExists) {
      setError('Email already exists. Please use a different email.');
      return;
    }

    const response = await axios.post(url, {
      email: data.email,
      password: data.password
    });

    if (response.status === 201) {
      toast.success('Account created successfully!');
      navigate('/login');
    }
  } catch (err) {
    setError('Signup failed. Please try again.');
    console.error('Signup error:', err);
  }
};


  return (
    <div className="flex justify-center flex-col items-center w-full px-2">     
     <div className="w-full max-w-md bg-gray-800 rounded-lg p-8">
      <h1 className="text-2xl font-bold text-center mb-6 text-white">Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-gray-300 mb-1">Email:</label>
          <input
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-md"
          />
          {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-gray-300 mb-1">Password:</label>
          <input
            type="password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters'
              }
            })}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-md"
          />
          {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <div>
          <label className="block text-gray-300 mb-1">Confirm Password:</label>
          <input
            type="password"
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (value) => value === watch('password') || 'Passwords do not match',
            })}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-md"
          />
          {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword.message}</p>}
        </div>

        {error && <p className="text-red-400 text-center">{error}</p>}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md"
        >
          Create Account
        </button>
      </form>
      <p className="mt-4 text-center text-gray-400">
        Already have an account? <Link to="/login" className="text-indigo-400">Login</Link>
      </p>
    </div>
    </div>
  );
}

export default Signup;