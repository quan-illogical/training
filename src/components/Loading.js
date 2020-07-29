import React from "react";
import { Spinner } from "react-bootstrap";

export default function Loading() {
  return (
    <div className="loading-screen">
      <Spinner variant='light' className="spinner" animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
}
