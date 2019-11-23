import { YOUTUBE_KEY } from "../keys";
import { ItemKind, YoutubeSearchResponse } from "./types";
import { Item } from "../types";
import { createId } from "../shared/utils";
import { createSampleVideos, IS_USING_FAKE_API } from "./fake.api";

interface ResponseType {
  items: Item[];
}

export const searchVideos = (
  term: string,
  pageToken?: string
): Promise<ResponseType> =>
  IS_USING_FAKE_API
    ? Promise.resolve(createSampleVideos(20))
    : searchForVideos("search", {
        shart: "mostPopular",
        q: logRequest(term, "search")
      });

export const searchSimilar = (videoId: string) =>
  (IS_USING_FAKE_API)
    ? Promise.resolve(createSampleVideos(20))
    : searchForVideos("search", {
        type: "video",
        relatedToVideoId: logRequest(videoId, 'search.similar')
      });

const searchForVideos = (verb: string, props: {}): Promise<ResponseType> =>
  fetch(
    url("search", {
      part: "snippet",
      maxResults: 20,
      ...props
    })
  )
    .then(response => response.json())
    .then((data: YoutubeSearchResponse) => ({
      items: data.items
        .filter(item => isItemSupported(item.id.kind))
        .map(item => ({
          videoId: item.id.videoId || "",
          imageUrl: item.snippet.thumbnails.medium.url,
          text: item.snippet.title,
          id: createId()
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
  const allProps = { ...props, ...defaultProps };
  return Object.keys(allProps)
    .filter(key => typeof allProps[key] !== "undefined")
    .map(key => `${key}=${allProps[key]}`)
    .join("&");
};
const url = (verb: string, props: {}) =>
  `https://www.googleapis.com/youtube/v3/${verb}?${parseProps(props)}`;
