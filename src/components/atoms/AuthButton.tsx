import React from "react";
import { Button } from "react-bootstrap";

interface Props {
  buttonName: string;
  style: object;
  type: string;
}

const AuthButton: React.FC<Props> = ({ buttonName, style }) => {
  return (
    <Button type="submit" style={style}>
      {buttonName}
    </Button>
  );
};

export default AuthButton;
