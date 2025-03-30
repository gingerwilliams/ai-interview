"use server"
import fs from "fs";
import path from "path";
import { Readable } from 'stream';
import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const handleRecording = async (audioBlob) => {
    const saveFileLocation = path.resolve("./assets/humanPrompt.mp3");

    const writeStream = fs.createWriteStream(saveFileLocation);
    const audio = await audioBlob
    const buffer = Buffer.from(await audio.arrayBuffer());
    const readStream = Readable.from(buffer);
    readStream.pipe(writeStream)
}

const transcribe = async () => {
    const fileLocation = path.resolve("./assets/humanPrompt.mp3");
    try {
        const transcription = await openai.audio.transcriptions.create({
            file: fs.createReadStream(fileLocation),
            model: "whisper-1",
        });

        console.log("transcribed text:: ", transcription.text)
        return transcription.text
    } catch (error) {
        console.log("HandleRecording Error", error)
    }
}

export default async function voiceToText(audioBlob) {
    await handleRecording(audioBlob)
    const humanPrompt = await transcribe()
    return humanPrompt 
}