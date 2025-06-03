// import DeleteSubjectForm from '@/app/(components)/DeleteSubjectForm';
import CodeEditor from '@/app/(components)/Editor';
import { getSubject } from '@/utils/action';
import Image from 'next/image'
import Link from 'next/link';

const Subject = async ({ params }) => {
    const p = await params;
    const getSubjectData = async (id) => {
        if (!id) return
        return await getSubject(id)
    }

    const subjectData = await getSubjectData(p?.subject) 

    return (
        <>
        <main className="flex flex-col h-screen bg-gray-100 p-5">
            {p?.subject ? 
                <section>
                    <div className='flex mb-2 border-b-1 border-black/20'>
                        <h1 className='text-5xl mb-2 font-thin block flex-grow '>{ subjectData.name }</h1>
                        <a href={`/study/edit/${subjectData.id}`} className='flex items-center bg-blue-600 px-2 py-1 h-8 me-2 rounded-lg text-white text-sm cursor-pointer'>edit</a>
                        {/* <DeleteSubjectForm subject={subjectData.id} /> */}
                    </div>
                    {/* <div dangerouslySetInnerHTML={createMarkup()} /> */}
                    <div>{subjectData.details}</div>
                    <CodeEditor />
                    
                </section>
            : 
                <section className='flex'>    
                    <h1 className='text-5xl mb-2 font-thin block flex-grow'>Dashboard</h1>
                    <Link href="/study/new" className='flex items-center bg-blue-600 px-2 py-1 h-8 rounded-lg text-white text-sm cursor-pointer'>
                        <Image
                            className='dark:invert py-1'
                            src="/assets/icons/plus.svg"
                            width={14}
                            height={14}
                            alt="add icon"
                        />
                        <span className="ms-3">add subject</span>
                    </Link>
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