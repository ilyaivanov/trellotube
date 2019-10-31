import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Sidebar from "./Sidebar";
import { DragDropContext } from "react-beautiful-dnd";

const renderSidebar = () =>
  render(
    <DragDropContext onDragEnd={() => "dummy"}>
      <Sidebar items={[]} onSearchDone={() => "dummy"} />
    </DragDropContext>
  );

it("a search should be shown by default", () => {
  const { getByTestId } = renderSidebar();
  expect(getByTestId("search-input")).toBeInTheDocument();
});

it("clicking on a board button should show boards options", () => {
  const { getByTestId, queryByTestId } = renderSidebar();
  fireEvent.click(getByTestId("boards-button"));
  expect(queryByTestId("search-input")).not.toBeInTheDocument();
  expect(getByTestId("board-view")).toBeInTheDocument();
});

it("clicking on a board then on a search button should show search", () => {
  const { getByTestId, queryByTestId } = renderSidebar();
  fireEvent.click(getByTestId("boards-button"));
  fireEvent.click(getByTestId("search-button"));
  expect(queryByTestId("search-input")).toBeInTheDocument();
  expect(queryByTestId("board-view")).not.toBeInTheDocument();
});
