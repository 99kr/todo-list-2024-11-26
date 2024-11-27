// skipped 2 of the "more complexity" tasks, since they are easy enough but not fitting

const todoTemplate = document.querySelector('#todo-template')
const todoContainer = document.querySelector('.todos')

const addForm = document.querySelector('.add-form')
const addFormInput = document.querySelector('.add-form input#add-form-input')

let todos = JSON.parse(localStorage.getItem('todos') ?? '[]')

function createTodo({ text, timestamp, completed }) {
	const todo = todoTemplate.content.cloneNode(true).children[0]

	const todoDetails = todo.querySelector('.todo-details')
	const textElement = todo.querySelector('.todo-details h4')
	const timestampElement = todo.querySelector('.todo-details p')

	textElement.innerText = text
	timestampElement.innerText = new Date(timestamp).toLocaleString('sv-SE')

	if (completed) {
		todo.classList.add('complete')
	}

	todoDetails.addEventListener('click', () => handleTodoComplete(timestamp, todo))

	const moveUpButton = todo.querySelector('.todo-movement button.up')
	const moveDownButton = todo.querySelector('.todo-movement button.down')

	moveUpButton.addEventListener('click', () => handleTodoMovement('up', timestamp, todo))
	moveDownButton.addEventListener('click', () => handleTodoMovement('down', timestamp, todo))

	const deleteButton = todo.querySelector('.todo-actions button.delete')
	const editButton = todo.querySelector('.todo-actions button.edit')

	deleteButton.addEventListener('click', () => handleTodoDelete(timestamp, todo))
	editButton.addEventListener('click', () => handleTodoEdit(timestamp, todo))

	todoContainer.insertAdjacentElement('afterbegin', todo)
}

const sortedTodos = todos.sort((a, b) => b.order - a.order)
for (const todo of sortedTodos) {
	createTodo(todo)
}
updateMovementInvalidations()

addForm.addEventListener('submit', (e) => {
	e.preventDefault()

	const newTodo = {
		text: addFormInput.value,
		timestamp: Date.now(),
		completed: false,
		order: -1, // will be incremented to 0 when the todo is added
	}

	todos.unshift(newTodo)
	incrementTodoOrders()

	localStorage.setItem('todos', JSON.stringify(todos))

	createTodo(newTodo)

	addFormInput.value = ''
	updateMovementInvalidations()
})

function updateMovementInvalidations() {
	const childrenTodos = todoContainer.querySelectorAll('.todo')
	childrenTodos.forEach((todo, index) => {
		const moveUpButton = todo.querySelector('.todo-movement button.up')
		const moveDownButton = todo.querySelector('.todo-movement button.down')

		moveUpButton.disabled = index === 0
		moveDownButton.disabled = index === todos.length - 1
	})
}

function incrementTodoOrders() {
	for (const todo of todos) {
		todo.order++
	}
}

function decrementTodoOrders(fromOrder) {
	for (const todo of todos) {
		if (todo.order <= fromOrder) continue

		todo.order--
	}
}

function handleTodoComplete(timestamp, todoElement) {
	const existingForm = todoElement.querySelector('.todo-details form')
	if (existingForm) return // if we are editing a todo, we don't want to complete it

	const index = todos.findIndex((todo) => todo.timestamp === timestamp)
	const isCompleted = todos[index].completed

	todos[index].completed = !isCompleted

	if (isCompleted) {
		todoElement.classList.remove('complete')
	} else {
		todoElement.classList.add('complete')
	}

	localStorage.setItem('todos', JSON.stringify(todos))
}

function handleTodoMovement(direction, timestamp, todoElement) {
	const todo = todos.find((todo) => todo.timestamp === timestamp)
	if (direction === 'up' && todo.order === 0) return
	if (direction === 'down' && todo.order === todos.length - 1) return
	let wantedOrder = todo.order

	if (direction === 'up') {
		wantedOrder--

		// increase the todos order with the one who has the wanted order so we can move the wanted order up
		for (const _todo of todos) {
			if (_todo.order === wantedOrder) {
				_todo.order++
			}
		}

		todoContainer.insertBefore(todoElement, todoElement.previousElementSibling)
	} else {
		wantedOrder++

		// decrease the todos order with the one who has the wanted order so we can move the wanted order down
		for (const _todo of todos) {
			if (_todo.order === wantedOrder) {
				_todo.order--
			}
		}

		/* insert before the next siblings next sibling, otherwise it would insert at same position it already is (with only 1 next sibling).
        the template element probably saves us here, since it's always last. but whatever */
		todoContainer.insertBefore(todoElement, todoElement.nextElementSibling.nextElementSibling)
	}

	todo.order = wantedOrder

	updateMovementInvalidations()

	localStorage.setItem('todos', JSON.stringify(todos))
}

function handleTodoDelete(timestamp, todoElement) {
	const index = todos.findIndex((todo) => todo.timestamp === timestamp)
	const deletedTodo = todos[index]

	todos.splice(index, 1)
	todoContainer.removeChild(todoElement)

	decrementTodoOrders(deletedTodo.order)

	localStorage.setItem('todos', JSON.stringify(todos))
}

function handleTodoEdit(timestamp, todoElement) {
	const index = todos.findIndex((todo) => todo.timestamp === timestamp)
	const editedTodo = todos[index]

	const existingForm = todoElement.querySelector('.todo-details form')
	if (existingForm) {
		// if we are editing a todo, just toggle back to tormal
		existingForm.outerHTML = `<h4>${editedTodo.text}</h4>`
		return
	}

	const formHTML = `
    <form class="edit-form">
        <input id="edit-form-input" type="text" value="${editedTodo.text}" />
        <input type="submit" value="Save" />
    </form>`
	todoElement.querySelector('.todo-details h4').outerHTML = formHTML

	const form = todoElement.querySelector('.todo-details form')
	const formInput = form.querySelector('#edit-form-input')

	formInput.focus()
	// remove value and setting it again to get the cursor to the end (why??)
	formInput.value = ''
	formInput.value = editedTodo.text

	form.addEventListener('submit', (e) => {
		e.preventDefault()

		const newText = form.querySelector('#edit-form-input').value
		editedTodo.text = newText

		form.outerHTML = `<h4>${newText}</h4>`
		localStorage.setItem('todos', JSON.stringify(todos))
	})
}
