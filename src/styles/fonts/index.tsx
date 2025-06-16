import { Roboto, Inter } from "next/font/google";

export const roboto = Roboto({
    subsets: ["latin"],
    variable: "--font-Roboto",
    display: "swap",
    weight: ["100", "300", "400", "500", "700", "900"],
});

export const inter = Inter({
    subsets: ["latin"],
    variable: "--font-Inter",
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
