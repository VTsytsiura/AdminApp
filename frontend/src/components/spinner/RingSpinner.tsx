import React from "react";
import { RingLoader } from "react-spinners";

interface RingSpinnerProps {
  loading: boolean;
  size?: number;
  color?: string;
}

const RingSpinner: React.FC<RingSpinnerProps> = ({
  loading,
  size = 60,
  color = "#123abc"
}) => {
  return (
    <div className="flex justify-center items-center">
      <RingLoader 
        color={color} 
        loading={loading} 
        size={size} 
      />
    </div>
  );
};

export default RingSpinner;