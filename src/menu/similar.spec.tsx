import "@testing-library/jest-dom/extend-expect";
import { ApplicationSandbox } from "../infrastructure/testUtils";

jest.mock("react-truncate", () => ({ children }: any) => children);

xdescribe("Having a Sidebar", () => {
  let app: ApplicationSandbox;

  beforeEach(() => (app = new ApplicationSandbox()));

  afterEach(() => app && app.resetState());

  describe("when two similar videos has been loaded", () => {
    it("and show those videos", async () => {
      app.switchToSimilar();
      app.triggerLoadArtistsEnd("itemId1", "itemId2");
      app.expectItemToExist("itemId1");
      app.expectItemToExist("itemId2");
    });
  });
});
