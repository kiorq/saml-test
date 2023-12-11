import { useCallback, useEffect, useState } from "react";

const ITEM_NAME = "SAVED_ITEMS";

export interface Item {
  id: number;
  originalText: string;
  ssml: string;
}

interface SavedItemsHook {
  items: Item[];
  addItem: (item: Omit<Item, "id">) => void;
}

export const useSavedItems = (): SavedItemsHook => {
  const [items, setItems] = useState<Item[]>([]);
  const lastItemId = items.length > 0 ? items[0].id : 0;

  useEffect(() => {
    setItems(JSON.parse(localStorage.getItem(ITEM_NAME) || "[]"));
  }, []);

  const addItem = (item: Omit<Item, "id">) => {
    const updatedItems = [{ id: lastItemId + 1, ...item }, ...items];
    setItems(updatedItems);
    localStorage.setItem(ITEM_NAME, JSON.stringify(updatedItems));
  };
  return { items, addItem };
};
