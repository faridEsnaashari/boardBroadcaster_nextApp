import { CSSProperties } from "react";
import { Props } from "./types.type";
import styles from "./loading-circle-style.module.css";

export default function LoadingCircle(
  { size, color }: Props = { size: 10, color: "#0064ff" },
) {
  const getStyle = (): CSSProperties => {
    return {
      borderTopColor: color,
      borderWidth: size + "px",
    };
  };

  return (
    <div className={styles.loadingCircleMainContainer}>
      <div style={getStyle()} className={styles.firstLoadingCircle}></div>

      <div style={getStyle()} className={styles.secondLoadingCircle}></div>
    </div>
  );
}
