//create data for local storage
var data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')) : { todo: [], completed: []};

renderTodoListToHTML ();

function renderTodoListToHTML() {

	if(data.completed.length == 0 && data.todo.length == 0 ) {
		console.log('two of them is empty');
		
	}else {
		console.log('one of them is not empty');
		for (var i = 0; i < data.todo.length; i++) {
			var value = data.todo[i];
			addItemTodo(value) 
		}
		for (var j = 0; j < data.completed.length; j++) {
			var value = data.completed[j];
			addItemTodo(value, true) 		
		}

	}
}

function dataObjectUpdated() {
	console.log(data);
	//make it Json first then store it as a string
	localStorage.setItem('todoList', JSON.stringify(data));
}

/*User clicked on the add button
if there is any text inside the item field, add that text to the todo list*/
document.getElementById('add').addEventListener('click', function() {
	var value = document.getElementById('item').value;
	//if the value not empty
	if(value) {
		addItemTodo(value);
		document.getElementById('item').value = '';
		//push value in to object data
		data.todo.push(value);

		dataObjectUpdated();
	}else {
		console.log('no value');
	}
});

//on key down Enter
document.getElementById('item').addEventListener('keydown', function(e) {
	var value = this.value;

	if(e.keyCode === 13 && value || e.keyCode === 13 && value ) {

		addItemTodo(value);
		document.getElementById('item').value = '';
		data.todo.push(value);
		dataObjectUpdated();
	}

});

//add item function
function addItemTodo(value, completed) {
	//parent El
	var parent = (completed) ? document.getElementById('completed'):document.getElementById('todo');
	//create div an apply class and id
	var container = document.createElement("div")
	container.classList.add('container');
	container.setAttribute('id', 'container');
	//create domString
	var domString = '<div class="row">\
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">\
                            <div class="content">\
                                <ul class="items">\
                                    <li class="item">\
                                        <p class="text" id="text">'+ value +'</p>\
                                    </li>\
                                    <li class="item delete">\
                                        <a id="delete" class="deleteButton"><i class="fa fa-trash-o fa-2x" aria-hidden="true"></i></a>\
                                    </li>\
                                    <li class="item check">\
                                       <a id="check" class="checkButton"><i class="fa fa-check-circle-o fa-2x" aria-hidden="true"></i></a>\
                                    </li>\
                                </ul>\
                            </div>\
                        </div>\
	                </div>';
	
	//append the string to the div .container
	container.innerHTML = domString;
	//insert before other item on click
	parent.insertBefore(container, parent.childNodes[0]);

	//get the delete button and remove item on click trash
	var deleteButton = document.getElementsByClassName('deleteButton');
	console.log(deleteButton)
	for (var i = 0; i < deleteButton.length; i++) {
		deleteButton[i].addEventListener('click', removeItem);
	}

	//get the complete button and add item to complete or re-add
	var completeButton = document.getElementsByClassName('checkButton');
	console.log(completeButton);
	for (var i = 0; i < completeButton.length; i++) {
		completeButton[i].addEventListener('click', completeItem)
	}

}

//the add to complete function
function completeItem() {
	var value = this.parentNode.parentNode.querySelector("#text").innerText;
	var item = this.closest("#container");
	var parentID = item.parentNode.id;

	if(parentID === 'todo') {
		data.todo.splice(data.todo.indexOf(value), 1);
		data.completed.push(value);
	}else {
		data.completed.splice(data.completed.indexOf(value), 1);
		data.todo.push(value);
	}

	//check what the parent is
	var target = (parentID == 'todo') ? document.getElementById('completed') : document.getElementById('todo');
	
	target.insertBefore(item, target.childNodes[0]);

	dataObjectUpdated();
}

//the remove function
function removeItem() {
	var target = this.closest("#container");
	var parentID = target.parentNode.id;
	var value = this.parentNode.parentNode.querySelector("#text").innerText;

	if(parentID === 'todo') {
		data.todo.splice(data.todo.indexOf(value), 1);
	}else {
		data.completed.splice(data.completed.indexOf(value), 1);
	}

	target.remove();

	dataObjectUpdated();
};


