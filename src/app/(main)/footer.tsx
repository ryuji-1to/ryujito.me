import { Text } from "@/share/components/text";

export function Footer() {
  const start = 2024;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="pt-10 text-center">
      <Text as="small">
        © {start}
        {currentYear > start ? ` - ${currentYear}` : ""} Ryuji Ito
      </Text>
    </footer>
  );
}
