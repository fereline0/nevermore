import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/screens/Header/page";
import Provider from "@/components/screens/Auth/Provider/page";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Nevermore",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <Header />
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                width: "500px",
                maxWidth: "100%",
                background: "#ffffff96",
                backdropFilter: "blur(5px)",
              },
            }}
          />
          <div className="container">{children}</div>
        </Provider>
      </body>
    </html>
  );
}
