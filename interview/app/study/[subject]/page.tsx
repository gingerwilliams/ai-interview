import { getSubject } from '@/utils/action';
import Image from 'next/image'

const Subject = async ({ params }) => {
    const p = await params;
    const data = await getSubject(p?.subject)

    const createMarkup = () => {
        return {__html: data};
    }
   
    return (
        <>
        <main className="flex flex-col h-screen bg-gray-100 p-5">
            {p?.subject ? 
                <section>
                    <h1 className='text-5xl mb-4 pb-2 font-thin block flex-grow border-b-1 border-black/20'>{ p.subject.charAt(0).toUpperCase() + p.subject.slice(1) }</h1>
                    <div dangerouslySetInnerHTML={createMarkup()} />
                </section>
            : 
                <section className='flex'>    
                    <h1 className='text-5xl mb-2 font-thin block flex-grow'>Dashboard</h1>
                    <a href="/study/new" className='flex items-center bg-blue-600 px-2 py-1 h-8 rounded-lg text-white text-sm cursor-pointer'>
                        <Image
                            className='dark:invert py-1'
                            src="/assets/icons/plus.svg"
                            width={14}
                            height={14}
                            alt="add icon"
                        />
                        <span className="ms-3">add subject</span>
                    </a>
                </section>
            }
        </main>
        </>
    )
}

export default Subject;

// https://legacy.reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml

/** Clean AF
    * p?.subject ?? ""
    * Optional Chaining (?.): This allows you to access nested object properties without causing an error if an intermediate property is undefined or null. It returns undefined if the property doesn't exist.
    * Nullish Coalescing (??): This provides a default value if the left-hand side is null or undefined.
 */