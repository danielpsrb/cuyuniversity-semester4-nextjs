import InputSearch from "./InputSearch"
import UserActionButton from "./UserActionButton"

const Navbar = () => {
    return (
        <header className="bg-color-primary">
            <div className="flex md:flex-row flex-col justify-between md:items-center p-4 gap-2">
                <h2 className="font-bold md:text-2xl text-xl text-color-black mx-auto md:mx-0 select-none">D-ANIMELIST</h2>
                <InputSearch/>
                <UserActionButton/>
            </div>
        </header>
    )
}

export default Navbar
