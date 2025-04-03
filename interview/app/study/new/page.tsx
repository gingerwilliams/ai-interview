import NewSubjectForm from "@/app/(components)/NewSubjectForm";

const NewSubject = () => {
    return (
        <main className="flex flex-col h-screen bg-gray-100 p-5">
            <section>
                <h1 className='text-5xl mb-4 pb-2 font-thin block flex-grow border-b-1 border-black/20'>New Subject</h1>
            </section>  
            {/* Form */}
            <NewSubjectForm />
        </main>
    )
}

export default NewSubject;