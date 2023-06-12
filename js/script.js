const form = document.forms.form
const change_form = document.forms.change
const tbody = document.querySelector("table tbody")
const change_input = change_form.querySelector("input")
const change_age = change_form.querySelector(".modal .age")
const modal = document.querySelector(".modal-bg")
const close_btn = document.querySelector(".close")
const year = new Date().getFullYear()
let globalId;
let arr = []

form.onsubmit = (event) => {
	event.preventDefault()

	let values = {
		id: arr.length + 1
	}

	let fm = new FormData(event.target)
	fm.forEach((value, key) => {
		values[key] = value
	})
	values.age = year - values.age

	arr.push(values)
	reload(arr)
}



reload(arr)
function reload(data) {
	tbody.innerHTML = ""
	for (const item of data) {

		const tr = document.createElement("tr")
		const id = document.createElement("td")
		const name = document.createElement("td")
		const age = document.createElement("td")
		const action = document.createElement("td")
		const edit_img = document.createElement("img")
		const delete_img = document.createElement("img")

		id.textContent = item.id
		name.textContent = item.name
		age.textContent = item.age
		edit_img.src = "./img/edit.png"
		delete_img.src = "./img/trash.svg"


		tbody.append(tr)
		tr.append(id, name, age, action)
		action.append(edit_img, delete_img)


		delete_img.onclick = () => {
			arr = arr.filter(el => el.id !== item.id)
			for (let i = 0; i <= arr.length - 1; i++) {
				arr[i].id = i + 1
			}
			reload(arr)
		}

		edit_img.onclick = () => {
			modal.style.display = "flex"
			change_input.value = item.name
			change_age.value = item.age
			globalId = item.id
		}
		close_btn.onclick = () => {
			close()
		}
	}
}

function close() {
	change_form.classList.add("close-anim")
	setTimeout(() => {
		modal.style.display = "none"
		change_form.classList.remove("close-anim")
	}, 500);
	reload(arr)
	change_input.value = ""
	change_age.value = ""
}


change_form.onsubmit = (event) => {
	event.preventDefault()
	let finded = arr.forEach(el => el.id === globalId)
	console.log(finded);
	finded.name = change_input.value
	finded.age = change_age.value
	close()
}