import { Header } from "@/components/header";
import { SidebarMenu } from "@/components/sidebar-menu";
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
        <div className="flex justify-center mt-20">
          <div className="container relative flex w-full gap-16 pt-10">
            <SidebarMenu />
            <main className="grow">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
