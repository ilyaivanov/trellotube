import { ApplicationState, Item } from "../types";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDebounce } from "../hooks";
import { searchVideos } from "../api/youtube";
import { Droppable } from "react-beautiful-dnd";
import Card from "../board/Card";
import { SEARCH_DELAY } from "./constants";
import { connect } from "react-redux";
import { play } from "../player/actions";
import { searchDone } from "../board/actions";

export interface SearchProps {
  items: Item[];
  searchDone: (items: Item[]) => void;
  play: (youtubeId: string) => void;
}

const SearchArea = ({ items, searchDone, play }: SearchProps) => {
  const [term, setTerm] = useState("");
  const debounced = useDebounce(term, SEARCH_DELAY);
  const onSearch = (e: ChangeEvent<HTMLInputElement>) =>
    setTerm(e.target.value);

  useEffect(() => {
    if (debounced) {
      searchVideos(debounced).then(response => searchDone(response.items));
    }
  }, [debounced]);

  return (
    <>
      <input
        data-testid="search-input"
        type="text"
        value={term}
        onChange={onSearch}
      />
      <Droppable droppableId="SEARCH" type="item">
        {(provided, snapshot) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {items.map((i, index) => (
              <Card
                onPress={() => play(i.videoId)}
                key={i.id}
                index={index}
                item={i}
              />
            ))}
          </div>
        )}
      </Droppable>
    </>
  );
};
const mapState = (state: ApplicationState) => ({
  items: state.boards[state.selectedBoard].columns["SEARCH"].items
});
export default connect(
  mapState,
  { play, searchDone }
)(SearchArea);
