import {YoutubeSearchResponse} from "./types";

export const myFetch = (input: RequestInfo): Promise<YoutubeSearchResponse> =>
  fetch(input).then(res => res.json());
