import { ApplicationSandbox } from "../testUtils";
import { ids } from "../testUtils/ids";

describe("Having a default application", () => {
  let app: ApplicationSandbox;
  beforeEach(() => {
    app = new ApplicationSandbox();
  });

  afterEach(() => app.resetState());


  //I dont not handle a case when a video is played from another board
  fit("when playing some video and switching to a different board no error should apeear", async () => {
    app.hitPlayVideo(ids.videos.column1.video1.id);
    app.switchToBoard();
    app.selectBoard(ids.boards.board2.id);
    app.checkThatBoardIsSelected(ids.boards.board2.id);
  });
});
