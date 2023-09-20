import { LayoutProps } from "@/common/types/next-components.type";
import "./globals.css";

export const metadata = {
  title: "BoardBroadCaster",
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
