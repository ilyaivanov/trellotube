import { ApplicationSandbox } from "../infrastructure/testUtils";

xdescribe("Having a board", () => {
  let app: ApplicationSandbox;
  beforeEach(() => (app = new ApplicationSandbox()));

  afterEach(() => app.resetState());

  it("when removing a board it should remove it from the screen", () => {
    app.expectColumnToExist("2");
    app.clickRemoveColumn("2");
    app.expectColumnNotToExist("2");
  });

  it("creating a new column should show a new empty column", () => {
    app.expectColumnNotToExist("someNewId");
    app.clickCreateNewColumn();
    app.expectColumnToExist("someNewId");
  });

  it("when renaming a column it's title label should change", () => {
    app.expectColumnToHaveName("1", "First");

    app.startRenamingColumn("1");
    app.enterColumnNameText("1", "NEW COLUMN");
    app.endRenamingColumn("1");

    app.expectColumnToHaveName("1", "NEW COLUMN");
  });
});
