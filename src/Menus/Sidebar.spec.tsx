import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { fireEvent, render } from "@testing-library/react";
import Sidebar from "./Sidebar";
import { DragDropContext } from "react-beautiful-dnd";
import { useBoard } from "../state";

interface Props {
  onSelectBoard?: (boardId: string) => void;
}

const SampleApp = ({ onSelectBoard }: Props) => {
  const [state] = useBoard();
  return (
    <DragDropContext onDragEnd={() => "dummy"}>
      <Sidebar
        app={state}
        onSearchDone={() => "dummy"}
        onSelectBoard={onSelectBoard || (() => "dummy")}
      />
    </DragDropContext>
  );
};

it("a search should be shown by default", () => {
  const { getByTestId } = render(<SampleApp />);
  expect(getByTestId("search-input")).toBeInTheDocument();
});

it("clicking on a board button should show boards options", () => {
  const { getByTestId, queryByTestId } = render(<SampleApp />);
  fireEvent.click(getByTestId("boards-button"));
  expect(queryByTestId("search-input")).not.toBeInTheDocument();
  expect(getByTestId("board-view")).toBeInTheDocument();
});

it("clicking on a board then on a search button should show search", () => {
  const { getByTestId, queryByTestId } = render(<SampleApp />);
  fireEvent.click(getByTestId("boards-button"));
  fireEvent.click(getByTestId("search-button"));
  expect(queryByTestId("search-input")).toBeInTheDocument();
  expect(queryByTestId("board-view")).not.toBeInTheDocument();
});

it("clicking on a board should call onSelectBoard with propert board id", () => {
  const onSelectBoard = jest.fn();
  const { getByTestId } = render(<SampleApp onSelectBoard={onSelectBoard} />);
  fireEvent.click(getByTestId("boards-button"));
  fireEvent.click(getByTestId("board-BOARD_1"));
  expect(onSelectBoard).toHaveBeenCalledWith("BOARD_1");
});
