import ChatHeader from "@/app/(components)/ChatHeader";
import { getChat } from "@/utils/action";

const Chat = async ({ params }) => {
    const p = await params;
    const onGetChat = async (id) => {
        // call a getChats
        if (!id) return

        const chat = await getChat(id)
        return JSON.parse(chat.chat)
    }
    const conversation = await onGetChat(p?.chatId)
    
    return (
        <div>
            
            <ul>
                { p?.chatId ? 
                    (<>
                        <ChatHeader id={p.chatId} />
                        {conversation.map((response, key) => <li key={`${p?.chatId}-${key}`}>{response}</li>)}
                    </>)

                    :
                    <div>selected chats appear here</div>
                }
            </ul>
        </div>
    )
}

export default Chat;