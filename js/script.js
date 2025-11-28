const form = document.getElementById("form-tugas");
const tbody = document.getElementById("tbody");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nama = document.getElementById("namatugas").value.trim();
  const desk = document.getElementById("deskripsitugas").value.trim();
  const tanggal = document.getElementById("tanggaltugas").value;
  const statusValue = document.getElementById("status").value;

  //  Validasi Data
  if (!nama || !desk || !tanggal || !statusValue) {
    alert("Semua data harus diisi!");
    return;
  }

  if (!isNaN(nama)) {
    alert("Nama tugas harus berupa teks, bukan angka!");
    return;
  }

  if (!isNaN(desk)) {
    alert("Deskripsi harus berupa teks!");
    return;
  }

  if (isNaN(Date.parse(tanggal))) {
    alert("Tanggal tidak valid!");
    return;
  }

  if (statusValue === "" || statusValue === null) {
    alert("Silakan pilih status!");
    return;
  }
  //   selelsai validasi data

  //  cek status
  let statusText = "";
  if (statusValue === "bs") statusText = "Belum Selesai";
  if (statusValue === "p") statusText = "Proses";
  if (statusValue === "s") statusText = "Selesai";
  //   selesai cek status

  // Tambah data ke tabel
  const tr = document.createElement("tr");
  tr.innerHTML = `
        <td>${nama}</td>
        <td>${desk}</td>
        <td>${tanggal}</td>
        <td>${statusText}</td>
        <td><button class="hapus-btn">Hapus</button></td>
    `;

  tbody.appendChild(tr);
  //   selesai tambah data ke tabel

  // Reset form setelah tambah
  form.reset();

  // Tombol hapus
  tr.querySelector(".hapus-btn").addEventListener("click", () => {
    tr.remove();
  });
});
document.getElementById("hapus-semua").addEventListener("click", function () {
  let konfirmasi = confirm("Yakin ingin menghapus semua data?");
  if (konfirmasi) {
    document.getElementById("tbody").innerHTML = "";
  }
});
// Filter tugas
document.getElementById("filterInput").addEventListener("keyup", function () {
  let filter = this.value.toLowerCase();
  let rows = document.querySelectorAll("#tbody tr");

  rows.forEach((row) => {
    let text = row.textContent.toLowerCase();

    if (text.includes(filter)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
});
