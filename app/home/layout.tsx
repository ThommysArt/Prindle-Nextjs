
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
      {children}
      <div className="bottom-0 w-full h-14">
        <div className="bottom-0 z-50 p-2 w-full h-14 border-t">
            <Navbar />
        </div>
      </div>
    </div>
  );
}
