import React from "react";
import { ApplicationSandbox } from "../testUtils";

jest.mock("../api/youtube", () => ({
  searchVideos: () =>
    Promise.resolve({
      items: [
        {
          videoId: "VIDEOID",
          imageUrl: "IMAGE_URL",
          text: "SOME_TEXT",
          id: "MYID_1"
        },
        {
          videoId: "VIDEOID",
          imageUrl: "IMAGE_URL",
          text: "SOME_TEXT",
          id: "MYID_2"
        }
      ]
    })
}));

describe("App", () => {
  let app: ApplicationSandbox;
  beforeEach(() => (app = new ApplicationSandbox()));

  afterEach(() => app.resetState());
  it("a search should be shown by default", () => {
    app.expectItemToBePresent("search-input");
  });

  it("clicking on a board button should show boards options", () => {
    app.switchToBoard();
    app.expectItemNotToBePresent("search-input");
    app.expectItemToBePresent("board-view");
  });

  it("clicking on a board then on a search button should show search", () => {
    app.switchToBoard();
    app.switchToSearch();
    app.expectItemToBePresent("search-input");
    app.expectItemNotToBePresent("board-view");
  });

  it("clicking on a board should call onSelectBoard with propert board id", () => {
    app.switchToBoard();
    const board = "BOARD_2";
    expect(app.getBoardElement(board).nodeName).toBe("H4");
    app.selectBoard(board);
    expect(app.getBoardElement(board).nodeName).toBe("H2");
  });

  it("when searching for items they should appear ", async () => {
    app.enterSearch("some dummy term");
    await app.waitForVideoId("MYID_1");
    app.expectVideoIdToBeInTheBoard("MYID_1");
    app.expectVideoIdToBeInTheBoard("MYID_2");
  });
});
