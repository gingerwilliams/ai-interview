import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const POST = async (request: Request) => {
    const { input } = await request.json()

    const response = await openai.audio.speech.create({
        model: "gpt-4o-mini-tts",
        voice: "fable",
        input,
        instructions: "Speak in a cheerful and positive tone.",
    })

    const arrayBuffer = await response.arrayBuffer();

    // why do i need new?
    return new NextResponse(arrayBuffer, {
        status: 200,
        headers: {
            "Content-Type": "audio/mp3",
        },
    }) 
}