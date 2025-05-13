import Image from 'next/image'
import { getAllChats } from "@/utils/action"

const nav = async () => {
    const chatList = await getAllChats()
    const chatNav = chatList.map(item => ({
        name: item.id,
        href: `/archive/${item.id}`,
        icon: "/assets/icons/dashboard.svg"
    }))

    return [
        { name: 'Dashboard', href: '/archive', icon: "/assets/icons/dashboard.svg"},
        ...chatNav
    ]
}

export default async function Archive({ children }) {
    const navList = await nav()

    return (
        <div className="flex flex-col h-screen w-screen relative">
            <div className="absolute left-0 top-0 h-full w-[200px] p-5">
                <ul>
                    {
                        navList.map(link => (
                            <li key={link.name}>
                                <a href={link.href} className='flex items-center pt-2 pb-2'>
                                    <Image
                                        src={link.icon}
                                        width={14}
                                        height={14}
                                        alt="dashboard icon"
                                    />
                                    <span className="ms-3 truncate">{link.name}</span>
                                </a>
                            </li>
                        ))
                    }
                </ul>

            </div>
            <div className="ml-[200px] h-full w-[calc(100vw-200px)]">
               { children }
            </div>
        </div>
    )
}