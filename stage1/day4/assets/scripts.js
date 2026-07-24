const form = document.getElementById("expenseForm");
const inputName = document.getElementById("expenseName");
const inputNominal = document.getElementById("expenseAmount");
const expensesList = document.getElementById("expensesList");
const totalExpenses = document.getElementById("totalExpenses");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function updateStorageAndRender() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
  renderPengeluaran();
}

function renderPengeluaran() {
  expensesList.innerHTML = ""; // ini mencegah menduplikat data lama ke halaman tapi tidak di data local nya . . .
  let total = 0;

  for (let i = 0; i < expenses.length; i++) {
    let item = expenses[i];
    total = total + item.amount;

    // Buat Container List Item nya
    const newListItem = document.createElement("li");
    newListItem.className = "list-group-item px-0 py-3 d-flex justify-content-between align-items-center";

    // Harga dan Tombol
    const rightContainer = document.createElement("div");
    rightContainer.className = "d-flex align-items-center gap-3";

    // kita masukkan teks nama dan harga
    newListItem.innerHTML = `<span class="text-dark fw-semibold small">${item.name}</span>`;
    rightContainer.innerHTML = `<span class="fw-bold text-danger small">Rp ${Number(item.amount).toLocaleString("id-ID")}</span>`;

    // Tombol untuk delete Item
    const deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-danger btn-sm";
    deleteButton.innerHTML = `<i class="fa-solid fa-trash"></i>`;

    deleteButton.addEventListener("click", function () {
      // cara lama
      // expenses.splice(i, 1);

      // cara baru karna kita ambil per id yang cocok dengan id yang kita klik
      expenses = expenses.filter((expense) => expense.id !== item.id);
      updateStorageAndRender();
    });

    // panggil semua elemen tadi jadi satu
    rightContainer.appendChild(deleteButton);
    newListItem.appendChild(rightContainer);
    expensesList.appendChild(newListItem);
  }

  totalExpenses.innerText = `Rp ${Number(total).toLocaleString("id-ID")}`;
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const nameValue = inputName.value;
  const nominalValue = Number(inputNominal.value); // konversi ke angka/number

  // validasi kalau input ga boleh kosong, dan memakai trim, supaya user ga bisa isen kalau "   " . . .q
  if (nameValue.trim() === "" || nominalValue <= 0) {
    alert("isi dulu bro");
  } else {
    const newExpense = {
      id: Date.now(),
      name: nameValue,
      amount: nominalValue,
    };

    expenses.push(newExpense);
    updateStorageAndRender();
    form.reset();
  }
});

// Panggil fungsi ini agar data dirender saat halaman pertama kali dibuka / direfresh
renderPengeluaran();
