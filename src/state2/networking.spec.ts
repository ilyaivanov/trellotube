import { createMyStore } from "./index";
import { getExtraItems } from "./boards";
import { ExtraColumn } from "./menu";
import { singleVideo } from "../infrastructure/networking/sampleResponses/singleVideoResult";

describe("netowking specs", () => {
  it("having a sample response", () => {
    const store = createMyStore();
    store.dispatch({
      type: "SEARCH_SIMILAR_SUCCESS",
      body: singleVideo as any,
      idPool: ["mySampleId"]
    });

    const extraItems = getExtraItems(ExtraColumn.SIMILAR, store.getState());
    expect(extraItems[0].name).toEqual(
      "How to Stop Wasting Your Life - Dr. Jordan Peterson"
    );
    expect(extraItems[0].id).toEqual("mySampleId");
  });
});
