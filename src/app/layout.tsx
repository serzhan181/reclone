import { HotToaster } from "@/bootstrap/hot-toaster";
import { Header } from "@/components/header";
import { SidebarMenu } from "@/components/sidebar-menu";
import { RQProvider } from "@/rq/client";
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
        <RQProvider>
          {/* @ts-ignore */}
          <Header />
          <Container>
            <SidebarMenu />
            <main className="w-full">{children}</main>
          </Container>
        </RQProvider>
        <HotToaster />
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
