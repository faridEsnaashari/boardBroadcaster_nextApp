import LoadingCircle from "@/common/components/loading-circle";
import styles from "./styles/loading.style.module.css";

export default function Loading() {
  return (
    <div className={styles.privateRouteLoadingContainer}>
      <div className={styles.privateRouteLoadingMain}>
        <LoadingCircle />
      </div>
    </div>
  );
}
