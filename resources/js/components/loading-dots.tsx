import { cn } from "@/lib/utils";
import styles from "./loading-dots.module.css";

const LoadingDots = ({ color = "#fff", className }: { color?: string; className?: string }) => {
  return (
    <span className={cn(styles.loading, className)}>
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
      <span style={{ backgroundColor: color }} />
    </span>
  );
};

export default LoadingDots;
