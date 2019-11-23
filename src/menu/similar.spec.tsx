import { Provider } from "react-redux";
import { store } from "../store";
import Sidebar from "../menu/Sidebar";
import { cleanup, render, RenderResult } from "@testing-library/react";
import React from "react";
import { reset } from "../board/actions";
import { DragDropContext } from "react-beautiful-dnd";
import {Item, SidebarState} from "../types";
import { findSimilarArtistsDone } from "./actions";
import "@testing-library/jest-dom/extend-expect";

jest.mock("react-truncate", () => ({ children }: any) => children);

export class SidebarPageObject {
  private app: RenderResult;

  constructor(state: SidebarState) {
    const app = (
      <Provider store={store}>
        <DragDropContext onDragEnd={() => 42}>
          <Sidebar state={state} />
        </DragDropContext>
      </Provider>
    );
    this.app = render(app);
  }

  resetState() {
    store.dispatch(reset());
    cleanup();
  }

  triggerLoadArtistsEnd(...ids: string[]) {
    const artists: Item[] = ids.map(id => ({
      videoId: "someVideoId",
      id,
      text: "Sample",
      imageUrl: ""
    }));
    store.dispatch(findSimilarArtistsDone(artists));
  }

  expectItemToExist(itemId: string) {
    expect(this.app.getByTestId("video-" + itemId)).toBeInTheDocument();
  }
}

fdescribe("Having a Sidebar", () => {
  let similarSidebar: SidebarPageObject;

  beforeEach(() => (similarSidebar = new SidebarPageObject("similar")));

  afterEach(() => similarSidebar && similarSidebar.resetState());

  describe("when two similar videos has been loaded", () => {
    it("and show those videos", async () => {
      similarSidebar.triggerLoadArtistsEnd("itemId1", "itemId2");
      similarSidebar.expectItemToExist("itemId1");
      similarSidebar.expectItemToExist("itemId2");
    });
  });
});
