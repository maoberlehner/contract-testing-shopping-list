import { randomUUID } from "node:crypto";
import type { components } from "../service-shopping-list.d.ts";
import { serviceProduct } from "../utils/api-client.ts";

export type Item = components["schemas"]["ShoppingListItemResponse"];
export type ItemCreate = components["schemas"]["ShoppingListItemRequest"];

let items: Item[] = [];

export const add = async (item: ItemCreate) => {
  // TODO repository
  const { data: products } = await serviceProduct.GET("/products", {
    params: { query: { name: item.name } },
  });
  let product = products?.[0];
  if (!product) {
    const { data: productNew } = await serviceProduct.POST("/products", {
      body: {
        name: item.name,
      },
    });
    product = productNew;
    // TODO
    if (!product) throw new Error();
  }

  const itemNew = {
    id: randomUUID(),
    productId: product.id,
    quantity: 1,
    ...item,
  };
  items.push(itemNew);

  return itemNew;
};

export const list = async () => {
  return items;
};

export const update = async (
  id: Item["id"],
  itemPartial: Partial<ItemCreate>
) => {
  const item = items.find((x) => x.id === id);
  if (!item) throw new Error(`Item with id ${id} does not exist!`);

  const itemUpdated = {
    ...item,
    ...itemPartial,
  };

  items = items.map((item) => {
    if (item.id !== id) return item;
    return itemUpdated;
  });

  return itemUpdated;
};

export const remove = async (id: Item["id"]) => {
  items = items.filter((item) => item.id !== id);
};
