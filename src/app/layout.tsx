import { LayoutProps } from "@/common/types/next-components.type";
import "./globals.css";
import NotificationsHolder from "@/HOCs/withNotification/components/NotificationsHolder.component";

export const metadata = {
  title: "BoardBroadCaster",
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body>
        <NotificationsHolder />
        {children}
      </body>
    </html>
  );
}
