import React from "react";
import { Mars, Venus } from "lucide-react";
import "./index.css";

type FlipCardProps = {
  size?: number;
};

export const VenusMarsFlip: React.FC<FlipCardProps> = ({ size = 24 }) => (
  <div className="flip-scene">
    <div className="flip-card">
      {/* Front */}
      <div className="flip-face flip-front">
        <Venus size={size} stroke="#3d3c4f" />
      </div>

      {/* Back */}
      <div className="flip-face flip-back">
        <Mars size={size} stroke="#3d3c4f" />
      </div>
    </div>
  </div>
);
