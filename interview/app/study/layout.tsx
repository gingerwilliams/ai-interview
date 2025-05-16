import Image from 'next/image'
import { getAllSubjects } from '@/utils/action'

export default async function Study({ children }) {
    const nav = async () => {
        const getSubjects = await getAllSubjects()
        const subjects = getSubjects.map(subject => ({
            name: subject.name,
            href: `/study/${subject.id}`,
            icon: "/assets/icons/dashboard.svg",
        }))
    
        return [
            { name: 'Dashboard', href: '/study', icon: "/assets/icons/dashboard.svg"},
            ...subjects
        ]
    }

    const links = await nav()

    return (
        <div className="flex flex-col h-screen w-screen relative">
            <div className="absolute left-0 top-0 h-full w-[200px] p-5">
                <ul>
                    {
                        links.map(link => (
                            <li key={link.name}>
                                <a href={link.href} className='flex items-center pt-2 pb-2'>
                                    <Image
                                        src={link.icon}
                                        width={14}
                                        height={14}
                                        alt="dashboard icon"
                                    />
                                    <span className="ms-3">{link.name}</span>
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