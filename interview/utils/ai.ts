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
    Annotation
} from "@langchain/langgraph";
import {
    SystemMessage,
    HumanMessage,
    AIMessage,
    trimMessages,
} from "@langchain/core/messages";

// Define the State
const GraphAnnotation = Annotation.Root({
    ...MessagesAnnotation.spec,
    language: Annotation<string>(),
});

// add in a system message with some custom instructions (but still taking messages as input)
const promptTemplate = ChatPromptTemplate.fromMessages([
    [
      "system",
      "You a Software Engineer interviewer. Ask a total of ten questions about data structures in {language}. Ask one question at a time. Be sure not to ask them in the same order",
    ],
    ["placeholder", "{messages}"],
]);

// Define the function that calls the model
const callModel2 = async (state: typeof MessagesAnnotation.State) => {
    const llm = new ChatOpenAI({
        model: "gpt-4o-mini",
        temperature: 0
    });
    const template = await promptTemplate.invoke(state);
    const response = await llm.invoke(template);
    // Update message history with response:
    return { messages: [response] };
};

const callModel = async (state: typeof GraphAnnotation.State) => {
    const llm = new ChatOpenAI({
        model: "gpt-4o-mini",
        temperature: 0
    });
    console.log("callModel: state", state)
    const template = await promptTemplate.invoke({
      ...state,
      language: "English",
    });
    const response = await llm.invoke(template);
    return { messages: [response] };
};

// Define a new graph
const workflow = new StateGraph(MessagesAnnotation)
    // Define the node and edge
    .addNode("model", callModel)
    .addEdge(START, "model")
    .addEdge("model", END);
    
// Add memory
const memory = new MemorySaver();
const app = workflow.compile({ checkpointer: memory });
const config = { configurable: { thread_id: uuidv4() } };

export const response = async (prompt) => {
    const input = {
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ]
    };

    // The output contains all messages in the state.
    // const output = await app2.invoke({ messages: input }, config);
    const output = await app.invoke(input, config);
    // This will log the last message in the conversation.
    return output.messages[output.messages.length - 1]
}

export const userPrompt = async (prompt) => {
    const aiResponse = await response(prompt)
    
	console.log("userPrompt: response", aiResponse.content)
    // const res = NextResponse.json(aiResponse) 
    return aiResponse.content;
}

