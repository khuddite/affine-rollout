// app/layout.tsx
import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "Affine Rollouts",
  description: "Affine dashboard app using Next.js and Prisma",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">
        <main className="flex-1 h-screen md:px-4 bg-gray-50">
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
