import React, { useEffect } from 'react';
import Layout from 'components/Layout';
import { CustomerFormData, customerSchema } from 'schemas/customerSchema';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { useMyProfile, useUpdateMyProfile } from 'hooks/auth';
import { toast } from 'react-toastify';
import Cookies from "js-cookie";
import { useQueryClient } from '@tanstack/react-query';

const ProfilePage: React.FC = () => {
    const queryClient = useQueryClient()
    const {
        watch,
        setValue,
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CustomerFormData>({
        resolver: zodResolver(customerSchema)
    });

    const { data: response }: any = useMyProfile({});
    const firstName = response?.data?.data?.firstname || ''
    const lastName = response?.data?.data?.lastname || ''

    useEffect(() => {
        setValue('username', response?.data?.data?.username || '')
        setValue('email', response?.data?.data?.email || '')
        setValue('firstname', firstName)
        setValue('lastname', lastName)
    }, [response])

    const { mutate: updateMyProfile, isPending: isUpdateMyProfileLoading } = useUpdateMyProfile({
        onSuccess: () => {
            toast.info("Profile updated successfully.")

            Cookies.set('firstname', watch().firstname)
            Cookies.set('lastname', watch().lastname)

            queryClient.invalidateQueries({ queryKey: ['MY_PROFILE'] })
            reset()
        },
        onError: () => {}
    });

    const onSaveChangesHandler = () => {
        updateMyProfile(watch());
    }

    return (
        <Layout>
            <main className="flex-1 px-4 py-4">
            <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-xl">
                <h2 className="text-2xl font-bold text-left text-gray-800 mb-6">Edit Profile</h2>
                
                <form onSubmit={handleSubmit(onSaveChangesHandler)} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                        <input
                            type="text"
                            id="username"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter your username"
                            {...register("username")}
                        />
                        {errors.username && <label className="text-red-500 text-sm">{errors.username.message}</label>}
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                            type="text"
                            id="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter your email"
                            {...register("email")}
                        />
                        {errors.email && <label className="text-red-500 text-sm">{errors.email.message}</label>}
                    </div>

                    <div>
                        <label htmlFor="firstname" className="block text-sm font-medium text-gray-700 mb-2">Firstname</label>
                        <input
                            type="text"
                            id="firstname"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter your firstname"
                            {...register("firstname")}
                        />
                        {errors.firstname && <label className="text-red-500 text-sm">{errors.firstname.message}</label>}
                    </div>

                    <div>
                        <label htmlFor="lastname" className="block text-sm font-medium text-gray-700 mb-2">Lastname</label>
                        <input
                            type="text"
                            id="lastname"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter your lastname"
                            {...register("lastname")}
                        />
                        {errors.lastname && <label className="text-red-500 text-sm">{errors.lastname.message}</label>}
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isUpdateMyProfileLoading}
                            className={`w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md focus:outline-none hover:bg-indigo-700 transition duration-300 ${isUpdateMyProfileLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isUpdateMyProfileLoading ? 'Updating...' : 'Update'}
                        </button>
                    </div>
                </form>
            </div>
        </main>
        </Layout>
    );
};

export default ProfilePage;
