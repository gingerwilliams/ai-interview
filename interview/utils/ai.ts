'use server';

import { NextResponse } from 'next/server';
import { ChatOpenAI } from "@langchain/openai";
import {
    START,
    END,
    MessagesAnnotation,
    StateGraph,
    MemorySaver,
  } from "@langchain/langgraph";
import { v4 as uuidv4 } from "uuid";

// Define the function that calls the model
const callModel = async (state: typeof MessagesAnnotation.State) => {
    const llm = new ChatOpenAI({
        model: "gpt-4o-mini",
        temperature: 0
    });
    const messages = await llm.invoke(state.messages);
    return { messages };
};

// Define a new graph
const workflow = new StateGraph(MessagesAnnotation)
    // Define the node and edge
    .addNode("model", callModel)
    .addEdge(START, "model")
    .addEdge("model", END);

const memory = new MemorySaver();
const app = workflow.compile({ checkpointer: memory });
const config = { configurable: { thread_id: uuidv4() } };

export const response = async (prompt) => {
    const input = [
        {
          role: "user",
          content: prompt,
        }
    ];

    // The output contains all messages in the state.
    const output = await app.invoke({ messages: input }, config);
    // This will log the last message in the conversation.
    return output.messages[output.messages.length - 1]
}

export const userPrompt = async (formData) => {
    
	const prompt = formData.get("prompt")
    const aiResponse = await response(prompt)
	console.log("aiResponse: ", aiResponse)
}