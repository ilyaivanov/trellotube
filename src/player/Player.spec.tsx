import { ApplicationSandbox } from "../infrastructure/testUtils";
import {ids} from "../infrastructure/testUtils/ids";

xdescribe("having an app with a video being played", () => {
  let app: ApplicationSandbox;
  beforeEach(() => {
    app = new ApplicationSandbox();
  });

  afterEach(() => app.resetState());

  it("when clicking next a next video is being played", () => {
    app.hitPlayVideo(ids.videos.column1.video1.id);
    app.hitPlayNext();
    app.expectVideoToBePlaying(ids.videos.column1.video2.youtubeLink);
  });

  it("plan hitting a play in column button a video should be player", () => {
    app.hitPlayVideo(ids.videos.column1.video1.id);
    app.expectVideoToBePlaying(ids.videos.column1.video1.youtubeLink);
  });

  it("plan hitting a play in search button a video should be player", () => {
    app.hitPlayVideo(ids.videos.search.video1.id);
    app.expectVideoToBePlaying(ids.videos.search.video1.youtubeLink);
  });

  it("plan hitting a play in similar button a video should be player", () => {
    app.switchToSimilar();
    app.hitPlayVideo(ids.videos.similar.video1.id);
    app.expectVideoToBePlaying(ids.videos.similar.video1.youtubeLink);
  });

  it("play previous video button should play video1 when video2 is being played", () => {
    app.hitPlayVideo(ids.videos.column1.video2.id);
    app.hitPlayPrev();
    app.expectVideoToBePlaying(ids.videos.column1.video1.youtubeLink);
  });
});
