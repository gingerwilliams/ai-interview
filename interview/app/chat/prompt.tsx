import { userPrompt } from "@/utils/ai";

const Prompt = () => {
    return (
        <div>
            <form action={userPrompt}>
                <input
                    name="prompt"
                    placeholder="say hello"
                    className="border border-black/20 py-2"
                />
                <button className="bg-blue-500 text-white px-5 py-2 ">submit</button>
            </form>
        </div>
    );
}

export default Prompt;