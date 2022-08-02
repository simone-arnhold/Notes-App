const addBtn = document.getElementById("add")

const notes = JSON.parse(localStorage.getItem("notes"))

if (notes) {
  //in local storage
  notes.forEach((note) => addNewNote(note))
}

addBtn.addEventListener("click", () => addNewNote())

function addNewNote(text = "") {
  const note = document.createElement("div")
  note.classList.add("note")

  note.innerHTML = `
    <div class="tools">
        <button class="edit"><i class="fa-solid fa-pencil"></i></button>
        <button class="delete"><i class="fa-solid fa-x"></i></button>
    </div>
    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>
    `
  // IF text == none then text has class hidden
  // then
  // IF there is text then have class hidden hide the text area, else have no class

  const editBtn = note.querySelector(".edit")
  const deleteBtn = note.querySelector(".delete")
  const main = note.querySelector(".main")
  const textArea = note.querySelector("textarea")

  textArea.value = text
  main.innerHTML = marked(text)

  deleteBtn.addEventListener("click", () => {
    note.remove()
    updateLS()
  })

  editBtn.addEventListener("click", () => {
    main.classList.toggle("hidden")
    textArea.classList.toggle("hidden")
  })

  textArea.addEventListener("input", (e) => {
    const { value } = e.target

    main.innerHTML = marked(value)

    updateLS()
  })

  // add something inside body
  document.body.appendChild(note)
  console.log("clicked add button")
}

function updateLS() {
  //LS = local storage
  const notesText = document.querySelectorAll("textarea")

  const notes = []

  notesText.forEach((note) => notes.push(note.value))

  // console.log(notes)
  localStorage.setItem("notes", JSON.stringify(notes))
}

// // UPDATE LS
// localStorage.setItem("name", "Brad")
// localStorage.getItem("name")
// localStorage.removeItem("name")
// // JSON
// localStorage.setItem("name", JSON.stringify())
// JSON.parse(localStorage.getItem("name"))
