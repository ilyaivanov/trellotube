import React from "react";
import Board from "./board/board";
import { authorQuoteMap } from "./board/data";
export default () => {
  return <Board initial={authorQuoteMap} />;
};
