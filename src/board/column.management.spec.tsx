import { ApplicationSandbox } from "../testUtils";
import React from "react";

jest.mock("../");

it("when removing a board it should remove it from the screen", () => {
  const app = new ApplicationSandbox();
  app.expectColumnToExist("3");
  app.clickRemoveColumn("3");
  app.expectColumnNotToExist("3");
});

it("creating a new column should show a new empty column", () => {
  const app = new ApplicationSandbox();
  app.expectColumnNotToExist("someNewId");
  app.clickCreateNewColumn();
  app.expectColumnToExist("someNewId");
});

it("when renaming a column it's title label should change", () => {
  const app = new ApplicationSandbox();
  app.expectColumnToHaveName("1", "First");

  app.startRenamingColumn("1");
  app.enterColumnNameText("1", "NEW COLUMN");
  app.endRenamingColumn("1");

  app.expectColumnToHaveName("1", "NEW COLUMN");
});

it("plan hitting a play in column button a video should be player", () => {
  const app = new ApplicationSandbox();
  app.hitPlayVideo("MY_VIDEO_ID");
  app.expectVideoToBePlaying("YOUTUBE_ID");
});

it("plan hitting a play in search button a video should be player", () => {
  const app = new ApplicationSandbox();
  app.hitPlayVideo("MY_VIDEO_ID_AT_SEARCH");
  app.expectVideoToBePlaying("YOUTUBE_ID_AT_SEARCH");
});
