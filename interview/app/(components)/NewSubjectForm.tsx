import { createSubject } from "@/utils/action";

const NewSubjectForm = () => {
    return (
        <>
            <form
                action={createSubject}
                className="mt-4 w-full gap-2"
            >
                <input
                    type="text"
                    name="name"
                    placeholder="subject name"
                    className="border border-black/20 w-full px-2 py-2 mb-4 rounded-xl"
                /> 
                <textarea
                    name="details"
                    placeholder="subject details"
                    className="border border-black/20 w-full px-2 py-2 mb-4 rounded-xl h-60"
                >
                </textarea>
                <button
                    type="submit"
                    className='flex items-center bg-blue-600 px-5 py-2 rounded-xl text-white cursor-pointer'
                >
                    create subject
                </button>
            </form>
        </>
    )

}

export default NewSubjectForm;