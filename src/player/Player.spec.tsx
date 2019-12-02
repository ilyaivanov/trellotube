import { ApplicationSandbox } from "../infrastructure/testUtils";

describe("having an app with a video being played", () => {
  let app: ApplicationSandbox;
  beforeEach(() => {
    app = new ApplicationSandbox();
  });

  afterEach(() => app.resetState());

  it("when clicking next a next video is being played", () => {
    app.hitPlayVideo(IDS.videos.column1.video1.id);
    app.hitPlayNext();
    app.expectVideoToBePlaying(IDS.videos.column1.video2.youtubeLink);
  });

  it("plan hitting a play in column button a video should be player", () => {
    app.hitPlayVideo(IDS.videos.column1.video1.id);
    app.expectVideoToBePlaying(IDS.videos.column1.video1.youtubeLink);
  });

  it("plan hitting a play in search button a video should be player", () => {
    app.hitPlayVideo(IDS.videos.search.video1.id);
    app.expectVideoToBePlaying(IDS.videos.search.video1.youtubeLink);
  });

  it("plan hitting a play in similar button a video should be player", () => {
    app.switchToSimilar();
    app.hitPlayVideo(IDS.videos.similar.video1.id);
    app.expectVideoToBePlaying(IDS.videos.similar.video1.youtubeLink);
  });

  it("play previous video button should play video1 when video2 is being played", () => {
    app.hitPlayVideo(IDS.videos.column1.video2.id);
    app.hitPlayPrev();
    app.expectVideoToBePlaying(IDS.videos.column1.video1.youtubeLink);
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
    },
    search: {
      video1: {
        youtubeLink: "YOUTUBE_ID_AT_SEARCH",
        id: "MY_VIDEO_ID_AT_SEARCH"
      }
    },
    similar: {
      video1: {
        youtubeLink: "YOUTUBE_ID_AT_SIMILAR",
        id: "MY_VIDEO_ID_AT_SIMILAR"
      }
    }
  }
};
