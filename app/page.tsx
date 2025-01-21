import { Button } from "@/components/ui/button";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-12 row-start-2 items-center sm:items-center">
        <Image src="/icon1.png" alt="Prindle logo" width={300} height={300} className="object-cover rounded-md"/>
        <h1 className="text-3xl md:text-5xl font-bold">Welcome to Prindle</h1>
        <div className="flex justify-end w-full">
          <Link href="/home/projects">
            <Button>Let's get started</Button>
          </Link>
        </div>
      </main>
      <footer className="row-start-3 gap-6 grid grid-cols-3 border-t pt-4">
        <Link href="/home/projects" className="flex items-center gap-2 hover:underline">Projects<ExternalLinkIcon className="w-4 h-4" /></Link>
        <Link href="/home/calendar" className="flex items-center gap-2 hover:underline">Calendar<ExternalLinkIcon className="w-4 h-4" /></Link>
        <Link href="/home/notes" className="flex items-center gap-2 hover:underline">Notes<ExternalLinkIcon className="w-4 h-4" /></Link>
        <Link href="/home/organisations" className="flex items-center gap-2 hover:underline">Orgs<ExternalLinkIcon className="w-4 h-4" /></Link>
        <Link href="/home/settings" className="flex items-center gap-2 hover:underline">Settings<ExternalLinkIcon className="w-4 h-4" /></Link>
      </footer>
    </div>
  );
}
