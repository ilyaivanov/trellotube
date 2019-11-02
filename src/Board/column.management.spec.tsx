import { ApplicationSandbox } from "../testUtils";
import React from "react";
it("when removing a board it should remove it from the screen", () => {
  const app = new ApplicationSandbox();
  app.expectColumnToExist("3");
  app.clickRemoveColumn("3");
  app.expectColumnNotToExist("3");
});

it("creating a new column should show a new empty column", () => {
  Math.random = () => 42;
  const app = new ApplicationSandbox();
  app.expectColumnNotToExist("42");
  app.clickCreateNewColumn();
  app.expectColumnToExist("42");
});

it("when renaming a column it's title label should change", () => {
  const app = new ApplicationSandbox();
  app.expectColumnToExist("1");
  app.expectColumnNotToExist("NEW COLUMN");

  app.startRenamingColumn("1");
  app.enterColumnNameText("1", "NEW COLUMN");
  app.endRenamingColumn("1");

  app.expectColumnToExist("1");
  app.expectColumnNotToExist("NEW COLUMN");
});

it("plan hitting a play button a video should be player", () => {
  const app = new ApplicationSandbox();
  app.hitPlayVideo("MY_VIDEO_ID");
  app.expectVideoToBePlaying("YOUTUBE_ID");
});
