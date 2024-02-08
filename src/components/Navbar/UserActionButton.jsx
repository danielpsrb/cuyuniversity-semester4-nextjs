import Link from "next/link";
import { authUserSession } from "@/libs/auth-libs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Button } from "@mui/material";
import { MdSpaceDashboard } from "react-icons/md";



// UserActionButton Component
const UserActionButton = async () => {
const user = await authUserSession();

    const actionLabel = user ? "Logout" : "Sign In";
    const actionUrl = user ? "/api/auth/signout" : "/api/auth/signin";

    return (
        <div className="flex flex-col items-center sm:flex-row justify-between gap-4">
            <div className="flex items-center">
                <Link href="/">
                    <Button className="relative inline-flex items-center duration-300 ease-linear text-color-black font-bold hover:bg-color-darkgray rounded-xl hover:text-color-black active:bg-color-lime">
                        <span className="ml-2">
                            <FontAwesomeIcon icon={faHome} className="w-5 h-5 mr-2" />
                        </span>
                        <span>Home</span>
                    </Button>
                </Link>
                {user && (
                    <Link href="/users/dashboard">
                        <Button className="relative inline-flex items-center ml-4 md:ml-5 duration-300 ease-linear text-color-black font-bold hover:bg-color-darkgray rounded-xl hover:text-color-black active:bg-color-lime">
                            <span className="ml-2">
                                <MdSpaceDashboard className="w-5 h-5 mr-2" />
                            </span>
                            <span className="text-md">Dashboard</span>
                        </Button>
                    </Link>
                )}
            </div>
            <div className="text-center">
                <Link href={actionUrl}>
                    <Button className="relative inline-flex items-center duration-300 ease-linear text-color-black font-bold hover:bg-color-darkgray focus:bg-color-darkgray rounded-md hover:text-color-black active:bg-color-lime">
                        <span className="ml-2">
                            {user ? <FontAwesomeIcon icon={faRightFromBracket} className="w-5 h-5 mr-2" /> : <FontAwesomeIcon icon={faRightToBracket} className="w-5 h-5 mr-2" />}
                        </span>
                        <span className="text-md">{actionLabel}</span>
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default UserActionButton;