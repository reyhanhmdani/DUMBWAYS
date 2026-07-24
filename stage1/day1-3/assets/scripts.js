const form = document.getElementById("guestbookForm");
const inputName = document.getElementById("inputName");
const inputMessage = document.getElementById("inputMessage");
const messageList = document.getElementById("messageList");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // disini fungsinya yaitu untuk menahan browser melakukan refresh automatis, sehingga menahan data supaya tidak hilang

  const nameValue = inputName.value;
  const messageValue = inputMessage.value;

  const newListItem = document.createElement("li");
  newListItem.innerHTML = `<strong>${nameValue}</strong>: "${messageValue}"`;

  // memasukkan element baru ke dalam list kita
  messageList.appendChild(newListItem);

  form.reset();
});
