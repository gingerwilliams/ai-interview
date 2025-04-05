"use client"

import { getSubjectData, editSubject } from "@/utils/action";
import { useCallback, useEffect, useState } from "react";

const EditSubjectForm = ({ subject }) => {
    const [subjectData, setSubjectData] = useState({
        name: "",
        details: "",
    });

    const onChange = useCallback((e) => {
        const { name, value } = e.target;
        setSubjectData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }, [])

    const onSubmit = useCallback((e) => {
        e.preventDefault()
        editSubject(subjectData)
    }, [subjectData])

    useEffect(() => {
        const fetchData = async () => {
            const name = await subject
            const details = await getSubjectData(name)
            console.log("fetchData:: ", name, details)
            // setting values to undefined or null
            setSubjectData({
                name: name ,
                details: details
            }) 
        }
        fetchData()
    }, [])

    return (
        <>
            <form
                onSubmit={onSubmit}
                className="mt-4 w-full gap-2"
            >
                <input
                    type="text"
                    name="name"
                    value={subjectData.name}
                    onChange={onChange}
                    placeholder="subject name"
                    className="border border-black/20 w-full px-2 py-2 mb-4 rounded-xl"
                /> 
                <textarea
                    name="details"
                    value={subjectData.details}
                    onChange={onChange}
                    placeholder="subject details"
                    className="border border-black/20 w-full px-2 py-2 mb-4 rounded-xl h-60"
                >
                </textarea>
                <button
                    type="submit"
                    className='flex items-center bg-blue-600 px-5 py-2 rounded-xl text-white cursor-pointer'
                >
                    edit subject
                </button>
            </form>
        </>
    )

}

export default EditSubjectForm