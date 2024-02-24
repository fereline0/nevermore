import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/screens/Header/page";
import Provider from "@/components/screens/Auth/Provider/page";

export const metadata: Metadata = {
  title: "Nevermore",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <Header />
          <div className="container">{children}</div>
        </Provider>
      </body>
    </html>
  );
}
