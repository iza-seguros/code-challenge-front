import type { Metadata } from "next";
import { roboto, inter } from "@/styles/fonts";
import "./globals.css";

export const metadata: Metadata = {
    title: "Iza",
    description: "Multistep form",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-br">
            <body
                className={`${roboto.variable} ${inter.variable} antialiased`}
                suppressHydrationWarning={true}
            >
                {children}
            </body>
        </html>
    );
}
