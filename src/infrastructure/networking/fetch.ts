import {YoutubeSearchResponse} from "./types";

//used for mocking in automated tests
//otherwise an external library is required
export const myFetch = (input: RequestInfo): Promise<YoutubeSearchResponse> =>
  fetch(input).then(res => res.json());
