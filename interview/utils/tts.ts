"use server"
import fs from "fs";
import path from "path";
import OpenAI from "openai";
import player from "play-sound";

export const speech = async (input) => {
    const openai = new OpenAI();
    const speechFile = path.resolve("./assets/aiPrompt.mp3");
    
    const mp3 = await openai.audio.speech.create({
      model: "gpt-4o-mini-tts",
      voice: "fable",
      input,
      instructions: "Speak in a cheerful and positive tone.",
    });
    
    const buffer = Buffer.from(await mp3.arrayBuffer());
    await fs.promises.writeFile(speechFile, buffer);

    player().play(speechFile, (err) => {
        if (err) console.error("Error playing audio:", err);
    });
}