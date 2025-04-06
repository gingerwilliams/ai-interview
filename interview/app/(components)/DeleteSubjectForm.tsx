"use client"
import { deleteSubject } from '@/utils/action';

export default function DeleteSubjectForm({subject}) {
    const onDeleteSubject = async () => {
        await deleteSubject(subject)
    }

    return (
        <form action={onDeleteSubject}>
            <button
                type="submit"
                className='flex items-center bg-blue-600 px-2 py-1 h-8 rounded-lg text-white text-sm cursor-pointer'
            >
                delete
            </button>
        </form>
    )
}