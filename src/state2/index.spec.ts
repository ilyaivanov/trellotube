import {
  createMyStore,
  getBoards,
  isLeftSidebarVisible,
  setSidebarVisibility,
  selectBoard,
  getSelectedBoard
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

    describe("selected board", () => {
      it("should be First Board", () => {
        expect(getSelectedBoard(store.getState()).name).toEqual("First Board");
      });
      it("should have two stacks", () => {
        const expectedStacks = ["Stack1 Board1", "Stack2 Board1"];
        const receivedStackNames = getNames(
          getSelectedBoard(store.getState()).stacks
        );
        expect(receivedStackNames).toEqual(expectedStacks);
      });
      it("first stack should have proper ids", () => {
        expect(getSelectedBoard(store.getState()).stacks[0].id).toEqual("1");
      });
      it("first stack should have one item", () => {
        const firstStack = getSelectedBoard(store.getState()).stacks[0];
        expect(getNames(firstStack.items)).toEqual(["Stack1 - First Item"]);
      });
    });
  });
});

const getNames = (items: { name: string }[]) => items.map(i => i.name);
