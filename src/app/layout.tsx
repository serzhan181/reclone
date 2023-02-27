import { Header } from "@/components/header";
import "./globals.css";

export const metadata = {
  title: "Reclone",
  description: "Clone of reddit.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="flex justify-center mt-20">
          <div className="container pt-10">{children}</div>
        </main>
      </body>
    </html>
  );
}
