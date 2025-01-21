
import { Navbar } from "@/components/navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prindle | Home",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col w-full h-screen">
        <div>
            {children}
        </div>
        <div>
            <Navbar />
        </div>
    </div>
  );
}
