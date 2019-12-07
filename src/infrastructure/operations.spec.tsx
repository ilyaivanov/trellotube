import { ApplicationState } from "./types";
import { DraggableLocation, DropResult } from "react-beautiful-dnd";
import { createTrelloTubeStore } from "./state/store";
import { endDrag } from "../board/state";
import { getSelectedBoard } from "./board.utils";

it("dragging within the column", () => {
  const store = createTrelloTubeStore();

  expect(getItems(store.getState(), "2")).toEqual([
    "MY_VIDEO_ID",
    "MY_PLAYLIST_ID"
  ]);

  const event: DropResult = createDropResult(
    { index: 0, droppableId: "2" },
    { index: 1, droppableId: "2" }
  );
  store.dispatch(endDrag(event));
  expect(getItems(store.getState(), "2")).toEqual([
    "MY_PLAYLIST_ID",
    "MY_VIDEO_ID"
  ]);
});

it("dragging between two columns", () => {
  const store = createTrelloTubeStore();
  const event: DropResult = createDropResult(
    { index: 0, droppableId: "2" },
    { index: 1, droppableId: "1" }
  );
  store.dispatch(endDrag(event));
  expect(getItems(store.getState(), "1")).toEqual([
    "Column1 Video1",
    "MY_VIDEO_ID",
    "Column1 Video2"
  ]);
  expect(getItems(store.getState(), "2")).toEqual(["MY_PLAYLIST_ID"]);
});

it("dragging between search and column", () => {
  const store = createTrelloTubeStore();
  const event: DropResult = createDropResult(
    { index: 0, droppableId: "SEARCH" },
    { index: 0, droppableId: "1" }
  );
  store.dispatch(endDrag(event));
  expect(getItems(store.getState(), "1")).toEqual([
    "MY_VIDEO_ID_AT_SEARCH",
    "Column1 Video1",
    "Column1 Video2"
  ]);
});

it("dragging between similar and column", () => {
  const store = createTrelloTubeStore();
  const event: DropResult = createDropResult(
    { index: 0, droppableId: "SIMILAR" },
    { index: 0, droppableId: "1" }
  );
  store.dispatch(endDrag(event));
  expect(getItems(store.getState(), "1")).toEqual([
    "MY_VIDEO_ID_AT_SIMILAR",
    "Column1 Video1",
    "Column1 Video2"
  ]);
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
const getItems = (state: ApplicationState, columnId: string) =>
  getSelectedBoard(state).columns[columnId].items.map(i => i.id);
