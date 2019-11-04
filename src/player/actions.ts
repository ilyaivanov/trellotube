export enum ACTIONS {
  PLAY = "PLAY"
}

export type Action = PlayAction;

interface PlayAction {
  type: ACTIONS.PLAY;
  videoId: string;
}

export const play = (videoId: string): PlayAction => ({
  type: ACTIONS.PLAY,
  videoId
});
