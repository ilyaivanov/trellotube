import React, { ChangeEvent, useEffect, useState } from "react";
import {
  useDebounce,
  SEARCH_DELAY,
  searchVideos,
  TasksList
} from "../infrastructure";
import { connect } from "react-redux";
import { getExtraItems, ItemViewModel } from "../state2/boards";
import { AppDispatch, AppState } from "../state2";
import { SearchInput, SidebarVideosContainer } from "./components";
import { ExtraColumn } from "../state2/menu";

export interface SearchProps {
  items: ItemViewModel[];
  dispatch: AppDispatch;
  isLoading: boolean;
}

const SearchArea = ({ items, isLoading, dispatch }: SearchProps) => {
  const [term, setTerm] = useState("");
  const debounced = useDebounce(term, SEARCH_DELAY);
  const onSearch = (e: ChangeEvent<HTMLInputElement>) =>
    setTerm(e.target.value);

  useEffect(() => {
    if (debounced) {
      dispatch(searchVideos(debounced));
    }
  }, [debounced, dispatch]);

  return (
    <SidebarVideosContainer>
      <h2>Search</h2>
      <SearchInput
        data-testid="search-input"
        type="text"
        value={term}
        onChange={onSearch}
      />
      {isLoading && <h5>Loading...</h5>}
      {!isLoading && <TasksList droppableId="SEARCH" tasks={items} />}
    </SidebarVideosContainer>
  );
};

const mapState = (state: AppState) => ({
  items: getExtraItems(ExtraColumn.SEARCH, state),
  isLoading: state.menu.isSearchLoading
});
export default connect(mapState)(SearchArea);
