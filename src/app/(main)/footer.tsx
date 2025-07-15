export function Footer() {
  const start = 2024;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-40">
      <p className="text-center mx-auto">
        <small>
          &copy; <time>{start}</time>
          {currentYear > start && (
            <>
              {" - "}
              <time>{currentYear}</time>
            </>
          )}{" "}
          Ryuji Ito
        </small>
      </p>
    </footer>
  );
}
