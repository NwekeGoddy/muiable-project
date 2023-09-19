// src/components/ButtonComponent.tsx
import React from "react";
import Button from "@mui/material/Button";

const ButtonComponent: React.FC = () => {
  return (
    <div>
      <Button variant="contained" color="primary">
        Hello, Material-UI!
      </Button>
    </div>
  );
};

export default ButtonComponent;
