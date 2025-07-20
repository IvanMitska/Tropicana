export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Убираем AdminProvider и всю логику проверки
  return <>{children}</>;
}