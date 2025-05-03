import React from 'react';
import Layout from 'components/Layout';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useLoginMutation } from 'hooks/auth';
import { toast } from 'react-hot-toast';
import { Input } from 'components/ui/components';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginData, loginSchema } from 'schemas/loginSchema';
import { useSetAuthField } from 'hooks/useSetAuthField';

const LoginPage: React.FC = () => {
  const { setAuthField } = useSetAuthField();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate: login, isPending: isLoginLoading } = useLoginMutation({
    onSuccess: (res) => {
      reset();
      toast.success('Successfully logged in.');

      setAuthField('auth_status', 'authenticated');
      setAuthField('firstname', res?.data?.details?.firstname);
      setAuthField('lastname', res?.data?.details?.lastname);
      setAuthField('role', res?.data?.details?.role);
      setAuthField('token', res?.data?.access_token.token);

      navigate('/');
    },
    onError: () => {},
  });

  const onLoginHandler = (data: any) => {
    login(data);
  };

  return (
    <Layout>
      <main className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-12">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-xl">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>

          <form onSubmit={handleSubmit(onLoginHandler)} className="space-y-4">
            <Input
              id="user_id"
              type="text"
              label="User ID"
              placeholder="Enter your user ID"
              {...register('user_id')}
              error={errors.user_id?.message}
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
                disabled={isLoginLoading}
                className={`w-full py-3 px-4 bg-indigo-600 text-white cursor-pointer font-semibold rounded-md shadow-md focus:outline-none hover:bg-indigo-700 transition duration-300 ${isLoginLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isLoginLoading ? 'Logging in...' : 'Log in'}
              </button>
            </div>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-indigo-500 hover:text-indigo-700">
                Register
              </Link>
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default LoginPage;
