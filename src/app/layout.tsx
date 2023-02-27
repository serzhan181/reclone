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
        <Container>
          <SidebarMenu />
          <main className="grow">{children}</main>
        </Container>
      </body>
    </html>
  );
}

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center mt-20">
      <div className="container relative flex w-full gap-16 pt-10">
        {children}
      </div>
    </div>
  );
};
