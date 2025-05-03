import React from 'react';
import Layout from 'components/Layout';
import { Link, useNavigate } from 'react-router-dom';
import { CustomerFormData, customerSchema } from 'schemas/customerSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRegisterCustomer } from 'hooks/auth';
import { toast } from 'react-hot-toast';
import { Input } from 'components/ui/components';
import { useSetAuthField } from 'hooks/useSetAuthField';

const RegisterPage: React.FC = () => {
  const { setAuthField } = useSetAuthField();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
  });

  const { mutate: registerCustomer, isPending: isRegisterLoading } = useRegisterCustomer({
    onSuccess: (res) => {
      toast.success('Registered user successfully.');

      setAuthField('auth_status', 'authenticated');
      setAuthField('firstname', res?.data?.details?.firstname);
      setAuthField('lastname', res?.data?.details?.lastname);
      setAuthField('role', res?.data?.details?.role);
      setAuthField('token', res?.data?.access_token.token);

      reset();
      navigate('/profile');
    },
    onError: () => {},
  });

  const onSubmit = (data: any) => {
    registerCustomer(data);
  };

  return (
    <Layout>
      <main className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-12">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-xl">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              id="username"
              type="text"
              label="Username"
              placeholder="Enter your username"
              {...register('username')}
              error={errors.username?.message}
            />

            <Input
              id="email"
              type="email"
              label="Email"
              placeholder="Enter your email"
              {...register('email')}
              error={errors.username?.message}
            />

            <Input
              id="firstname"
              type="text"
              label="Firstname"
              placeholder="Enter your firstname"
              {...register('firstname')}
              error={errors.firstname?.message}
            />

            <Input
              id="lastname"
              type="text"
              label="Lastname"
              placeholder="Enter your lastname"
              {...register('lastname')}
              error={errors.lastname?.message}
            />

            <Input
              id="password"
              type="password"
              label="Password"
              placeholder="Enter your password"
              {...register('password')}
              error={errors.password?.message}
            />

            <div>
              <button
                type="submit"
                disabled={isRegisterLoading}
                className={`w-full py-3 px-4 bg-indigo-600 text-white cursor-pointer font-semibold rounded-md shadow-md focus:outline-none hover:bg-indigo-700 transition duration-300 ${isRegisterLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isRegisterLoading ? 'Registering...' : 'Create Account'}
              </button>
            </div>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/signin" className="text-indigo-500 hover:text-indigo-700">
                Login
              </Link>
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default RegisterPage;
