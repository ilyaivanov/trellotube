import { ApplicationSandbox } from "../testUtils";
import utils from "../shared/utils";
import { myFetch } from "../api/fetch";
import { jordanPetersonResponse } from "../api/responses.fake";

jest.mock("../shared/utils", () => ({
  createId: () => undefined
}));

jest.mock("../api/fetch", () => ({
  myFetch: jest.fn()
}));

(myFetch as jest.Mock).mockReturnValue(Promise.resolve(jordanPetersonResponse));

let counter = 0;
utils.createId = () => `myId${counter++}`;

describe("Having a default application", () => {
  fit("when pressing search and entering some search criteria a list of videos for that criteria should be shown", async () => {
    const app = new ApplicationSandbox();
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

  //TODO: cover search similar and load playlists
});
