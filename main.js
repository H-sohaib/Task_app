let tasksArray = new Array();
let input = document.querySelector(".input");
let tasksDiv = document.querySelector(".tasks");

if (window.localStorage.length != 0) {
  let data = JSON.parse(window.localStorage.getItem("tasks"));
  if (data != null) {
    tasksArray = data;
  }
  console.log(tasksArray);
  addTaskToPage(tasksArray);
}
// add task
document.querySelector(".add").onclick = (e) => {
  if (input.value !== "") {
    let task = {
      id: Date.now(),
      textTask: input.value,
      completed: false,
    };
    console.log(task);
    tasksArray.push(task);
    console.log(tasksArray);
    addTaskToPage(tasksArray);
    addToLocalStorage(tasksArray);
    input.value = "";
  }
};

function addToLocalStorage(array) {
  window.localStorage.clear();
  window.localStorage.setItem("tasks", JSON.stringify(array));
}

// add task to page function ********************************
function addTaskToPage(tasksArray) {
  if (tasksArray != null) {
    // remove all task first
    tasksDiv.innerHTML = "";
    tasksArray.forEach((task) => {
      // create delete button
      let delBtn = document.createElement("button");
      delBtn.className = "btn";
      delBtn.append("Delete");
      // create paragraphe task
      let taskP = document.createElement("span");
      taskP.append(task.textTask);
      // create task div
      let taskDiv = document.createElement("div");
      taskDiv.classList.add("task");
      taskDiv.setAttribute("data-id", `${task.id}`);
      taskDiv.append(taskP, delBtn);
      // append task to tasks div
      tasksDiv.prepend(taskDiv);

      task.completed ?
        (taskDiv.style.opacity = "0.5") :
        (taskDiv.style.opacity = "1");
    });
  }
}

document.addEventListener("click", (task) => {
  if (task.target.className === "task") {
    let id = task.target.getAttribute("data-id");
    tasksArray.forEach((elem) => {
      if (elem.id == id) {
        elem.completed ? (elem.completed = false) : (elem.completed = true);
      }
    });
    addTaskToPage(tasksArray);
    addToLocalStorage(tasksArray);
  }
});

document.addEventListener("click", (btn) => {
  if (btn.target.className === "btn") {
    let delID = btn.target.parentElement.getAttribute("data-id");
    // console.log(delID);
    let index = 0;
    tasksArray.forEach((t) => {
      if (t.id == delID) {
        tasksArray.splice(index, 1);
        addToLocalStorage(tasksArray);
        addTaskToPage(tasksArray);
      } else {
        index++;
      }
    });
  }
});

// let tasksDiv = document.querySelector(".tasks");
// let taskList = [];
// let id = 0;
// let max = 0;

// // delete task from locale Storage function ***********************
// function deletefromLocaleStorage(task) {
//   // let deletId;
//   for (let i = 0; i < window.localStorage.length; i++) {
//     if (window.localStorage.length === 1) {
//       window.localStorage.clear();
//       id = 0;
//     }
//     if (window.localStorage.getItem(window.localStorage.key(i)) === task) {
//       console.log(task);
//       window.localStorage.removeItem(window.localStorage.key(i));
//       deletedTaskId = window.localStorage.key(i);
//     }
//   }
//   for (let i = 0; i < window.localStorage.length; i++) {
//     let testId = window.localStorage.key(i);
//     if (
//       testId > deletedTaskId &&
//       testId < deletedTaskId + 2 &&
//       testId !== null
//     ) {
//       console.log(testId);
//       let recovredTask = window.localStorage.getItem(testId);
//       console.log(recovredTask);
//       window.localStorage.removeItem(testId);
//       window.localStorage.setItem(`${testId - 1}`, recovredTask);
//       deletedTaskId++;
//     }
//     if ((i = window.localStorage.length - 1)) {
//       window.location.reload();
//     }
//   }
// }
// // *********************************************************
// if (window.localStorage.length !== 0) {
//   // get the max id in locale storage ******************
//   for (let i = 0; i < window.localStorage.length; i++) {
//     if (window.localStorage.key(i) !== null) {
//       max < window.localStorage.key(i)
//         ? (max = window.localStorage.key(i))
//         : console.log("max wins");
//     }
//   }
//   id = max;
//   console.log(`max id is : ${max}`);
//   // get task from locale storage **********************************
//   for (let i = 0; i <= id; i++) {
//     if (window.localStorage.key(i) !== null) {
//       taskList.push(window.localStorage.getItem(window.localStorage.key(i)));
//     }
//   }
//   console.log(taskList);
// }

// // -*******************************************************

// // add task writed to localstorage function *************
// function addTaskToLocaleStorage(task) {
//   window.localStorage.setItem(`${id}`, task);
//   id++;
// }
// // ******************************************************

// // add task function ************************************
// let addTask = document.querySelector(".add");
// let input = document.querySelector(".input");

// addTask.addEventListener("click", function () {
//   addTask.style.border = "1px solid black";
//   window.setTimeout(function () {
//     addTask.style.border = "0";
//   }, 70);
//   if (input.value !== "") {
//     taskList.push(input.value);
//     addTaskToPage(input.value);
//     addTaskToLocaleStorage(input.value);
//     input.value = "";
//   }
// });
// // *******************************************************

// // show the tasks page ****************
// console.log(taskList);
// taskList.forEach(function (task) {
//   addTaskToPage(task);
// });

// delete task ********************************************
// deletebtn = document.querySelectorAll(".task .btn");
// console.log(deletebtn);
// deletebtn.forEach(function (btn) {
//   btn.onclick = function () {
//     this.style.outline = "3px solid black";
//     window.setTimeout(function () {
//       this.style.outline = "0";
//     }, 70);
//     console.log(this);
//     deletefromLocaleStorage(this.previousElementSibling.textContent);
//     this.parentElement.remove();
//     console.log("removed task");
//   };
// });

// // *********************************************************