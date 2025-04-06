const createURL = (path: string) => {
    return window.location.origin + path
}

export default async function voiceToText(audioBlob) {
    const formData = new FormData();
    formData.append("file", audioBlob, "recording.mp3");

    const response = await fetch(new Request(createURL("/api/voiceToText"), {
        method: "POST",
        body: formData
    }))

    const data = await response.json();
    return data.text;
}