const imageWidthheighRatio = 320 / 180;
const imageWidth = 74;
const imageHeight = imageWidth / imageWidthheighRatio;
const stackWidth = 220;
const stackPadding = 8;
export default {
  STACK_WIDTH: stackWidth,
  STACK_PADDING: stackPadding,

  CARD_IMAGE_WIDTH: imageWidth,
  CARD_IMAGE_HEIGHT: imageHeight,
  CARD_HEIGHT: imageHeight,
  CARD_WIDTH: stackWidth - stackPadding * 2,
  CARD_TEXT_WIDTH: stackWidth - imageWidth,

  BORDER_RADIUS: 4,

  SIDEBAR_WIDTH: stackWidth + stackPadding * 2,

  TOP_BAR_HEIGHT: 40,
  PLAYER_HEIGHT: 60,


  MAIN_COLOR: '#71797E',
  MENU_COLOR: 'rgba(0,0,0,0.15)',
  ACCENT_COLOR: 'lightpink',
  COLUMN_COLOR: '#E6E7ED',
};

export const SEARCH_DELAY = 600;

export const YOUTUBE_KEY = "AIzaSyAk1MbyIUnFinouWsMg46UwgHa8JjHBrsw";
