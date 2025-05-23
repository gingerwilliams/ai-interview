import ChatProvider from "@/context/ChatContext";
import ChatWindow from "../(components)/ChatWindow";
import Prompt from "./prompt";

export default function AiPrompt() {
    return (
        <>
        <ChatProvider>
            {/* ToDo: add chat history to db */}
            <Prompt />
            <ChatWindow />
        </ChatProvider>
        </>
    );
}