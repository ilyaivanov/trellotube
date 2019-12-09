import { Action } from "./index";

const SET_VISIBILITY = "SET_VISIBILITY";

export const setSidebarVisibility = (isVisible: boolean) =>
  ({
    type: SET_VISIBILITY,
    isVisible
  } as const);

const initialState: UserOptions = {
  isLestSidebarVisible: true
};

interface UserOptions {
  isLestSidebarVisible: boolean;
}

export const optionsReducer = (
  options = initialState,
  action: Action
): UserOptions => {
  if (action.type === SET_VISIBILITY) {
    return {
      ...options,
      isLestSidebarVisible: action.isVisible
    };
  }
  return options;
};
