import {
  createMyStore,
  getBoards,
  isLeftSidebarVisible,
  setSidebarVisibility,
  selectBoard
} from "./index";

describe("Having a default store", () => {
  let store: ReturnType<typeof createMyStore>;
  beforeEach(() => (store = createMyStore()));

  it("by default store should have a visible left base", () => {
    expect(isLeftSidebarVisible(store.getState())).toEqual(true);
  });

  it("hiding left sidebar should hide it", () => {
    store.dispatch(setSidebarVisibility(false));
    expect(isLeftSidebarVisible(store.getState())).toEqual(false);
  });

  describe("boards", () => {
    const getStoreBoards = () => getBoards(store.getState());
    it("by default there should be two boards", () => {
      const expectedBoardNames = ["First Board", "Second Board"];
      expect(getStoreBoards().map(b => b.name)).toEqual(expectedBoardNames);
    });

    it("first board should be selected", () => {
      expect(getStoreBoards()[0].isSelected).toEqual(true);
    });

    describe("selecting second board", () => {
      beforeEach(() => store.dispatch(selectBoard("2")));

      it("should select second", () => {
        expect(getStoreBoards()[1].isSelected).toEqual(true);
      });
      it("and unselect first", () => {
        expect(getStoreBoards()[0].isSelected).toEqual(false);
      });
    });
  });
});
