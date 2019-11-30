import { ApplicationSandbox } from "../infrastructure/testUtils";

describe("having an app with a video being played", () => {
  let app: ApplicationSandbox;
  beforeEach(() => {
    app = new ApplicationSandbox();
  });

  afterEach(() => app.resetState());

  xit("when clicking next a next video is being played", () => {
    app.hitPlayVideo(IDS.videos.column1.video1.id);
    app.expectVideoToBePlaying(IDS.videos.column1.video1.youtubeLink);
    app.hitPlayNext();
    app.expectVideoToBePlaying(IDS.videos.column1.video2.youtubeLink);
  });

  it("plan hitting a play in column button a video should be player", () => {
    app.hitPlayVideo("MY_VIDEO_ID");
    app.expectVideoToBePlaying("YOUTUBE_ID");
  });

  it("plan hitting a play in search button a video should be player", () => {
    app.hitPlayVideo("MY_VIDEO_ID_AT_SEARCH");
    app.expectVideoToBePlaying("YOUTUBE_ID_AT_SEARCH");
  });
});

const IDS = {
  videos: {
    column1: {
      video1: {
        youtubeLink: "Column1 Video1 YoutubeLink",
        id: "Column1 Video1"
      },
      video2: {
        youtubeLink: "Column1 Video2 YoutubeLink",
        id: "Column1 Video2"
      }
    }
  }
};
