const Footer = () => {
    return (
        <div>
            <footer className="bg-color-darkgray text-color-black dark:bg-color-black flex justify-center items-center p-4 dark:text-color-aqua text-base-conten border-y-2 dark:border-color-aqua">
                <aside>
                    <p>Copyright © {new Date().getFullYear()} | All right reserved by Dans</p>
                </aside>
            </footer>
        </div>
    )
}

export default Footer
