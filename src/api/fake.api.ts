import { createId } from "../shared/utils";
import { Item } from "../types";

export const IS_USING_FAKE_API = process.env.NODE_ENV !== "production";

const imagesPool = [
  "39svBN954-M",
  "jv0WbW9weAA",
  "KvRVky0r7YM",
  "Q-oluoEQCk0",
  "cvRbhpvnUuc"
];

const getRandomVideo = () => {
  const randomIndex = Math.floor(Math.random() * imagesPool.length);
  const videoId = imagesPool[randomIndex];
  return {
    videoId,
    imageUrl: `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`
  };
};

const generateRandomVideos = (count: number): Item[] =>
  Array.from(Array(count)).map(() => ({
    ...getRandomVideo(),
    text: "Sample",
    id: createId(),
    type: Math.random() > 0.5 ? "video" : "playlist"
  }));

export const createSampleVideos = (count: number): any => ({
  items: generateRandomVideos(count)
});
