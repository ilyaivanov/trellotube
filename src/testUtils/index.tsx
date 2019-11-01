import React from "react";
import {
  fireEvent,
  render,
  RenderResult,
  waitForElement
} from "@testing-library/react";
import App from "../Board";

jest.mock("../Menus/constants", () => ({
  SEARCH_DELAY: 0
}));

export class ApplicationSandbox {
  private app: RenderResult;
  constructor() {
    this.app = render(<App />);
  }

  resetState() {
    // store.dispatch({ type: "RESET" });
  }

  enterSearch(value: string) {
    fireEvent.change(this.app.getByTestId("search-input"), {
      target: { value }
    });
  }

  waitForVideoId(videoId: string) {
    return waitForElement(() => this.app.getByTestId("video-" + videoId), {
      container: this.app.container,
      timeout: 200
    });
  }

  expectVideoIdToBeInTheBoard(videoId: string) {
    expect(this.app.getByTestId("video-" + videoId)).toBeInTheDocument();
  }

  switchToBoard() {
    fireEvent.click(this.app.getByTestId("boards-button"));
  }

  switchToSearch() {
    fireEvent.click(this.app.getByTestId("search-button"));
  }

  expectItemToBePresent(itemId: string) {
    expect(this.app.queryByTestId(itemId)).toBeInTheDocument();
  }
  expectItemNotToBePresent(itemId: string) {
    expect(this.app.queryByTestId(itemId)).not.toBeInTheDocument();
  }

  selectBoard(boardId: string) {
    fireEvent.click(this.app.getByTestId("board-" + boardId));
  }
  getBoardElement(boardId: string) {
    return this.app.getByTestId("board-" + boardId);
  }
}
