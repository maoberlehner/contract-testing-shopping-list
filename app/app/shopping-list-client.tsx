"use client";

import { Plus, Square, RotateCcw, Trash2 } from "lucide-react";
import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateShoppingList } from "@/app/actions";
import type { ShoppingListItem } from "@/repositories/shopping-list";

export function ShoppingListClient({
  items: itemsInitial,
}: {
  items: ShoppingListItem[];
}) {
  const [items, updateShoppingListAction, isPending] = useActionState(
    updateShoppingList,
    itemsInitial
  );

  const pendingItems = items.filter((item) => !item.completed);
  const completedItems = items.filter((item) => item.completed);

  return (
    <div className="space-y-6">
      <form action={updateShoppingListAction} className="flex gap-2">
        <label htmlFor="name" className="sr-only">
          New item
        </label>
        <Input
          name="name"
          id="name"
          placeholder="Add new item..."
          className="flex-1"
          required
        />
        <input type="hidden" name="action" value="CREATE" />
        <Button disabled={isPending} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add item
        </Button>
      </form>

      <div className="space-y-2">
        {pendingItems.length > 0 && (
          <div className="text-sm font-medium text-muted-foreground mb-2">
            Shopping List ({pendingItems.length})
          </div>
        )}
        {pendingItems.map((item) => {
          return (
            <form key={item.id} action={updateShoppingListAction}>
              <input type="hidden" name="id" value={item.id} />
              <input type="hidden" name="action" value="TOGGLE" />
              <button
                className={`w-full flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-green-50 hover:border-green-200 transition-colors text-left ${
                  isPending ? "opacity-70" : ""
                }`}
                disabled={isPending}
              >
                <Square className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <div className="flex-1">
                  <span className="text-card-foreground">{item.name}</span>
                </div>
              </button>
            </form>
          );
        })}
      </div>

      {pendingItems.length === 0 && (
        <div className="text-center py-4 text-muted-foreground">
          No items in your shopping list. Add some items above!
        </div>
      )}

      {completedItems.length > 0 && (
        <div className="space-y-2">
          <div className="text-sm font-medium text-muted-foreground mb-2">
            Completed ({completedItems.length})
          </div>
          {completedItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-2 p-3 rounded-lg border bg-muted/30"
            >
              <form action={updateShoppingListAction} className="flex-1">
                <input type="hidden" name="id" value={item.id} />
                <input type="hidden" name="action" value="TOGGLE" />
                <button
                  className="flex items-center gap-3 hover:bg-blue-50 hover:border-blue-200 transition-colors text-left rounded px-2 py-1"
                  disabled={isPending}
                >
                  <RotateCcw className="h-4 w-4 text-blue-600 flex-shrink-0" />
                  <span className="text-muted-foreground line-through">
                    {item.name}
                    {item.quantity && item.quantity > 1 && (
                      <span className="ml-2">x{item.quantity}</span>
                    )}
                  </span>
                </button>
              </form>
              <form action={updateShoppingListAction} className="flex-shrink-0">
                <input type="hidden" name="id" value={item.id} />
                <input type="hidden" name="action" value="DELETE" />
                <button
                  className="p-2 hover:bg-red-50 hover:text-red-600 transition-colors rounded"
                  title="Remove item"
                  disabled={isPending}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete item {item.name}</span>
                </button>
              </form>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
