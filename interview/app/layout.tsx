import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "",
  description: "",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  
  const links = [
    { name: 'Home', href: '/' },
    { name: 'Chat', href: '/chat' },
    // { name: 'Study', href: '/study' },
  ]

  return (
    <html lang="en">
      <body>
		<div className="flex flex-col h-screen">
			<header className="p-5">
				<ul className="flex items-baseline gap-5">
					<li className="text-3xl font-thin">elevate</li>
					{
						links.map(link => <li key={link.name}><a href={link.href}>{link.name}</a></li>)
					}
				</ul>
			</header>
		
        {children}
		</div>
      </body>
    </html>
  );
}
