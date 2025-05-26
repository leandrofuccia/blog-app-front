"use client";

import { ThemeContextProvider } from "@/context/ThemeContext";
import { GlobalStyle } from "@/styles/globals";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <ThemeContextProvider>
          <GlobalStyle />
          {children}
        </ThemeContextProvider>
      </body>
    </html>
  );
}

