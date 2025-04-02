import Link from "next/link";

export default function Home() {
  const href = "/chat";
  return (
	<div className="flex justify-center items-center w-screen h-screen">
    <div className="w-full max-w-[600px] mx-auto">
      <h1 className="text-6xl mb-4 font-thin">elevate</h1>
      <p className="text-2xl  mb-4 font-thin">Your AI Leargning Tool</p>
      <div>
          <Link href={href}>
          <button className="bg-blue-600 px-4 py-2 rounded-lg text-white text-xlg cursor-pointer">get started</button>
          </Link>
        </div>
    </div>
  </div>
  );
}
