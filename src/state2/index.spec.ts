import {
  createMyStore,
  getBoards,
  isLeftSidebarVisible,
  selectBoard,
  getSelectedBoard,
  endDrag,
  AppState,
  createBoard,
  setItemsFor,
  removeColumn,
  renameColumn,
  createColumn, renameBoard, removeBoard
} from "./index";
import { DraggableLocation, DropResult } from "react-beautiful-dnd";
import { getExtraItems, Item } from "./boards";
import { ExtraColumn } from "./menu";

describe("Having a default store", () => {
  let store: ReturnType<typeof createMyStore>;
  beforeEach(() => (store = createMyStore()));

  it("by default store should have a visible left base", () => {
    expect(isLeftSidebarVisible(store.getState())).toEqual(true);
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
        { index: 1, droppableId: "2" },
        "11"
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
        { index: 1, droppableId: "1" },
        "11"
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

    describe("having a search results ", () => {
      it("when draging within search results it should handle dnd properly", () => {
        store.dispatch(
          setItemsFor(ExtraColumn.SEARCH, createTwoSampledVideos())
        );
        const dropResult: DropResult = {
          draggableId: "101",
          type: "column",
          source: { index: 0, droppableId: "SEARCH" },
          destination: { droppableId: "SEARCH", index: 1 },
          mode: "FLUID",
          reason: "DROP"
        };
        store.dispatch(endDrag(dropResult));
        const searchItems = getNames(
          getExtraItems(ExtraColumn.SEARCH, store.getState())
        );
        expect(searchItems).toEqual(["Loaded Item 2", "Loaded Item 1"]);
      });
    });
  });

  describe("Having an additional column", () => {
    it("should set and retrieve those items", () => {
      store.dispatch(setItemsFor(ExtraColumn.SEARCH, createTwoSampledVideos()));

      const searchItems = getNames(
        getExtraItems(ExtraColumn.SEARCH, store.getState())
      );
      expect(searchItems).toEqual(["Loaded Item 1", "Loaded Item 2"]);
    });
  });

  it("Removing a column should remove it from the board and from columns as well", () => {
    store.dispatch(removeColumn("2"));
    expect(getNames(getSelectedBoard(store.getState()).stacks)).toEqual([
      "Stack1 Board1"
    ]);
  });

  it("Renaming a column should change it's name", () => {
    store.dispatch(renameColumn("2", "NEW NAME"));
    expect(getSelectedBoard(store.getState()).stacks[1].name).toEqual(
      "NEW NAME"
    );
  });

  it("Creating a new column should add a column with some non-empty name", () => {
    store.dispatch(createColumn({ name: "Some Name" }));
    expect(getSelectedBoard(store.getState()).stacks[2].name).toEqual(
      "Some Name"
    );
  });

  it("renaming a board should change it's name", () => {
    store.dispatch(renameBoard("1", "NEW NAME"));
    expect(getSelectedBoard(store.getState()).name).toEqual("NEW NAME");
  });

  it("creating a board should create new board and select it", () => {
    store.dispatch(createBoard("MY FANCY NEW BOARD"));
    expect(getSelectedBoard(store.getState()).name).toEqual("MY FANCY NEW BOARD");
    expect(store.getState().boardsState.boardsOrder).toHaveLength(3)
  });

  it('removing a board from the state should remove that board and selext another one ', () => {
    store.dispatch(removeBoard('1'));
    expect(getSelectedBoard(store.getState()).name).toEqual("Second Board");
  });
});

//ADD COLUMN DND
const createDropResult = (
  source: DraggableLocation,
  destination: DraggableLocation,
  draggableId: string
): DropResult => ({
  draggableId,
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

const createTwoSampledVideos = (): Item[] => [
  {
    name: "Loaded Item 1",
    id: "101",
    videoId: "42",
    imageUrl: "42",
    type: "video"
  },
  {
    name: "Loaded Item 2",
    id: "102",
    videoId: "42",
    imageUrl: "42",
    type: "video"
  }
];
