import { Item } from "../types";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDebounce } from "../hooks";
import { searchVideos } from "../api/youtube";
import { Droppable } from "react-beautiful-dnd";
import Card from "../Board/Card";

export interface SearchProps {
  items: Item[];
  onSearchDone: (items: Item[]) => void;
  onPlay: (youtubeId: string) => void;
}

const SearchArea = ({ items, onSearchDone, onPlay }: SearchProps) => {
  const [term, setTerm] = useState("");
  const debounced = useDebounce(term, 600);
  const onSearch = (e: ChangeEvent<HTMLInputElement>) =>
    setTerm(e.target.value);

  useEffect(() => {
    if (debounced) {
      searchVideos(debounced).then(response => onSearchDone(response.items));
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
                onPress={() => onPlay(i.videoId)}
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

export default SearchArea;
