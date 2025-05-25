import {
  canAddItem,
  canDeleteItem,
  canToggleItemCompleted,
  hasItems,
} from "@/test/preconditions/shopping-list-items";
import { expect, it } from "@/test/utils";

it("should be possible to add items to the list", async ({ driver }) => {
  await canAddItem({ driver });

  await driver.goTo("/");
  await driver.getByLabel("New item").fill("Butter");
  await driver.getByRole("button", { name: "Add item" }).click();

  await expect(driver.getByText("Butter")).toBeVisible();
});

it("should be possible to complete items", async ({ driver }) => {
  await hasItems({ driver });
  await canToggleItemCompleted({ driver });

  await driver.goTo("/");
  await driver.getByRole("button", { name: "Milk" }).click();

  await expect(
    driver.getByRole("button", { name: "Delete item Milk" })
  ).toBeVisible();
});

it("should be possible delete a completed item", async ({ driver }) => {
  await hasItems({ driver });
  await canDeleteItem({ driver });

  await driver.goTo("/");
  await driver.getByRole("button", { name: "Delete item Bread" }).click();

  await expect(
    driver.getByRole("button", { name: "Delete item Bread" })
  ).not.toBeVisible();
});

it("it should be possible to rate items", async ({ driver }) => {
  // TODO
});
