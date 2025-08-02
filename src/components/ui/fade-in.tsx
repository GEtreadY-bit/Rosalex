
import { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}

export const FadeIn = ({ 
  children, 
  delay = 0, 
  direction = "up",
  className = "" 
}: FadeInProps) => {
  const getTransform = () => {
    switch (direction) {
      case "up": return "translateY(20px)";
      case "down": return "translateY(-20px)";
      case "left": return "translateX(20px)";
      case "right": return "translateX(-20px)";
      default: return "translateY(20px)";
    }
  };

  return (
    <div
      className={`opacity-0 ${className}`}
      style={{
        animation: `fadeIn 0.6s ease-out ${delay}s forwards`,
        transform: getTransform(),
      }}
    >
      {children}
    </div>
  );
};
