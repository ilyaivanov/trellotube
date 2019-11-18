import { ApplicationSandbox } from "../testUtils";

describe("", () => {
  let app: ApplicationSandbox;
  let mathImp: any;
  beforeEach(() => {
    // TODO: move to a dedicated createID function
    mathImp = Math.random;
    // @ts-ignore
    Math.random = () => "newBoardId";
    // TODO: Write a separate component for sandboxed sidebar,
    // no need to render board when testing menu
    app = new ApplicationSandbox();
    app.switchToBoard();
  });

  afterEach(() => {
    Math.random = mathImp;
    app.resetState();
  });

  it("Creating a new board should add a new board in a list with a predefined name", () => {
    app.createNewBoard();
    app.checkThatBoardExist("newBoardId");
    app.checkThatBoardIsSelected("newBoardId");
  });

  it("Creating a new board should add a new board in a list with a predefined name", () => {
    app.expectBoardToHaveName("BOARD_1", "My Board");
    app.startRenamingBoard("BOARD_1");
    app.enterBoardName("BOARD_1", "New Board Name");
    app.stopRenamingBoard("BOARD_1");
    app.expectBoardToHaveName("BOARD_1", "New Board Name");
  });

  it("Removing a board should delete it", () => {
    app.expectBoardToExist("BOARD_2");
    app.removeBoard("BOARD_2");
    app.expectBoardNotToExist("BOARD_2");
  });

  it("staring to edit a board should not change what board is currently selected", () => {
    app.checkThatBoardIsSelected("BOARD_1");
    app.startRenamingBoard("BOARD_2");
    app.checkThatBoardIsSelected("BOARD_1");
  });

  it("removing a non-selected board should not change selected board", () => {
    app.checkThatBoardIsSelected("BOARD_1");
    app.removeBoard("BOARD_2");
    app.checkThatBoardIsSelected("BOARD_1");
  });

  it("having two boards with first being selected, when removing first board second should be selected", () => {
    app.checkThatBoardIsSelected("BOARD_1");
    app.removeBoard("BOARD_1");
    app.checkThatBoardIsSelected("BOARD_2");
  });

  it("removing two boards should not break the app, then adding new board should select it", () => {
    app.checkThatBoardIsSelected("BOARD_1");
    app.removeBoard("BOARD_1");
    app.removeBoard("BOARD_2");
    app.createNewBoard();
    app.checkThatBoardIsSelected("newBoardId");
  });

  it("when starting to edit board when losing focus edit mode should be turned off", () => {
    app.checkIfBoardButtonIsNotBeingEdited("BOARD_1");
    app.startRenamingBoard("BOARD_1");
    app.checkIfBoardButtonIsBeingEdited("BOARD_1");
    app.loseFocusFromBoardButton("BOARD_1");
    app.checkIfBoardButtonIsNotBeingEdited("BOARD_1");
  });

  //Bugs reproduction and regression
  it("After ending editing and reopening ", () => {
    app.startRenamingBoard("BOARD_1");
    app.expectBoardButonInputContent("BOARD_1", "My Board");
    app.enterBoardName("BOARD_1", "My New Name");
    app.loseFocusFromBoardButton("BOARD_1");
    app.startRenamingBoard("BOARD_1");
    app.expectBoardButonInputContent("BOARD_1", "My New Name");
  });
});
