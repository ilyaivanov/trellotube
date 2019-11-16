import { ApplicationSandbox } from "../testUtils";

describe("", () => {
  let app: ApplicationSandbox;
  let mathImp: any;
  beforeEach(() => {
    mathImp = Math.random;
    // @ts-ignore
    Math.random = () => 'newBoardId';
    app = new ApplicationSandbox()
  });

  afterEach(() => {
    Math.random = mathImp;
    app.resetState()
  });
  it("Creating a new board should add a new board in a list with a predefined name", () => {

    app.switchToBoard();
    app.createNewBoard();
    app.checkThatBoardExist('newBoardId');
    app.chechThatBoardIsSelected('newBoardId');
  });
});
