import ToDoList from "./todolist.js";
import ToDoItem from "./todoitem.js";

const toDoList = new ToDoList();

// Launch app

document.addEventListener("readystatechange", (event) => {
  if (event.target.readyState === "complete") {
    initApp();
  }
});

const initApp = () => {
  // Add listeners
  const itemEntryForm = document.getElementById("itemEntryForm");

  itemEntryForm.addEventListener("submit", (event) => {
    event.preventDefault(); // prevents the page from reloading (the form)
    processSubmission();
  });

  //To clear the entire list
  const clearItems = document.getElementById("clearItems");
  clearItems.addEventListener("click", (event) => {
    const list = toDoList.getList();
    if (list.length) {
      const confirmed = confirm(
        "Are you sure you ant to clear the entire list?"
      );
      if (confirmed) {
        toDoList.clearList();
        //Update persistent data
        updatePersistentData(toDoList.getList());

        refreshThePage();
      }
    }
  });

  loadListObject();
  refreshThePage();
};

//Getting data from storage
const loadListObject = () => {
  const storedList = localStorage.getItem("myToDoList");
  if (typeof storedList !== "string") return;
  const parsedList = JSON.parse(storedList);
  parsedList.forEach((itemObj) => {
    const newToDoItem = createNewItem(itemObj._id, itemObj._item);
    toDoList.addItemToList(newToDoItem);
  });
};

const refreshThePage = () => {
  clearListDisplay();
  renderList();
  clearItemEntryField();
  setFocusOnItemEntry();
};

const clearListDisplay = () => {
  const parentElement = document.getElementById("listItems");
  deleteContents(parentElement);
};

const deleteContents = (parentElement) => {
  let child = parentElement.lastElementChild;
  while (child) {
    parentElement.removeChild(child);
    child = parentElement.lastElementChild;
  }
};

const renderList = () => {
  const list = toDoList.getList();
  list.forEach((item) => {
    buildListItem(item);
  });
};

const buildListItem = (item) => {
  //Create the element
  const div = document.createElement("div");
  div.className = "item";

  const check = document.createElement("input");
  check.type = "checkbox";
  check.id = item.getId();
  check.tabIndex = 0;

  const label = document.createElement("label");
  label.htmlFor = item.getId();
  label.textContent = item.getItem();

  //Create the close button
  const closeButton = document.createElement("button");
  closeButton.appendChild(document.createTextNode("X"));
  closeButton.className = "closeButton";
  closeButton.id = item.getId();

  //Listens for the x button
  addClickListenerCloseButton(closeButton);

  div.appendChild(check);
  div.appendChild(label);
  div.appendChild(closeButton);
  const container = document.getElementById("listItems");
  container.appendChild(div);
};

//To remove each item

const addClickListenerCloseButton = (button) => {
  button.addEventListener("click", (event) => {
    toDoList.removeItemFromList(button.id);
    //Remove from persistent data
    updatePersistentData(toDoList.getList());
    setTimeout(() => {
      refreshThePage();
    }, 200);
  });
};

const updatePersistentData = (listArray) => {
  localStorage.setItem("myToDoList", JSON.stringify(listArray));
};

const clearItemEntryField = () => {
  document.getElementById("newItem").value = "";
};

const setFocusOnItemEntry = () => {
  document.getElementById("newItem").focus();
};

const processSubmission = () => {
  const newEntryText = getNewEntry();
  if (!newEntryText.length) return;
  const nextItemId = calcNextItemId();
  const toDoItem = createNewItem(nextItemId, newEntryText);
  toDoList.addItemToList(toDoItem);
  //Update persistent data
  updatePersistentData(toDoList.getList());

  refreshThePage();
};

const getNewEntry = () => {
  return document.getElementById("newItem").value.trim();
};

const calcNextItemId = () => {
  let nextItemId = 1;
  const list = toDoList.getList();
  if (list.length > 0) {
    nextItemId = list[list.length - 1].getId() + 1;
  }

  return nextItemId;
};

const createNewItem = (itemId, itemText) => {
  const toDo = new ToDoItem();
  toDo.setId(itemId);
  toDo.setItem(itemText);
  return toDo;
};
