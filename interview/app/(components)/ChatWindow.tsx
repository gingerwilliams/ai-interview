"use client"

import { useContext } from "react";
import { ChatContext } from "@/context/ChatContext";

const ChatWindow = () => {
    const { messages } = useContext(ChatContext)
    console.log("chatWindow messages::", messages)

    return (
        <div></div>
    )
}

export default ChatWindow;