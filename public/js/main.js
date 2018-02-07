var data=localStorage.getItem("todoList")?JSON.parse(localStorage.getItem("todoList")):{todo:[],completed:[]};function renderTodoListToHTML(){if(0==data.completed.length&&0==data.todo.length);else{for(var e=0;e<data.todo.length;e++){addItemTodo(data.todo[e])}for(var t=0;t<data.completed.length;t++){addItemTodo(data.completed[t],!0)}}onTouchStart()}function dataObjectUpdated(){localStorage.setItem("todoList",JSON.stringify(data))}function addItemTodo(e,t){var o=t?document.getElementById("completed"):document.getElementById("todo"),d=document.createElement("div");d.classList.add("container"),d.classList.add("mirror"),d.setAttribute("id","container"),d.style.opacity=0;var a='<div class="row">                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">                            <div class="content">                                <ul class="items">                                \t<li class="item">                                        <i class="fa fa-bars fa-1x handle" aria-hidden="true"></i>                                    </li>                                    <li class="item">                                        <p class="text" id="text">'+e+'</p>                                    </li>                                    <li class="item delete">                                        <a id="delete" class="deleteButton"><i class="fa fa-trash-o fa-2x" aria-hidden="true"></i></a>                                    </li>                                    <li class="item check">                                       <button id="check" class="checkButton"><i class="fa fa-check-circle-o fa-2x" aria-hidden="true"></i></button>                                    </li>                                </ul>                            </div>                        </div>\t                </div>';d.innerHTML=a,o.insertBefore(d,o.childNodes[0]),fadeIn(d);for(var n=document.getElementsByClassName("deleteButton"),i=0;i<n.length;i++)n[i].addEventListener("click",removeItem);var l=document.getElementsByClassName("checkButton");for(i=0;i<l.length;i++)l[i].addEventListener("click",completeItem)}function completeItem(){var e=this.parentNode.parentNode.querySelector("#text").innerText,t=this.closest("#container"),o=t.parentNode.id;this.setAttribute("disabled",!0),"todo"===o?(data.todo.splice(data.todo.indexOf(e),1),data.completed.push(e)):(data.completed.splice(data.completed.indexOf(e),1),data.todo.push(e)),fadeOut(this,t,"todo"==o?document.getElementById("completed"):document.getElementById("todo"),!0),dataObjectUpdated()}function removeItem(){var e=this.closest("#container"),t=e.parentNode.id,o=this.parentNode.parentNode.querySelector("#text").innerText;"todo"===t?data.todo.splice(data.todo.indexOf(o),1):data.completed.splice(data.completed.indexOf(o),1),fadeOut(!1,e,!1,!1),dataObjectUpdated()}function fadeOut(e,t,o,d){var a=setInterval(function(){(n-=.1)<=0&&(clearInterval(a),!0===d?(o.insertBefore(t,o.childNodes[0]),fadeIn(t),e.removeAttribute("disabled")):t.remove()),t.style.opacity=n},40),n=1}function fadeIn(e){var t=setInterval(function(){(o+=.1)>=1&&(clearInterval(t),o=1),e.style.opacity=o},40),o=.1}function intro(){var e=document.getElementById("intro"),t=document.getElementById("todo-app");setTimeout(function(){e.style.display="none",t.style.display="block"},2e3)}function onTouchStart(){var e,t,o,d,a=document.querySelectorAll(".mirror"),n=!1,i=800;function l(a){a.preventDefault(),d=this,o||(t=setTimeout(e,i),o=!0)}function c(){t&&(clearTimeout(t),o=!1),observeDrop(this)}for(var r=0;r<a.length;r++)a[r].addEventListener("touchstart",function(){this.removeAttribute("style")}),a[r].querySelector(".handle").addEventListener("touchstart",l,!1),a[r].querySelector(".handle").addEventListener("touchend",c,!1);e=function(){var e="todo"==d.closest("#container").parentNode.getAttribute("id")?d.closest("#container").offsetTop-window.scrollY+130:d.closest("#container").offsetTop+document.querySelector("#todo").offsetHeight-window.scrollY+170;n=!0,s.lift(d),u.lift(d);var t=document.querySelector(".gu-mirror");t.style.top=e+"px",t.style.left="20px",vibrate()};var s=dragula([document.getElementById("todo")],{moves:function(e,t,o){if(n)return n=!1,o.classList.contains("handle")}}),u=dragula([document.getElementById("completed")],{moves:function(e,t,o){if(n)return n=!1,o.classList.contains("handle")}})}function observeDrop(e){var t=e.closest("#container").parentNode,o=t.querySelectorAll(".container");if("todo"==t.getAttribute("id")){console.log("if on todo",t.querySelectorAll(".container")),data.todo=[];for(var d=0;d<o.length;d++)data.todo.unshift(o[d].querySelector(".text").innerText)}else{data.completed=[];for(d=0;d<o.length;d++)data.completed.unshift(o[d].querySelector(".text").innerText)}dataObjectUpdated()}function vibrate(){console.log(navigator.vibrate),navigator.vibrate(100)}renderTodoListToHTML(),document.getElementById("add").addEventListener("click",function(){var e=document.getElementById("item").value;e&&(addItemTodo(e),document.getElementById("item").value="",data.todo.push(e),dataObjectUpdated(),onTouchStart())}),document.getElementById("item").addEventListener("keydown",function(e){var t=this.value;(13===e.keyCode&&t||13===e.keyCode&&t)&&(addItemTodo(t),document.getElementById("item").value="",data.todo.push(t),dataObjectUpdated(),onTouchStart())}),intro(),document.addEventListener("deviceready",vibrate,!1),d;