import Link from "next/link"

const Header = ({ title, linkHref, linkTitle }) => {
    return (
        <div className="flex justify-between items-center p-4">
            <h1 className="text-2xl font-bold text-color-night dark:text-color-primary">{title}</h1>
            {
                linkHref && linkTitle 
                ?
                <Link href={linkHref} className="md:text-xl text-sm text-color-night dark:text-color-primary hover:text-color-aqua dark:hover:text-color-tomato hover:underline transition-all">
                    {linkTitle}
                </Link>
                : 
                null
            }
        </div>
    )
}
export default Header