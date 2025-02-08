import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { SanityLive } from "@/sanity/lib/live";
import { Bounce, ToastContainer } from "react-toastify";
import { ClerkLoaded, ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Ecomm24 - Hackathon E-commerce Project",
  description:
    "A sleek and modern e-commerce UI/UX design developed within 24 hours for a hackathon. Built with a focus on user experience, speed, and design excellence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <main className="max-w-[1440px] mx-auto">
            <Header />
            {children}
            <Footer />
          </main>
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
