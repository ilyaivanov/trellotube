import { ApplicationSandbox } from "../testUtils";
import utils from "../shared/utils";
import { myFetch } from "../api/fetch";
import { jordanPetersonResponse } from "../api/responses.fake";
import playlistResponse from "../api/getPlaylistVideos";

jest.mock("../shared/utils", () => ({
  createId: () => undefined
}));

jest.mock("../api/fetch", () => ({
  myFetch: jest.fn()
}));

// @ts-ignore
let fetch: jest.Mock = myFetch;

describe("Having a default application", () => {
  let app: ApplicationSandbox;
  beforeEach(() => {
    app = new ApplicationSandbox();
    fetch.mockReset();
    let counter = 0;
    utils.createId = () => `myId${counter++}`;
  });

  afterEach(() => app.resetState());

  it("when pressing search and entering some search criteria a list of videos for that criteria should be shown", async () => {
    fetch.mockReturnValue(Promise.resolve(jordanPetersonResponse));
    app.switchToSearch();

    app.enterSearch("mySearchValue");

    await app.waitForVideoId("myId0");

    app.expectItemByTextToBePresent(
      "myId0",
      "2017 Personality and Its Transformations (University of Toronto)"
    );

    app.expectItemByTextToBePresent(
      "myId1",
      "How to Stop Wasting Your Life - Dr. Jordan Peterson"
    );

    expect(myFetch).toHaveBeenCalledWith(
      "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&shart=mostPopular&q=mySearchValue&key=AIzaSyAk1MbyIUnFinouWsMg46UwgHa8JjHBrsw"
    );
  });

  it("when pressing find similar on a video a list of similar videos should be shown", async () => {
    fetch.mockReturnValue(Promise.resolve(jordanPetersonResponse));
    app.findSimilar("MY_VIDEO_ID");

    await app.waitForVideoId("myId0");

    app.expectItemByTextToBePresent(
      "myId0",
      "2017 Personality and Its Transformations (University of Toronto)"
    );

    app.expectItemByTextToBePresent(
      "myId1",
      "How to Stop Wasting Your Life - Dr. Jordan Peterson"
    );

    expect(myFetch).toHaveBeenCalledWith(
      "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&type=video&relatedToVideoId=YOUTUBE_ID&key=AIzaSyAk1MbyIUnFinouWsMg46UwgHa8JjHBrsw"
    );
  });

  fit("when loading similar videos and the loading a playlist", async () => {
    fetch.mockReturnValue(Promise.resolve(jordanPetersonResponse));
    app.findSimilar("MY_VIDEO_ID");

    await app.waitForVideoId("myId0");

    fetch.mockClear();
    fetch.mockReturnValue(Promise.resolve(playlistResponse));
    app.loadPlaylist("myId0"); //2017 Personality and Its Transformations (University of Toronto)
    await app.waitForVideoId("myId11"); //2017 Personality 01: Introduction
    app.expectItemByTextToBePresent(
      "myId11",
      "2017 Personality 01: Introduction"
    );
    expect(myFetch).toHaveBeenCalledWith(
      "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=20&playlistId=PL22J3VaeABQApSdW8X71Ihe34eKN6XhCi&key=AIzaSyAk1MbyIUnFinouWsMg46UwgHa8JjHBrsw"
    );
  });

  it("loading a playlist should add a new column", async () => {
    fetch.mockReturnValue(Promise.resolve(playlistResponse));

    app.loadPlaylist("MY_PLAYLIST_ID");

    await app.waitForVideoId("myId1");

    app.expectItemByTextToBePresent("myId1", "2017 Personality 01");

    app.expectItemByTextToBePresent("myId2", "2017 Personality 02/03");

    expect(myFetch).toHaveBeenCalledWith(
      "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=20&playlistId=YOUTUBE_PLAYLIST_ID&key=AIzaSyAk1MbyIUnFinouWsMg46UwgHa8JjHBrsw"
    );
  });
});
