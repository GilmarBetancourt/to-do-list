export default class ToDoItem {
  constructor() {
    this._id = null;
    this._item = null;
    //To save the checked
    this._isChecked = false;
  }

  getId() {
    return this._id;
  }

  setId(id) {
    this._id = id;
  }

  getItem() {
    return this._item;
  }

  setItem(item) {
    this._item = item;
  }

  //To get the checkbox status
  getChecked() {
    return this._isChecked;
  }

  //To set the checkbox status
  setChecked(checkboxBool) {
    this._isChecked = checkboxBool;
  }
}
