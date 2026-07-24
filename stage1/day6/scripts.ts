export {};
("use strict");

// Data Dummy

interface StudentType {
  name: string;
  class: string;
  score: number;
}

const students: StudentType[] = [
  { name: "Rover", class: "Fullstack-dev", score: 95 },
  { name: "Jinhsi", class: "Mobile-dev", score: 98 },
  { name: "Yinlin", class: "Dev-ops", score: 88 },
  { name: "Jiyan", class: "Backend-dev", score: 92 },
  { name: "Verina", class: "Frontend-dev", score: 85 },
  { name: "Calcharo", class: "Fullstack-dev", score: 78 },
  { name: "Encore", class: "UI/UX", score: 90 },
  { name: "Sanhua", class: "Backend-dev", score: 82 },
  { name: "Baizhi", class: "Data Science", score: 89 },
  { name: "Jianxin", class: "Mobile-dev", score: 94 },
];

// dom (ambil element yang di butuhkan)
const wadahTable = document.getElementById("studentTableBody") as HTMLTableSectionElement;
const kolomCari = document.getElementById("searchInput") as HTMLInputElement;
const teksRataRata = document.getElementById("averageScore") as HTMLElement;

/**

 * @param {Array} daftarMurid 
 */
function hitungRataRata(daftarMurid: StudentType[]): void {
  if (daftarMurid.length === 0) {
    teksRataRata.innerText = "0";
    return;
  }

  const totalNilai = daftarMurid.reduce((total: number, murid: StudentType) => {
    return total + murid.score;
  }, 0);

  const rataRata = totalNilai / daftarMurid.length;
  teksRataRata.innerText = rataRata.toFixed(2);
}

function gambarTable(daftarMurid: StudentType[]): void {
  const barisTabel = daftarMurid.map((murid: StudentType, indeks: number) => {
    return /*html*/ `
            <tr>
                <td>${indeks + 1}</td>
                <td class="fw-semibold">${murid.name}</td>
                <td><span class="badge bg-secondary">${murid.class}</span></td>
                <td class="fw-bold text-success">${murid.score}</td>
            </tr>
        `;
  });

  wadahTable.innerHTML = barisTabel.join("");

  // Otomatis hitung rata-rata setiap kali tabel digambar
  hitungRataRata(daftarMurid);
}

kolomCari.addEventListener("input", function (event: Event) {
  const target = event.target as HTMLInputElement;
  const kataKunci = target.value.toLowerCase().trim();

  // Menggunakan .filter() untuk menyaring nama
  const hasilCari = students.filter((murid: StudentType) => {
    return murid.name.toLowerCase().includes(kataKunci);
  });

  gambarTable(hasilCari);
});

// Jalankan pertama kali saat aplikasi dibuka
gambarTable(students);
