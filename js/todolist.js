export default class ToDoList {
  constructor() {
    this._list = [];
  }

  getList() {
    return this._list;
  }

  clearList() {
    this._list = [];
  }

  addItemToList(itemObj) {
    this._list.push(itemObj);
  }

  removeItemFromList(id) {
    const list = this._list;
    for (let i = 0; i < list.length; i++) {
      if (list[i]._id == id) {
        list.splice(i, 1);
        break;
      }
    }
  }

  //To update the checks
  updateCheckboxes(id, checkStatus) {
    const checklist = this._list;
    for (let i = 0; i < checklist.length; i++) {
      if (checklist[i]._id == id) {
        checklist[i]._isChecked = checkStatus;
        break;
      }
    }
  }
}
