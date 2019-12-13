import React, { ChangeEvent, useEffect, useState } from "react";
import {
  useDebounce,
  SEARCH_DELAY,
  searchVideos,
  TasksList
} from "../infrastructure";
import { connect } from "react-redux";
import { getExtraItems, ItemViewModel } from "../state2/boards";
import { AppDispatch, AppState, setItemsFor } from "../state2";
import { SidebarVideosContainer } from "./components";
import { ExtraColumn } from "../state2/menu";

export interface SearchProps {
  items: ItemViewModel[];
  dispatch: AppDispatch;
}

const SearchArea = ({ items, dispatch }: SearchProps) => {
  const [term, setTerm] = useState("");
  const debounced = useDebounce(term, SEARCH_DELAY);
  const onSearch = (e: ChangeEvent<HTMLInputElement>) =>
    setTerm(e.target.value);

  useEffect(() => {
    if (debounced) {
      searchVideos(debounced).then(response =>
        dispatch(setItemsFor(ExtraColumn.SEARCH, response.items))
      );
    }
  }, [debounced, dispatch]);

  return (
    <SidebarVideosContainer>
      <input
        data-testid="search-input"
        type="text"
        value={term}
        onChange={onSearch}
      />
      <TasksList droppableId="SEARCH" tasks={items} />
    </SidebarVideosContainer>
  );
};

const mapState = (state: AppState) => ({
  items: getExtraItems(ExtraColumn.SEARCH, state)
});
export default connect(mapState)(SearchArea);
