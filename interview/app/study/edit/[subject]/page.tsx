import EditSubjectForm from "@/app/(components)/EditSubjectForm";

const EditSubject = async ({ params }) => {
    const p = await params;

    return (
        <main className="flex flex-col h-screen bg-gray-100 p-5">
            <section>
                <h1 className='text-5xl mb-4 pb-2 font-thin block flex-grow border-b-1 border-black/20'>Edit {p.subject}</h1>
            </section>  
            {/* Form */}
            <EditSubjectForm subject={p.subject} />
        </main>
    )
}

export default EditSubject;