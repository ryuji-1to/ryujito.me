import { Footer } from "./footer";
import { Header } from "./header";

export default function Layout(props: LayoutProps<"/">) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 max-w-2xl w-full mx-auto px-24 py-40 sm:px-40">
        {props.children}
      </main>
      <Footer />
    </div>
  );
}
