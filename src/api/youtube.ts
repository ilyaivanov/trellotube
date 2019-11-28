import { YOUTUBE_KEY } from "../keys";
import { ItemKind, YoutubeSearchResponse } from "./types";
import { Item, ItemType } from "../types";
import { createId } from "../shared/utils";
import { createSampleVideos, IS_USING_FAKE_API } from "./fake.api";
import {myFetch} from './fetch';
interface ResponseType {
  items: Item[];
}

export const searchVideos = (
  term: string,
  pageToken?: string
): Promise<ResponseType> =>
    searchForVideos("search", {
        shart: "mostPopular",
        q: logRequest(term, "search")
      });

export const searchSimilar = (videoId: string) =>
  IS_USING_FAKE_API
    ? Promise.resolve(createSampleVideos(20))
    : searchForVideos("search", {
        type: "video",
        relatedToVideoId: logRequest(videoId, "search.similar")
      });

export const loadPlaylistVideos = (playlistId: string) =>
  IS_USING_FAKE_API
    ? Promise.resolve(createSampleVideos(20))
    : searchForVideos("playlistItems", {
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
  )
    .then((data: YoutubeSearchResponse) => {
      return {
        items: data.items
          .filter(item => isItemSupported(getId(item).kind))
          .map(item => ({
            //PLAYLIST HAVE DIFFERENT VIDEO IDS
            videoId: getId(item).videoId || getId(item).playlistId || "",
            imageUrl: item.snippet.thumbnails.medium.url,
            text: item.snippet.title,
            id: createId(),
            type: mapType(getId(item).kind)
          }))
      }
    });

const getId = (item:any) => {
  if(item.kind === 'youtube#playlistItem')
    return item.snippet.resourceId;
  return item.id;
}

const logRequest = (term: string, requestType: string) => {
  console.log(`Requesting Youtube ${requestType} for ${term}`);
  return term;
};

const isItemSupported = (itemKind: ItemKind): boolean =>
  itemKind === "youtube#video" ||
  itemKind === "youtube#playlist" ||
  itemKind === "youtube#playlistItem";
// itemKind === "youtube#channel";

const mapType = (itemKind: ItemKind): ItemType => {
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
