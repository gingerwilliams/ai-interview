const createURL = (path: string) => {
    return window.location.origin + path
}

export const callSpeech = async (input) => {
	const response = await fetch(new Request(createURL("/api/speech"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
    }))

    const blob = await response.blob();
    const audioUrl = URL.createObjectURL(blob);
    const audio = new Audio(audioUrl)
    audio.play();
}