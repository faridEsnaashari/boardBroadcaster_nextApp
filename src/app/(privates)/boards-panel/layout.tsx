import { LayoutProps } from "@/common/types/next-components.type";
import styles from "./styles/layout.style.module.css";
import Logout from "./components/Logout.component";

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.boardsPanelMainContainer}>
      <div className={styles.boardsPanelHeader}>
        <div>
          <div>Boards</div>
        </div>
        <Logout />
      </div>
      {children}
    </div>
  );
}
