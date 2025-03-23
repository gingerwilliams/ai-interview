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

const trimmer = trimMessages({
    maxTokens: 10,
    strategy: "last",
    tokenCounter: (msgs) => msgs.length,
    includeSystem: true,
    allowPartial: false,
    startOn: "human",
});

// add in a system message with some custom instructions (but still taking messages as input)
const promptTemplate = ChatPromptTemplate.fromMessages([
    [
      "system",
      "You talk like a master yoda from star wars. Answer all questions to the best of your ability.",
    ],
    ["placeholder", "{messages}"],
]);

const promptTemplate2 = ChatPromptTemplate.fromMessages([
    [
      "system",
      "You are an helpful assistant named Jarret. Answer all questions to the best of your ability in {language}.",
    ],
    ["placeholder", "{messages}"],
]);

const promptTemplate3 = ChatPromptTemplate.fromMessages([
    [
      "system",
      "You a Software Engineer interviewer. Ask a quetion about data structures in {language}.",
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

const callModel4 = async (state: typeof GraphAnnotation.State) => {
    const llm = new ChatOpenAI({
        model: "gpt-4o-mini",
        temperature: 0
    });
    const trimmedMessage = await trimmer.invoke(state.messages);
    const prompt = await promptTemplate2.invoke({
      messages: trimmedMessage,
      language: state.language,
    });
    const response = await llm.invoke(prompt);
    return { messages: [response] };
};

// Define a new graph
const workflow = new StateGraph(MessagesAnnotation)
    // Define the node and edge
    .addNode("model", callModel)
    .addEdge(START, "model")
    .addEdge("model", END);

// Define a new graph
const workflow2 = new StateGraph(MessagesAnnotation)
  // Define the (single) node in the graph
  .addNode("model", callModel2)
  .addEdge(START, "model")
  .addEdge("model", END);
 
const workflow4 = new StateGraph(GraphAnnotation)
    .addNode("model", callModel4)
    .addEdge(START, "model")
    .addEdge("model", END);
    
// Add memory
const memory = new MemorySaver();
const app = workflow.compile({ checkpointer: memory });
const app2 = workflow2.compile({ checkpointer: new MemorySaver() });
const app4 = workflow4.compile({ checkpointer: new MemorySaver() });

const config = { configurable: { thread_id: uuidv4() } };

export const response = async (prompt) => {
    const input = [
        {
          role: "user",
          content: prompt,
        }
    ];
    const input2 = {
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        language: "English",
    };

    const messages = [
        new SystemMessage("you're a good assistant"),
        new HumanMessage("hi! I'm bob"),
        new AIMessage("hi!"),
        new HumanMessage("I like vanilla ice cream"),
        new AIMessage("nice"),
        new HumanMessage("whats 2 + 2"),
        new AIMessage("4"),
        new HumanMessage("thanks"),
        new AIMessage("no problem!"),
        new HumanMessage("having fun?"),
        new AIMessage("yes!"),
    ];
      
    await trimmer.invoke(messages);

    const input4 = {
        messages: [...messages, new HumanMessage("What is my name?")],
        language: "English",
    };

    const input5 = {
        messages: [...messages, new HumanMessage("What math problem did I ask?")],
        language: "English",
      };

    // The output contains all messages in the state.
    // const output = await app2.invoke({ messages: input }, config);
    const output = await app4.invoke(input5, config);
    // This will log the last message in the conversation.
    return output.messages[output.messages.length - 1]
}

export const userPrompt = async (formData) => {
    
	const prompt = formData.get("prompt")
    const aiResponse = await response(prompt)
	console.log("aiResponse: ", aiResponse)
}