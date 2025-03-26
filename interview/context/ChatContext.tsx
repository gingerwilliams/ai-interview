"use client"
import { createContext, FC, useMemo, useState } from 'react';

export const ChatContext = createContext(null);

const ChatProvider = ({ children }) => {

    const [messages, setMessages] = useState([])

    const context = useMemo(() => ({
        messages,
        setMessages
    }), [])

    return (
        <ChatContext.Provider value={context}>
            { children }
        </ChatContext.Provider>
    )
}

export default ChatProvider