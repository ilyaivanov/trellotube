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


};
