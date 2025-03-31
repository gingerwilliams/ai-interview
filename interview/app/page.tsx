import Link from "next/link";

export default function Home() {
  const href = "/chat";
  return (
	<div className=" bg-black text-white flex justify-center items-center w-screen h-screen">
    <div className="w-full max-w-[600px] mx-auto">
      <h1 className="text-6xl mb-4">elevate</h1>
      <p className="text-2xl text-white/60 mb-4">Your AI Leargning Tool</p>
      <div>
          <Link href={href}>
          <button className="bg-blue-600 px-4 py-2 rounded-lg text-xlg cursor-pointer">get started</button>
          </Link>
        </div>
    </div>
  </div>
  );
}
