'use server';

import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from "uuid";
import {
    START,
    END,
    MessagesAnnotation,
    StateGraph,
    MemorySaver,
  } from "@langchain/langgraph";

// add in a system message with some custom instructions (but still taking messages as input)
const promptTemplate = ChatPromptTemplate.fromMessages([
    [
      "system",
      "You talk like a master yoda from star wars. Answer all questions to the best of your ability.",
    ],
    ["placeholder", "{messages}"],
]);

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

// Define the function that calls the model
const callModel2 = async (state: typeof MessagesAnnotation.State) => {
    const llm = new ChatOpenAI({
        model: "gpt-4o-mini",
        temperature: 0
    });
    const prompt = await promptTemplate.invoke(state);
    const response = await llm.invoke(prompt);
    // Update message history with response:
    return { messages: [response] };
};

// Define a new graph
const workflow2 = new StateGraph(MessagesAnnotation)
  // Define the (single) node in the graph
  .addNode("model", callModel2)
  .addEdge(START, "model")
  .addEdge("model", END);

  // Add memory
const memory = new MemorySaver();
const app = workflow.compile({ checkpointer: memory });
const app2 = workflow2.compile({ checkpointer: new MemorySaver() });
const config = { configurable: { thread_id: uuidv4() } };

export const response = async (prompt) => {
    const input = [
        {
          role: "user",
          content: prompt,
        }
    ];

    // The output contains all messages in the state.
    const output = await app2.invoke({ messages: input }, config);
    // This will log the last message in the conversation.
    return output.messages[output.messages.length - 1]
}

export const userPrompt = async (formData) => {
    
	const prompt = formData.get("prompt")
    const aiResponse = await response(prompt)
	console.log("aiResponse: ", aiResponse)
}