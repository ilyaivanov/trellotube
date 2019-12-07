import React from "react";
import {
  fireEvent,
  render,
  cleanup,
  RenderResult,
  waitForElement
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "../../AppLayout";
import { createReducer, getMiddlewares } from "../state/store";
import { Provider } from "react-redux";
import { applyMiddleware, createStore, Store, compose } from "redux";
import "jest-styled-components";
import { reset } from "../../board/actions";
import { initialState } from "./initialTestingState";
import { ApplicationState, Item } from "../types";
import { findSimilarArtistsDone } from "../../menu/state";

jest.mock("react-truncate", () => ({ children }: any) => children);

jest.mock("../../menu/constants", () => ({
  SEARCH_DELAY: 0
}));

jest.mock("../utils", () => ({
  createId: () => "someNewId"
}));

jest.mock("react-youtube");
const foo = require("react-youtube");
foo.default = ({ videoId }: any) => (
  <div data-testid={"playing-video-" + videoId} />
);

export class ApplicationSandbox {
  private app: RenderResult;
  private store: Store<ApplicationState>;
  constructor() {
    // @ts-ignore
    this.store = createStore(
      createReducer(initialState()),
      compose(applyMiddleware(...getMiddlewares()))
    );
    const app = (
      <Provider store={this.store}>
        <App onClearPress={() => 42} />
      </Provider>
    );
    this.app = render(app);
  }

  resetState() {
    cleanup();
    this.store.dispatch(reset());
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

  switchToSimilar() {
    fireEvent.click(this.app.getByTestId("similar-button"));
  }

  expectItemToBePresent(itemId: string) {
    expect(this.app.queryByTestId(itemId)).toBeInTheDocument();
  }
  expectItemNotToBePresent(itemId: string) {
    expect(this.app.queryByTestId(itemId)).not.toBeInTheDocument();
  }

  expectItemByTextToBePresent(itemId: string, itemText: string) {
    expect(this.app.getByTestId("video-" + itemId).innerHTML).toContain(
      itemText
    );
  }
  selectBoard = (boardId: string) =>
    this.clickByTestId("board-button-" + boardId);

  getBoardElement(boardId: string) {
    return this.app.getByTestId("board-" + boardId);
  }

  findSimilar(itemId: string) {
    fireEvent.click(this.app.getByTestId("video-find-similar-" + itemId));
  }

  loadPlaylist(itemId: string) {
    fireEvent.click(this.app.getByTestId("video-load-playlist-" + itemId));
  }

  expectColumnToExist(columnId: string) {
    expect(this.app.queryByTestId("column-" + columnId)).toBeInTheDocument();
  }
  expectColumnToHaveName(columnId: string, name: string) {
    expect(
      this.app.getByTestId("column-label-title-" + columnId).innerHTML
    ).toEqual(name);
  }
  expectColumnNotToExist(columnId: string) {
    expect(
      this.app.queryByTestId("column-" + columnId)
    ).not.toBeInTheDocument();
  }

  clickRemoveColumn(columnId: string) {
    fireEvent.click(this.app.getByTestId("column-label-remove-" + columnId));
  }

  clickCreateNewColumn() {
    fireEvent.click(this.app.getByTestId("column-create"));
  }

  startRenamingColumn(columnId: string) {
    this.clickByTestId("column-label-rename-" + columnId);
  }

  endRenamingColumn(columnId: string) {
    this.clickByTestId("column-label-rename-" + columnId);
  }

  enterColumnNameText(columnId: string, columnText: string) {
    fireEvent.change(this.app.getByTestId("column-label-input-" + columnId), {
      target: { value: columnText }
    });
  }

  expectBoardToHaveName(columnId: string, name: string) {
    expect(
      this.app.getByTestId("board-button-title-" + columnId).innerHTML
    ).toEqual(name);
  }

  startRenamingBoard(boardId: string) {
    this.clickByTestId("board-button-rename-" + boardId);
  }

  loseFocusFromBoardButton(boardId: string) {
    fireEvent.blur(this.app.getByTestId("board-button-input-" + boardId));
  }

  checkIfBoardButtonIsNotBeingEdited(boardId: string) {
    expect(
      this.app.queryByTestId("board-button-input-" + boardId)
    ).not.toBeInTheDocument();
    expect(
      this.app.getByTestId("board-button-title-" + boardId)
    ).toBeInTheDocument();
  }

  checkIfBoardButtonIsBeingEdited(boardId: string) {
    expect(
      this.app.queryByTestId("board-button-input-" + boardId)
    ).toBeInTheDocument();
    expect(
      this.app.queryByTestId("board-button-title-" + boardId)
    ).not.toBeInTheDocument();
  }

  expectBoardButonInputContent(boardId: string, inputContent: string) {
    const item: any = this.app.getByTestId("board-button-input-" + boardId);
    expect(item.value).toBe(inputContent);
  }

  stopRenamingBoard(boardId: string) {
    this.clickByTestId("board-button-rename-" + boardId);
  }

  enterBoardName(boardId: string, boardText: string) {
    console.log("board-button-input-" + boardId);
    fireEvent.change(this.app.getByTestId("board-button-input-" + boardId), {
      target: { value: boardText }
    });
  }

  keyPress(boardId: string, key: { key: string; code: number }) {
    console.log("board-button-input-" + boardId);
    fireEvent.keyPress(
      this.app.getByTestId("board-button-input-" + boardId),
      key
    );
  }

  expectBoardToExist(boardId: string) {
    expect(
      this.app.getByTestId("board-button-title-" + boardId)
    ).toBeInTheDocument();
  }

  removeBoard(boardId: string) {
    this.clickByTestId("board-button-remove-" + boardId);
  }

  expectBoardNotToExist(boardId: string) {
    expect(
      this.app.queryByTestId("board-button-title-" + boardId)
    ).not.toBeInTheDocument();
  }

  hitPlayVideo(videoId: string) {
    this.clickByTestId("video-" + videoId);
  }

  hitPlayNext = () => this.clickByTestId("player-play-next");
  hitPlayPrev = () => this.clickByTestId("player-play-prev");

  expectVideoToBePlaying(youtubeId: string) {
    this.expectItemToBePresent("playing-video-" + youtubeId);
  }
  createNewBoard() {
    this.clickByTestId("create-board-button");
  }

  checkThatBoardExist(boardId: string) {
    this.expectItemToBePresent("board-button-" + boardId);
  }

  checkThatBoardIsSelected(boardId: string) {
    expect(this.app.getByTestId("board-button-" + boardId)).toHaveStyleRule(
      "color",
      "lightpink"
    );
  }

  checkThatBoardIsUnselected(boardId: string) {
    expect(this.app.getByTestId("board-button-" + boardId)).toHaveStyleRule(
      "color",
      "black"
    );
  }

  triggerLoadArtistsEnd(...ids: string[]) {
    const artists: Item[] = ids.map(id => ({
      videoId: "someVideoId",
      id,
      text: "Sample",
      imageUrl: "",
      type: "video"
    }));
    this.store.dispatch(findSimilarArtistsDone(artists));
  }

  expectItemToExist(itemId: string) {
    expect(this.app.getByTestId("video-" + itemId)).toBeInTheDocument();
  }

  private clickByTestId(testId: string) {
    fireEvent.click(this.app.getByTestId(testId));
  }
}
