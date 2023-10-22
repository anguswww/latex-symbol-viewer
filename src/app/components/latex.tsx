import React, { useState } from "react";

import Latex from "react-latex-next";
import "katex/dist/katex.min.css";

export default function View() {
  return (
    <Latex>$e^i$</Latex>
  );
}