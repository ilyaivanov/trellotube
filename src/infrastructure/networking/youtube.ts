import { YOUTUBE_KEY } from "../constants";
import { ItemKind, ItemsItem, YoutubeSearchResponse } from "./types";
import { Item } from "../../state2/boards";
import { createId } from "../utils";
import { makeApiCall } from "../../state2/apiMiddleware";

export const mapYoutubeSimilarSearchResponse = (
  response: YoutubeSearchResponse,
  idPool: string[]
): Item[] => {
  return response.items
    .filter(item => isItemSupported(getId(item).kind))
    .map((item, index) => mapItem(item, idPool[index]));
};

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

export const searchVideos = (term: string) =>
  makeApiCall({
    onStart: "SEARCH_START",
    onError: "SEARCH_ERROR",
    onSuccess: "SEARCH_SUCCESS",
    url: "https://www.googleapis.com/youtube/v3/search",
    props: {
      key: YOUTUBE_KEY,
      part: "snippet",
      maxResults: 20,
      shart: "mostPopular",
      q: term
    }
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
