import { ApplicationState, Item } from "../infrastructure/types";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDebounce } from "../infrastructure/hooks";
import { searchVideos } from "../infrastructure/networking/youtube";
import { Droppable } from "react-beautiful-dnd";
import Card from "../board/Card";
import { SEARCH_DELAY } from "./constants";
import { connect } from "react-redux";
import { searchDone } from "../board/actions";
import { SidebarVideosContainer } from "./components";

export interface SearchProps {
  items: Item[];
  searchDone: (items: Item[]) => void;
}

const SearchArea = ({ items, searchDone }: SearchProps) => {
  const [term, setTerm] = useState("");
  const debounced = useDebounce(term, SEARCH_DELAY);
  const onSearch = (e: ChangeEvent<HTMLInputElement>) =>
    setTerm(e.target.value);

  useEffect(() => {
    if (debounced) {
      searchVideos(debounced).then(response => searchDone(response.items));
    }
  }, [debounced, searchDone]);

  return (
    <SidebarVideosContainer>
      <input
        data-testid="search-input"
        type="text"
        value={term}
        onChange={onSearch}
      />
      <Droppable droppableId="SEARCH" type="item">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {items.map((i, index) => (
              <Card key={i.id} index={index} item={i} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </SidebarVideosContainer>
  );
};
const mapState = (state: ApplicationState) => ({
  items: state.boards[state.selectedBoard].columns["SEARCH"].items
});
export default connect(
  mapState,
  { searchDone }
)(SearchArea);
