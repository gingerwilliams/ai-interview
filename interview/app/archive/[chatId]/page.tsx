import { getChat } from "@/utils/action";

const Chat = async ({ params }) => {
    const p = await params;
    const onGetChat = async (id) => {
        // call a getChats
        if (!id) return

        const chat = await getChat(id)
        return JSON.parse(chat.chat)
    }
    const chatList = await onGetChat(p?.chatId)
    
    return (
        <ul>
            { p?.chatId ? 
                chatList.map((item, key) => <li key={`${p?.chatId}-${key}`}>{item}</li>)
                :
                <div>selected chats appear here</div>
            }
        </ul>
    )
}

export default Chat;