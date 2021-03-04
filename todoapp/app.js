/* MODULE ONE */
//QUESTIONS: 
  //WHAT TO DEFINE "todo" AS? I AM TRYING TO MAKE IT DEFINED AS EACH ELEMENT OF THE ARRAY
  //LEFT DRAWER CLICK LISTENER WORKS, BUT IT ONLY CHANGES CLASS, WHAT ELSE SHOULD IT DO?
  //WHAT DOES .data() DO AND WHY IS IT REQUIRED TO MAKE THIS WORK

let allTodos; //= [
//   {title: "hardcode test", dueDate: "03-27-2021", description: "This is a test to see if a task will appear (HARD CODE)", isComplete: false},
//   {title: "Work", dueDate: "03-7-2021", description: "Go to work", isComplete: false},
//   {title: "Hi Basil", dueDate: "02-26-2021", description: "Say hi to Basil", isComplete: true},
//   {title: "Project", dueDate: "02-28-2021", description: "Complete TODOAPP project", isComplete: false},
//   {title: "Fifth Task", dueDate: "02-20-2021", description: "Some fifth thing but its done lol", isComplete: true},
//   {title: "Dentist", dueDate: "02-19-2021", description: "Go to dentist appointment", isComplete: true},
// ];

function createElementFromTodo(todo) {  
  let newTodo; 

  newTodo = $('<div class="todo">').html(todo.isComplete === false ? ` 
  <h3><span class="title">${todo.title}</span><span class="due-date">${todo.dueDate}, 5:00:00 PM</span></h3>
  <pre>${todo.description}</pre>
    <footer class="actions">
      <button class="action complete">Complete</button>
      <button class="action delete">Delete</button>
    </footer>
  </div>`
  :
  `
  <h3><span class="title">${todo.title}</span><span class="due-date">${todo.dueDate}, 5:00:00 PM</span></h3>
  <pre>${todo.description}</pre>
    <footer class="actions">
      <button class="action delete">Delete</button>
    </footer>
  </div>`);
  newTodo.data("todo", todo);
  return newTodo;

  // if (todo.isComplete === true) { // if complete
  //   newTodo =
  //   `<div class="todo">
  //     <h3><span class="title">${todo.title}</span><span class="due-date">${todo.dueDate}, 5:00:00 PM</span></h3>
  //     <pre>${todo.description}</pre>
  //     <footer class="actions">
  //       <button class="action delete">Delete</button>
  //     </footer>
  //   </div>`
  // } else { // if not complete
  //   newTodo =
  //   `<div class="todo">
  //     <h3><span class="title">${todo.title}</span><span class="due-date">${todo.dueDate}, 5:00:00 PM</span></h3>
  //     <pre>${todo.description}</pre>
  //     <footer class="actions">
  //       <button class="action complete">Complete</button>
  //       <button class="action delete">Delete</button>
  //     </footer>
  //   </div>`
  // }
  // newTodo.data("todo", todo)
  // return newTodo;
 
}

function renderTodos() {
    $('main .content').empty();
    // allTodos.forEach(function (todo) {
     
    //   if (todo.isComplete === true) {
    //     let completedTodo = createElementFromTodo(todo);
    //     $(".completed-todos").append(completedTodo)
    //   } else {
    //     let pendingTodo = createElementFromTodo(todo);
    //     $(".pending-todos").append(pendingTodo)
    //   }
    // })
    pendingTodos.forEach(function (todo) {
      let pending = createElementFromTodo(todo)
      $(".pending-todos").append(pending)
    })
    completedTodos.forEach(function (todo) {
      let completed = createElementFromTodo(todo)
      $(".completed-todos").append(completed)
    })
    expiredTodos.forEach(function (todo) {
      let expired = createElementFromTodo(todo)
      $('.expired-todos').append(expired)
    })
}

$(".left-drawer").click(function (event) {
  if ($(event.target).hasClass("left-drawer") === true) {
    $(".left-drawer").toggleClass("open");
  } else {}
})

/* MODULE TWO */
//QUESTIONS:
  //WHY DONT MODAL CLICK LISTENERS WORK? IT SHOULD PROBABLY BE MORE COMPLICATED BUT I DONT SEE WHY
  //WHAT IS THE IMPORTANCE OF THE RESET EVENT? THE CODE BREAKS WITH LINE 109 ADDED
  //WHAT DO I DO FOR THE COMPLETE FUNCTION

$(".add-todo").click(function (event) {
  $(".modal").addClass("open")
})

function createTodoFromForm() {
  
  let createdTodo = {
    title: $("#todo-title").val(),
    dueDate: $("#todo-due-date").val(),
    description: $("#todo-description").val(),
    isComplete: false,
  }
  return createdTodo;
}

$(".create-todo").click(function (event) {
  event.preventDefault();
  let addedTodo = createTodoFromForm($(".todo-form"));
  allTodos.unshift(addedTodo)
  storeData();
  $(".todo-form").trigger("reset")
  $(".modal").removeClass("open")
  threeBiggies();
})

$(".cancel-create-todo").click(function (event) {
  $(".modal").removeClass("open")
})

$('main').on('click', '.action.complete', function () { 
  let todoMove = $(this).closest('.todo')
  let data = todoMove.data()
  data.todo.isComplete = true;
  todoMove.slideUp(function () {
    threeBiggies();
  });
});

$('main').on('click', '.action.delete', function () { 
  let todoDelete = $(this).closest('.todo')
  let data = todoDelete.data();
  todoDelete.slideUp();
  storeData();
})

/* MODULE THREE */
//QUESTIONS:
  // ACTUALLY A LOT OF THIS IS WELL UNDERSTOOD
  // I JUST DONT UNDERSTAND WHY TODO IS NEEDED AS A PERAMITER OR WHAT PERAMITERS DO EXACTLY


let pendingTodos, completedTodos, expiredTodos;

function isCurrent(todo) {
  const todoDueDate = new Date(todo.dueDate);
  const now = new Date();

  return now < todoDueDate;
}

function splitTodos(todo) {
 
    pendingTodos = allTodos.filter(function (todo) {
      return !todo.isComplete && isCurrent(todo);
    })
    completedTodos = allTodos.filter(function (todo) {
      return todo.isComplete;
    })
    expiredTodos = allTodos.filter(function (todo) {
      return !todo.isComplete && !isCurrent(todo);
    })
}

/* MODULE FOUR */
//QUESTIONS:
  // STORE FUNCTION WORKS AS INTENDED EXCEPT WHEN AN ITEM IS DELETED
  // DELETED TASKS (NOT USING SIDEBAR) WILL REAPPEAR AFTER A PAGE REFRESH
  // I KNOW THIS CAN BE SOLVED WITH .indexOf() and .splice() BUT IDK HOW
  // DELETE ALL COMPLETED/EXPIRED WORK FINE, BUT JS DOES NOT WAIT FOR THE DELETED ONES TO FINISH SLIDING
  function storeData () {
  localStorage.setItem('allTodos', JSON.stringify(allTodos))
}

function fetchDefaultTodos () {
  let tutorial = [
    {title: "intro", dueDate: "03-20-2022", description: "Welcome to TODO.APP!", isComplete: false},
    {title: "Create New Task", dueDate: "03-20-2022", description: "To create a new task, press the + button on the left shoulder", isComplete: false},
    {title: "Pending Todos", dueDate: "03-7-2022", description: "'Pending' means your task is not yet complete nor expired. Use these as reminders!", isComplete: false},
    {title: "Completed Todos", dueDate: "02-26-2022", description: "If a TODO is in this column, that means it's done. Good job!", isComplete: true},
    {title: "Expired Todos", dueDate: "02-28-2020", description: "If a TODO is in this column, that means its due date has passed. Better luck next time.", isComplete: false},
    {title: "Other Buttons", dueDate: "02-20-2022", description: "The remaining two buttons on the left shoulder remove all completed and expired TODOs, respectively. You can probably guess which is which.", isComplete: true},
  ];
  return tutorial;
}

function retrieveData() {
  allTodos = JSON.parse(localStorage.getItem('allTodos')) || fetchDefaultTodos()
}

function threeBiggies() {
  storeData();
  splitTodos();
  renderTodos();
}

$(".remove-completed").click(function (event) {
  event.preventDefault();

  let completedAll = $(".completed-todos").children();
  completedAll.slideUp();

  noCompletedTodos = allTodos.filter(function (todo) {
    return !todo.isComplete;
  })
  allTodos = noCompletedTodos;
  storeData();
})

function splitTodos(todo) { //delete this after
 
  pendingTodos = allTodos.filter(function (todo) {
    return !todo.isComplete && isCurrent(todo);
  })
  completedTodos = allTodos.filter(function (todo) {
    return todo.isComplete;
  })
  expiredTodos = allTodos.filter(function (todo) {
    return !todo.isComplete && !isCurrent(todo);
  })
}

$(".remove-expired").click(function (event) {
  event.preventDefault();

  let expiredAll = $(".expired-todos").children();
  expiredAll.slideUp();

  noExpiredTodos = allTodos.filter(function (todo) {
    return !todo.isCurrent;
  })
  allTodos = noExpiredTodos;
  storeData();
})

retrieveData();
splitTodos();
renderTodos();

// broken keys to copypaste: , < ` 