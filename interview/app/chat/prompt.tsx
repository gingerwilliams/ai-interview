"use client"
import { useCallback, useContext, useState, useRef } from "react";
import { v4 as uuidv4 } from 'uuid';

import { userPrompt } from "@/utils/ai";
import { ChatContext } from "@/context/ChatContext";
import { speech } from "@/utils/tts";

import AudioRecorder from "../(components)/AudioRecorder";
import voiceToText from "@/utils/vtt";

const Prompt = () => {
    const { messages, setMessages } = useContext(ChatContext)
    // const [prompt, setPrompt] = useState("")
    const [responses, setResponses] = useState([])
    const promptRef = useRef(null)

    const onChange = useCallback((e) => {
        promptRef.current = e.target.value;
        // setPrompt(value)
    }, [])

    const onSubmit = async (e) => {
        e.preventDefault()
        const aiResponse = await userPrompt(promptRef.current)
        console.log("onSubmit ai reponse:: ", aiResponse)
        speech(aiResponse)

        setResponses((prev) => [
            ...prev,
            {"uid": uuidv4(), "HumanMessage": promptRef.current, "SystemMessage": aiResponse}
        ])
        setMessages({"HumanMessage": promptRef.current, "SystemMessage": aiResponse}); // Update context
        console.log("context messages:: ", messages)
        promptRef.current = ""

    }

    const [transcript, setTranscript] = useState("");

    const handleAudioStop = async (audioBlob) => {
        const humanPrompt = await voiceToText(audioBlob)
        setTranscript(humanPrompt)
        const aiResponse = await userPrompt(humanPrompt)
        speech(aiResponse)
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    ref={promptRef}
                    onChange={onChange}
                    placeholder="say hello"
                    className="border border-black/20 py-2 w-lg"
                />
                <button type="submit" className="bg-blue-500 text-white px-5 py-2 ">submit</button>
            </form>
            <div className="border-t-black/20 mt-10">{responses.map(res => (
                <ul key={res.uid}>
                    <li key={`${res.uid}-human`}>Me: {res.HumanMessage}</li>
                    <hr/>
                    <li key={`${res.uid}-system`}>Chat: {res.SystemMessage}</li>
                    <hr/>
                </ul>
            ))}</div>
            <AudioRecorder onStop={handleAudioStop} />
            {transcript && <p>📝 Transcription: {transcript}</p>}
        </div>
    );
}

export default Prompt;