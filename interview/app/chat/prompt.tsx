"use client"
import { useCallback, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import { userPrompt } from "@/utils/ai";
// import { ChatContext } from "@/context/ChatContext";
import { callSpeech } from "@/utils/tts";

import AudioRecorder from "../(components)/AudioRecorder";
import voiceToText from "@/utils/vtt";

const Prompt = () => {
    // const { messages, setMessages } = useContext(ChatContext)
    const [prompt, setPrompt] = useState("")
    const [responses, setResponses] = useState([])
    const [loader, setLoader] = useState(false)

    const onChange = useCallback((e) => {
        e.target.name = e.target.value;
        setPrompt(e.target.value)
    }, [])

    const onSubmit = async (e) => {
        e.preventDefault()
        setLoader(true)
        setResponses((prev) => [
            ...prev,
            {"uid": uuidv4(), "HumanMessage": prompt}
        ])
        const aiResponse = await userPrompt(prompt)
        console.log("onSubmit ai reponse:: ", aiResponse)

        setResponses((prev) => [
            ...prev,
            {"uid": uuidv4(), "SystemMessage": aiResponse}
        ])
        setPrompt("")
        setLoader(false)
    }

    const handleAudioStop = async (audioBlob) => {
        const humanPrompt = await voiceToText(audioBlob)
        setResponses((prev) => [
            ...prev,
            {"uid": uuidv4(), "HumanMessage": humanPrompt}
        ])

        const aiResponse = await userPrompt(humanPrompt)
        setLoader(true)
        setResponses((prev) => [
            ...prev,
            {"uid": uuidv4(), "SystemMessage": aiResponse}
        ])
        await callSpeech(aiResponse)
        setLoader(false)
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <div className="border-t-black/20 mt-10  flex flex-col gap-3 h-full overflow-scroll p-6 scroll-snap-y-container">
                {responses.map(res => ((
                    <div key={res.uid} className={`grid justify-items-${res.HumanMessage ? "end": "start"}`}>
                        <li className={`list-none rounded-2xl p-3 max-w-[70%] ${res.HumanMessage ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-800"} `}>
                            { res.HumanMessage || res.SystemMessage }
                        </li>
                    </div>
                )))}
                {loader && "Loading..."}
            </div>
            <div className="p-5">
                <form
                    onSubmit={onSubmit}
                    className="mt-4 flex gap-2"
                >
                    <input
                        name="prompt"
                        value={prompt}
                        disabled={loader}
                        onChange={onChange}
                        placeholder="Say hello"
                        className="border border-black/20 flex-grow px-2 py-2 rounded-xl"
                    />
                    <button type="submit" className="bg-blue-500 text-white px-5 py-2 rounded-xl">submit</button>
                    <AudioRecorder disabled={loader} onStop={handleAudioStop} />
                </form>
            </div>
        </div>
    );
}

export default Prompt;