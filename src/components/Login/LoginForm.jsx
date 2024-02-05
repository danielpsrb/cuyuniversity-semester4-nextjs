"use client"

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEnvelope, faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Navbar from '../Navbar';
import { POST } from '@/app/api/v1/collection/route';


const LoginPage = () => {

  const pathname = usePathname();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');


  const handleSignInGithub = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/auth/signin")
      const data = response.data;

      const dbResponse = await fetch("/api/v1/users", {
        method: "POST",
        body: JSON.stringify(data)
      })

      if(dbResponse.created) {
        router.push("/users/dashboard")
      }
    } catch (error) {
      console.error('Error to signin github', error)
    }
  }

  const loginUser = (e) => {
    e.preventDefault();
    // Lakukan sesuatu dengan data login (misalnya, panggil API)
    // Reset formulir setelah submit
    setEmail('');
    setPassword('');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
        <div className="flex flex-col bg-color-dark items-center justify-center px-6 py-8 mx-auto min-h-screen md:h-screen lg:h-screen">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold text-color-primary text-center">
                Sign In
              </h1>
              <form onSubmit={loginUser} className="space-y-4 md:space-y-6">
                <p className="text-center text-red-600">{message}</p>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-color-primary dark:text-white mr-2">
                    <FontAwesomeIcon icon={faEnvelope} className='mr-2' />
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Your Email"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-color-primary dark:text-white">
                    <FontAwesomeIcon icon={faLock} className='mr-2' />
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pr-9"
                      required
                    />
                    <span
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 flex items-center px-2 focus:outline-none text-gray-500 cursor-pointer dark:text-gray-400 ml-2"
                    >
                      {showPassword ? (
                          <FontAwesomeIcon icon={faEye} />
                        ) : (
                          <FontAwesomeIcon icon={faEyeSlash} />
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-color-primary">Remember me</label>
                    </div>
                  </div>
                  <a href="#" className="text-sm font-medium text-color-lightblue hover:underline">Forgot password?</a>
                </div>
                <div className="">
                  <div className="flex items-center justify-between">
                    <hr className="flex-grow border-1 border-color-purple dark:border-gray-700" />
                    <span className="mx-4 text-sm font-medium text-color-primary dark:text-gray-400">or</span>
                    <hr className="flex-grow border-1 border-color-purple dark:border-gray-700" />
                  </div>
                </div>
                <div className='flex justify-center item-center'>
                  <button onClick={handleSignInGithub} className='w-full text-white bg-color-lavender transition-all font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-2 hover:bg-color-secondary hover:text-color-primary'><FontAwesomeIcon icon={faGithub} className='mr-2' />Sign In with Github</button>
                </div>
                  <button type="submit" className="w-full text-white bg-color-medium hover:bg-color-medium focus:ring-4 focus:outline-none focus:ring-medium-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-color-primary">Sign in</button>
                <p className="flex items-center justify-center text-sm font-light text-color-primary dark:text-gray-400">
                  Don’t have an account yet ? <Link href="/signup" className="font-medium text-color-lightblue hover:underline dark:text-primary-500 ml-1">Sign up</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
    </div>
  );
};

export default LoginPage;