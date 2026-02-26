// Root layout - minimal shell. Actual layout logic is in app/[locale]/layout.tsx.
// This is required by Next.js but next-intl handles the <html> and <body> tags
// in the locale-specific layout.

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
