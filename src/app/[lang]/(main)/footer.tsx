export function Footer() {
  const start = 2024;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-40 text-center">
      <small>
        &copy; {start}
        {currentYear > start && ` - ${currentYear}`} Ryuji Ito
      </small>
    </footer>
  );
}
