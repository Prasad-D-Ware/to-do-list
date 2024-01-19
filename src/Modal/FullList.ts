import ListItem from "./ListItem";

interface List {
  list: ListItem[];
  load(): void;
  save(): void;
  clearList(): void;
  addItem(itemObj: ListItem): void;
  removeItem(id: string): void;
}

export default class FullList implements List {
  static instance: FullList = new FullList();
  private constructor(private _list: ListItem[] = []) {}

  get list(): ListItem[] {
    return this._list;
  }

  load(): void {
    const storedList: string | null = localStorage.getItem("myList");

    // Check if there's a stored list and it's a string
    if (storedList && typeof storedList === "string") {
      const parsedList: { _id: string; _item: string; _checked: boolean }[] =
        JSON.parse(storedList);

      // Clear the existing list
      this._list = [];

      // Add items from the stored list to the current list
      parsedList.forEach((itemObj) => {
        const newListItem = new ListItem(
          itemObj._id,
          itemObj._item,
          itemObj._checked
        );
        this._list.push(newListItem);
      });
    }
  }

  save(): void {
    localStorage.setItem("myList", JSON.stringify(this._list));
  }

  clearList(): void {
    this._list = [];
    this.save();
  }

  addItem(itemObj: ListItem): void {
    this._list.push(itemObj);
    this.save();
  }

  removeItem(id: string): void {
    this._list = this._list.filter((item) => item.id != id);
    this.save();
  }
}
