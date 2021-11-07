import React from "react";
import { useState } from "react";
import Alert from "react-bootstrap/Alert";

export const ErrorFallback: React.FC<any> = ({ error }: any) => {
  const [show, setShow] = useState<boolean>(true);
  return show ? (
    <Alert variant="danger" onClose={() => setShow(false)} dismissible>
      <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
      <p>{error.message}</p>
    </Alert>
  ) : null;
};
