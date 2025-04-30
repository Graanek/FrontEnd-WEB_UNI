import React from 'react';
import { Link } from 'react-router-dom';

function Register() {
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Register</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-gray-600">Registration form will be implemented here...</p>
        <p className="mt-4 text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;