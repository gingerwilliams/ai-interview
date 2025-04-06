import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { Uploadable } from "openai/uploads.mjs";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const POST = async (request: NextRequest) => {
    const formData = await request.formData()
    const file = formData.get("file");

    const transcription = await openai.audio.transcriptions.create({
        file: file as Uploadable,
        model: "whisper-1",
        response_format: "text",
        language: "en",
    });
    
    return NextResponse.json({ text: transcription });
}