import React from 'react';
import Link from 'next/link';
import InputSearch from './InputSearch';
import Image from 'next/image';
import { authUserSession } from '@/services/auth-services';
import Theme from './Theme';

const Navbar = async () => {
    const user = await authUserSession();

    return (
        <div className="navbar bg-color-lightblue dark:bg-color-greenyellow px-4 flex items-center justify-between">

            {/* Logo */}
            <Link href="/" className="text-2xl font-semibold text-color-primary dark:text-white">
                D-ANIMELIST
            </Link>

            {/* Search + Avatar + Theme */}
            <div className="flex items-center gap-4">

                {/* Search */}
                <div className="form-control">
                    <InputSearch />
                </div>

                {/* Avatar Dropdown */}
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn m-1 btn-ghost btn-circle avatar bg-deepskyblue">
                        <div className="w-10 rounded-full">
                            <Image src={user?.image || "/user.png"} width={50} height={50} alt="profile" />
                        </div>
                    </div>

                    <ul
                        tabIndex="-1"
                        className="dropdown-content menu bg-base-100 rounded-box z-2 w-22 p-4 shadow-sm"
                    >
                        {!user ? (
                            <li><Link href="/api/auth/signin">Sign In</Link></li>
                        ) : (
                            <>
                                <li><Link href="/users/dashboard">Dashboard</Link></li>
                                <li><Link href="/">Home</Link></li>
                                <li><Link href="/api/auth/signout">Logout</Link></li>
                            </>
                        )}
                    </ul>
                </div>

                {/* Theme Switch */}
                <Theme />
            </div>
        </div>
    );
};

export default Navbar;
