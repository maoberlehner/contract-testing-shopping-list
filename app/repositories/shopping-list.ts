import createClient from "openapi-fetch";
import type { paths, components } from "./service-shopping-list";

const client = createClient<paths>({
  baseUrl:
    process.env.SERVICE_GATEWAY_URL ||
    process.env.SERVICE_SHOPPING_LIST_URL ||
    "http://localhost:3100",
});

export type ShoppingListItem =
  components["schemas"]["ShoppingListItemResponse"];
export type CreateShoppingListItemRequest =
  components["schemas"]["ShoppingListItemRequest"];
export type UpdateShoppingListItemRequest =
  components["schemas"]["ShoppingListItemRequest"];

export const getAllItems = async (): Promise<ShoppingListItem[]> => {
  const { data, error } = await client.GET("/shopping-list/items");
  if (error) throw new Error(`Failed to fetch items: ${JSON.stringify(error)}`);

  return data || [];
};

export const createItem = async (item: CreateShoppingListItemRequest) => {
  const { data, error } = await client.POST("/shopping-list/items", {
    body: {
      name: item.name,
      completed: item.completed || false,
    },
  });

  if (error) throw new Error(`Failed to create item: ${JSON.stringify(error)}`);
  if (!data) throw new Error("No data returned from create item");

  return data;
};

export const toggleItemCompleted = async (itemId: string) => {
  const currentItems = await getAllItems();
  const currentItem = currentItems.find((item) => item.id === itemId);

  if (!currentItem) throw new Error(`Item with id ${itemId} not found`);

  const { data, error } = await client.PUT("/shopping-list/items/{itemId}", {
    params: {
      path: { itemId },
    },
    body: {
      name: currentItem.name,
      completed: !currentItem.completed,
    },
  });

  if (error) throw new Error(`Failed to toggle item: ${JSON.stringify(error)}`);
  if (!data) throw new Error("No data returned from toggle item");

  return data;
};

export const deleteItem = async (itemId: string) => {
  const { data, error } = await client.DELETE("/shopping-list/items/{itemId}", {
    params: {
      path: { itemId },
    },
  });

  if (error) throw new Error(`Failed to delete item: ${JSON.stringify(error)}`);

  return data?.deleted || false;
};
