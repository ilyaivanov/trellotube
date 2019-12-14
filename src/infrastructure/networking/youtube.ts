import { YOUTUBE_KEY } from "../constants";
import { ItemKind, ItemsItem, YoutubeSearchResponse } from "./types";
import { Item } from "../../state2/boards";
import { createId } from "../utils";
import { myFetch } from "./fetch";
import { makeApiCall } from "../../state2/apiMiddleware";
interface ResponseType {
  items: Item[];
}

export const mapYoutubeSimilarSearchResponse = (
  response: YoutubeSearchResponse,
  idPool: string[]
): Item[] => {
  return response.items
    .filter(item => isItemSupported(getId(item).kind))
    .map((item, index) => mapItem(item, idPool[index]));
};

export const searchVideos = (
  term: string
  // pageToken?: string
): Promise<ResponseType> =>
  searchForVideos("search", {
    shart: "mostPopular",
    q: logRequest(term, "search")
  });

export const searchSimilar = (videoId: string) =>
  makeApiCall({
    onStart: "SEARCH_SIMILAR_START",
    onError: "SEARCH_SIMILAR_ERROR",
    onSuccess: "SEARCH_SIMILAR_SUCCESS",
    url: "https://www.googleapis.com/youtube/v3/search",
    props: {
      key: YOUTUBE_KEY,
      part: "snippet",
      maxResults: 20,
      type: "video",
      relatedToVideoId: videoId
    }
  });

export const loadPlaylistVideos = (playlistId: string) =>
  searchForVideos("playlistItems", {
    part: "snippet",
    playlistId,
    maxResults: 20
  });

const searchForVideos = (verb: string, props: {}): Promise<ResponseType> =>
  myFetch(
    url(verb, {
      part: "snippet",
      maxResults: 20,
      ...props
    })
  ).then((data: YoutubeSearchResponse) => {
    return {
      items: data.items
        .filter(item => isItemSupported(getId(item).kind))
        .map(i => mapItem(i))
    };
  });

const mapItem = (item: ItemsItem, id = createId()): Item => {
  const base = {
    id,
    imageUrl: item.snippet.thumbnails.medium.url,
    name: item.snippet.title,
    type: mapType(getId(item).kind)
  };
  if (base.type === "video") {
    //@ts-ignore
    base.videoId = getId(item).videoId;
  } else {
    //@ts-ignore
    base.playlistId = getId(item).playlistId;
  }
  //@ts-ignore
  return base;
};

const getId = (item: any) => {
  if (item.kind === "youtube#playlistItem") return item.snippet.resourceId;
  return item.id;
};

const logRequest = (term: string, requestType: string) => {
  console.log(requestType, term);
  return term;
};

const isItemSupported = (itemKind: ItemKind): boolean =>
  itemKind === "youtube#video" ||
  itemKind === "youtube#playlist" ||
  itemKind === "youtube#playlistItem";
// itemKind === "youtube#channel";

const mapType = (itemKind: ItemKind): string => {
  if (itemKind === "youtube#video" || itemKind === "youtube#playlistItem")
    return "video";
  else return "playlist";
};

const defaultProps = {
  key: YOUTUBE_KEY
};

const parseProps = (props: any): string => {
  const allProps = { ...props, ...defaultProps };
  return Object.keys(allProps)
    .filter(key => typeof allProps[key] !== "undefined")
    .map(key => `${key}=${allProps[key]}`)
    .join("&");
};
const url = (verb: string, props: {}) =>
  `https://www.googleapis.com/youtube/v3/${verb}?${parseProps(props)}`;
