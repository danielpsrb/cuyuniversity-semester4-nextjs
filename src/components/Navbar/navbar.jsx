import React from 'react';
import Link from 'next/link';
import InputSearch from './InputSearch';
import Image from 'next/image';
import { authUserSession } from '@/services/auth-services';
import Theme from './Theme';

const Navbar = async() => {

    const user = await authUserSession();
    return (
        <div className="navbar bg-color-lightblue dark:bg-color-greenyellow flex flex-col lg:flex-row gap-2">
            <div className="flex-1">
                <Link href="/" className="btn btn-ghost text-2xl text-color-primary dark:text-color-black">D-ANIMELIST</Link>
            </div>
            <div className="flex-none gap-2">
                <div className="form-control">
                    <InputSearch />
                </div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar bg-color-deepskyblue">
                        <div className="w-10 rounded-full">
                            <Image src={user?.image || '/user.png'} width={50} height={50} alt="img" />
                        </div>
                    </div>
                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-primary-content rounded-box w-52">
                            {!user ?
                            <>
                            <li><Link href="/api/auth/signin">Sign In</Link></li>
                            </>
                            :
                            <>
                                <li>
                                    <Link href="/users/dashboard" className="justify-between">
                                        Dashboard
                                    </Link>
                                </li>
                                <li><Link href="/">Home</Link></li>
                                <li><Link href="/api/auth/signout">Sign Out</Link></li>
                            </>
                            }
                        </ul>
                </div>
                <Theme />
            </div>
            
        </div>
    );
};

export default Navbar;
