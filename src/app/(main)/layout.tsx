import { Footer } from "./footer";
import { Header } from "./header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <body className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 max-w-2xl w-full mx-auto p-10">
        <main className="flex-1">{children}</main>
      </div>
      <Footer />
    </body>
  );
}
