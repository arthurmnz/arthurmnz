import Header from "./Header";

function PageLayout({ children }) {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <Header />

      {children}
    </main>
  );
}

export default PageLayout;
