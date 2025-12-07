import { authUserSession } from "@/services/auth-services";
import Image from "next/image"
import Link from "next/link"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from "@fortawesome/free-solid-svg-icons"; 
import CollectionsIcon from '@mui/icons-material/Collections';
import Header from "@/components/Dashboard/Header";
import { saveUserData } from "@/services/user-services";

const Page = async () => {
    const user = await authUserSession()
    if(user) {
        await saveUserData({
            name: user.name,
            email: user.email,
            image: user.image,
        })
    }
    
    return (
        <div className="flex flex-col justify-center items-center text-color-primary mt-1">
            <div className="w-full px-2"><Header /></div>
            <div className="mx-auto p-2">
            <div className="border-2 border-color-deepskyblue bg-color-black p-2 rounded-xl shadow-xl text-center sm:text-left">
                <h5 className="text-xl font-bold select-none mb-2 sm:inline mr-2">Hello {user?.name},</h5>
                <p className="text-xl font-semibold inline select-none">Welcome to this Website 👋</p>
            </div>
        </div>
            <Image src={user?.image} alt="images" width={250} height={250} className="rounded-full w-76 h-76 shadow-xl select-none" />
            <div className="flex flex-wrap gap-4 py-8">
                <div className="relative">
                    <Link href="/users/dashboard/collection" className="bg-color-lightblue text-color-primary font-bold px-4 py-3 text-md rounded-md hover:bg-color-lime transform hover:scale-105 transition duration-600 ease-in-out select-none	">
                        <span className="mr-6">My Collection</span>
                        <span className="absolute end-1">
                            <CollectionsIcon/>
                        </span>
                    </Link>
                </div>
                <div className="relative">
                    <Link href="/users/dashboard/comment" className="bg-color-lightblue text-color-primary font-bold px-4 py-3 text-md rounded-md hover:bg-color-lime transform hover:scale-105 transition duration-600 ease-in-out select-none">
                        <span className="mr-6">My Comment</span>
                        <span className="absolute end-1">
                            <FontAwesomeIcon icon={faComment} className="w-6 h-6"/>
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Page
