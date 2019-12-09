import {
  createMyStore,
  getBoards,
  isLeftSidebarVisible,
  setSidebarVisibility,
  selectBoard,
  getSelectedBoard,
  endDrag,
  AppState,
  setItemsFor
} from "./index";
import { DraggableLocation, DropResult } from "react-beautiful-dnd";
import { getExtraItems, Item } from "./boards";

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

  describe("Re-ordering events", () => {
    it("swapping two items within the column", () => {
      expect(getItemsForSecondStack(store.getState())).toEqual([
        "Stack2 - First Item",
        "Stack2 - Second Item"
      ]);
      const event: DropResult = createDropResult(
        { index: 0, droppableId: "2" },
        { index: 1, droppableId: "2" }
      );
      store.dispatch(endDrag(event));
      expect(getItemsForSecondStack(store.getState())).toEqual([
        "Stack2 - Second Item",
        "Stack2 - First Item"
      ]);
    });

    it("dragging from one column into another", () => {
      const event: DropResult = createDropResult(
        { index: 0, droppableId: "2" },
        { index: 1, droppableId: "1" }
      );
      store.dispatch(endDrag(event));
      expect(getItemsForSecondStack(store.getState())).toEqual([
        "Stack2 - Second Item"
      ]);
      expect(getItemsForFirstStack(store.getState())).toEqual([
        "Stack1 - First Item",
        "Stack2 - First Item"
      ]);
    });

    it("swaping two stacks should switch their positions", () => {
      const expectedStacks = ["Stack1 Board1", "Stack2 Board1"];
      expect(getNames(getSelectedBoard(store.getState()).stacks)).toEqual(
        expectedStacks
      );
      const dropResult: DropResult = {
        draggableId: "1",
        type: "column",
        source: { index: 0, droppableId: "board" },
        destination: { droppableId: "board", index: 1 },
        mode: "FLUID",
        reason: "DROP"
      };
      store.dispatch(endDrag(dropResult));
      const expectedStacksAfterDrop = ["Stack2 Board1", "Stack1 Board1"];
      expect(getNames(getSelectedBoard(store.getState()).stacks)).toEqual(
        expectedStacksAfterDrop
      );
    });
  });

  describe("Having an additional column", () => {
    it("should set and retrieve those items", () => {
      const items: Item[] = [
        { name: "Loaded Item 1", id: "101" },
        { name: "Loaded Item 2", id: "102" }
      ];
      store.dispatch(setItemsFor("SEARCH", items));

      const searchItems = getNames(getExtraItems("SEARCH", store.getState()));
      expect(searchItems).toEqual(["Loaded Item 1", "Loaded Item 2"]);
    });
  });
});

//ADD COLUMN DND
const createDropResult = (
  source: DraggableLocation,
  destination: DraggableLocation
): DropResult => ({
  draggableId: "I DO NOT USE DRAGGABLE ID FOR NOW",
  type: "SOME IGNORED TYPE",
  source,
  reason: "DROP",
  mode: "FLUID",
  destination
});
const getNames = (items: { name: string }[]) => items.map(i => i.name);

const getItemsForSecondStack = (state: AppState) =>
  getNames(getSelectedBoard(state).stacks[1].items);

const getItemsForFirstStack = (state: AppState) =>
  getNames(getSelectedBoard(state).stacks[0].items);
