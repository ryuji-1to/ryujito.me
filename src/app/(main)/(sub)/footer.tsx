export function Footer() {
  const start = 2024;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="pt-10 text-center">
      <small>
        ©{start}
        {currentYear > start ? ` - ${currentYear}` : ""} Ryuji Ito
      </small>
    </footer>
  );
}
