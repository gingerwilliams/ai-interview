"use client"

import { deleteChat } from "@/utils/action";

const ChatHeader = ({id}) => {
    return (
        <button className="flex items-center bg-blue-600 px-2 py-1 h-8 rounded-lg text-white text-sm cursor-pointer w-20" 
                onClick={() => deleteChat(id)}
            >
                delete
        </button>
    )
}

export default ChatHeader;