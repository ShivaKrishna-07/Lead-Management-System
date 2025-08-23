import React from 'react';
import { useForm } from 'react-hook-form';
import { registerUser } from '../api/auth';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const { register, handleSubmit } = useForm();
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await registerUser(data);
      setUser(res.data);
      navigate('/leads');
    } catch (err) {
      console.error(err);
      alert('Registration failed');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name</label>
          <input {...register('name')} />
        </div>
        <div>
          <label>Email</label>
          <input {...register('email')} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" {...register('password')} />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
