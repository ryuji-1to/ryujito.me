import { Footer } from "./footer";
import { Header } from "./header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 max-w-2xl w-full mx-auto px-24 py-40 sm:px-40">
        <main className="flex-1">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
