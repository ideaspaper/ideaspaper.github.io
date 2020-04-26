let todoList = document.getElementById('todoList');

function keyup(oEvent) {
  switch (oEvent.key) {
    case 'Enter':
      // From new todo text box
      if (oEvent.srcElement.id === 'newTodo') {
        addList(oEvent.srcElement.value);
        oEvent.srcElement.value = '';
      }
      break;
    default:
      break;
  }
}

function addList(sItem) {
  if (sItem !== '') {
    sItem = sItem.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    addList.total === undefined ? addList.total = 0 : {};
    let newTodoCheck = document.createElement('input');
    newTodoCheck.setAttribute('type', 'checkbox');
    let newTodo = document.createElement('li');
    newTodo.innerHTML = '  ' + sItem;
    newTodo.prepend(newTodoCheck);
    let newLabel = document.createElement('label');
    newLabel.append(newTodo);
    todoList.insertBefore(newLabel, todoList.childNodes[addList.total]);
    addList.total++;
  }
}