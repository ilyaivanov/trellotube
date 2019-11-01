import { ApplicationSandbox } from "../testUtils";

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
