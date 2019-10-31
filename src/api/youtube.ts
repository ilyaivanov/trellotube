import {YOUTUBE_KEY} from "../keys";
import {ItemKind, YoutubeSearchResponse} from "./types";
import {Item} from "../types";

interface ResponseType {
  items: Item[];
}

export const searchVideos = (
  term: string,
  pageToken?: string
): Promise<ResponseType> =>
  fetch(
    url("search", {
      part: "snippet",
      shart: "mostPopular",
      maxResults: 10,
      pageToken,
      q: logRequest(term, "search")
    })
  )
    .then(response => response.json())
    .then((data: YoutubeSearchResponse) => ({
      //TODO: extract duplication
      // nextPageToken: data.nextPageToken,
      // totalResults: data.pageInfo.totalResults,
      items: data.items
        .filter(item => isItemSupported(item.id.kind))
        .map(item => ({
          videoId: item.id.videoId || "",
          imageUrl: item.snippet.thumbnails.medium.url,
          text: item.snippet.title,
          id: Math.random() + ""
        }))
    }));

const logRequest = (term: string, requestType: string) => {
  console.log(`Requesting Youtube ${requestType} for ${term}`);
  return term;
};

const isItemSupported = (itemKind: ItemKind): boolean =>
  itemKind === "youtube#video";
// itemKind === "youtube#playlist" ||
// itemKind === "youtube#channel";

const defaultProps = {
  key: YOUTUBE_KEY
};

const parseProps = (props: any): string => {
  const allProps = {...props, ...defaultProps};
  return Object.keys(allProps)
    .filter(key => typeof allProps[key] !== "undefined")
    .map(key => `${key}=${allProps[key]}`)
    .join("&");
};
const url = (verb: string, props: {}) =>
  `https://www.googleapis.com/youtube/v3/${verb}?${parseProps(props)}`;
