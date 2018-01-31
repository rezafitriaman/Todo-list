//create data for local storage
var data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')) : { todo: [], completed: []};

renderTodoListToHTML ();

function renderTodoListToHTML() {

	if(data.completed.length == 0 && data.todo.length == 0 ) {
		/*console.log('two of them is empty');*/
		
	}else {
		/*console.log('one of them is not empty');*/
		for (var i = 0; i < data.todo.length; i++) {
			var value = data.todo[i];
			addItemTodo(value);
		}
		for (var j = 0; j < data.completed.length; j++) {
			var value = data.completed[j];
			addItemTodo(value, true) 		
		}

	}
}

function dataObjectUpdated() {
	//make it Json first then store it as a string on locaql sotrage
	localStorage.setItem('todoList', JSON.stringify(data));
	/*console.log(data);*/
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
		/*console.log('no value');*/
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
	container.classList.add('mirror');
	container.setAttribute('id', 'container');
	container.style.opacity = 0;
	//create domString
	var domString = '<div class="row">\
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">\
                            <div class="content">\
                                <ul class="items">\
                                	<li class="item">\
                                        <i class="fa fa-arrows-alt" aria-hidden="true"></i>\
                                    </li>\
                                    <li class="item">\
                                        <p class="text" id="text">'+ value +'</p>\
                                    </li>\
                                    <li class="item delete">\
                                        <a id="delete" class="deleteButton"><i class="fa fa-trash-o fa-2x" aria-hidden="true"></i></a>\
                                    </li>\
                                    <li class="item check">\
                                       <button id="check" class="checkButton"><i class="fa fa-check-circle-o fa-2x" aria-hidden="true"></i></button>\
                                    </li>\
                                </ul>\
                            </div>\
                        </div>\
	                </div>';
	
	//append the string to the div .container
	container.innerHTML = domString;
	//insert before other item on click
	parent.insertBefore(container, parent.childNodes[0]);
	//fade in function after append it before first child(insert Before)
	fadeIn(container);

	//get the delete button and remove item on click trash
	var deleteButton = document.getElementsByClassName('deleteButton');

	for (var i = 0; i < deleteButton.length; i++) {
		deleteButton[i].addEventListener('click', removeItem);
	}

	//get the complete button and add item to complete or re-add
	var completeButton = document.getElementsByClassName('checkButton');

	for (var i = 0; i < completeButton.length; i++) {
		completeButton[i].addEventListener('click', completeItem);
	}
}

//the add to complete function
function completeItem() {
	var completeButton = this;
	var value = completeButton.parentNode.parentNode.querySelector("#text").innerText;
	var item = completeButton.closest("#container");
	var parentID = item.parentNode.id;

	/*on click desable button*/
	completeButton.setAttribute('disabled', true);

	if(parentID === 'todo') {
		
		data.todo.splice(data.todo.indexOf(value), 1);
		data.completed.push(value);
	}else {
		data.completed.splice(data.completed.indexOf(value), 1);
		data.todo.push(value);
	}

	//check what the parent is
	var target = (parentID == 'todo') ? document.getElementById('completed') : document.getElementById('todo');
	/*console.log('item from completeItem', item);*/
	fadeOut(completeButton, item, target, true);
	/*target.insertBefore(item, target.childNodes[0]);*/

	dataObjectUpdated();
	
}

//the remove function
function removeItem() {
	var item = this.closest("#container");
	var parentID = item.parentNode.id;
	var value = this.parentNode.parentNode.querySelector("#text").innerText;

	if(parentID === 'todo') {
		data.todo.splice(data.todo.indexOf(value), 1);
	}else {
		data.completed.splice(data.completed.indexOf(value), 1);
	}
	/*console.log('target from removeItem', item)*/
	fadeOut(false, item, false, false);
	/*target.remove();*/

	dataObjectUpdated();
};

//Fade out
function fadeOut(completeButton, item, target, completed) {
    var timer = setInterval(function () {
        op = op - 0.1;
        if (op <= 0.0){
            clearInterval(timer);
            if(completed === true) {
            	target.insertBefore(item, target.childNodes[0]);
            	fadeIn(item);
            	/*finished delete disabled*/
            	completeButton.removeAttribute('disabled');
            }else {
            	item.remove();
            	/*console.log('remove');*/
            }
        }
        item.style.opacity = op;
        
    }, 40);

   var op = 1;  // initial opacity
}

//fade in
function fadeIn(container) {
	var timer = setInterval(function() {
		op = op + 0.1
		if(op >= 1) {
			clearInterval(timer);
			/*console.log('add');*/
			op = 1;

		}
		/*console.log('op', op);*/
		container.style.opacity = op;

	},40);

	var op = 0.1;
	
}

/*function intro*/
function intro() {
	var intro = document.getElementById('intro');
	var todoApp = document.getElementById('todo-app');

	function showApp() {
		intro.style.display = 'none'
		todoApp.style.display = 'block'
	}
	setTimeout(function() {
		showApp();
	},3000);
}

intro();

/*drag en drop dragula*/
function onTouchStart() {
	/*first delete style property*/
	var target = document.querySelectorAll('.mirror')
	for (var i = 0; i < target.length; i++) {
		target[i].addEventListener("touchstart", function() {
/*			var parent = this.parentNode;*/
			this.removeAttribute("style");
/*			console.log(parent)
			observeDrop(parent);*/
		})
	}
	/*then add dragula fucntion*/
	dragula([document.getElementById('todo')]);
	dragula([document.getElementById('completed')]);
}

onTouchStart();

function observeDrop() {
	var targetNode = document.getElementById('todo');
	var childTargetNodes = targetNode.querySelectorAll('.mirror');
	console.log(data.todo)
	for (var i = 0; i < childTargetNodes.length; i++) {
		(function(index) {
		    childTargetNodes[i].addEventListener('touchend', function() {
				console.log(this);
				console.log(index)
				console.log(data.todo.reverse())
			})
		})(i);
	}
}

observeDrop()