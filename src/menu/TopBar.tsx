import { AppDispatch, setRightbarState } from "../state2";
import { TopBar } from "./components";
import React from "react";
import { connect } from "react-redux";

interface Props {
  dispatch: AppDispatch;
}

const TopBarView = ({ dispatch }: Props) => (
  <TopBar>
    <button
      data-testid="boards-button"
      onClick={() => dispatch(setRightbarState("BOARDS"))}
    >
      boards
    </button>
    <button
      data-testid="search-button"
      onClick={() => dispatch(setRightbarState("SEARCH"))}
    >
      search
    </button>
    <button
      data-testid="similar-button"
      onClick={() => dispatch(setRightbarState("SIMILAR"))}
    >
      similar
    </button>
  </TopBar>
);

export default connect()(TopBarView);
