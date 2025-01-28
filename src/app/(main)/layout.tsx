import { Footer } from "./(sub)/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
