const API = "http://localhost:8080";

/* ================= SIGNUP ================= */
async function signup() {
    const res = await fetch(`${API}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: name.value,
            email: email.value,
            password: password.value
        })
    });

    const data = await res.json();
    alert("Signup done");
}

/* ================= LOGIN ================= */
async function login() {
    const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: email.value,
            password: password.value
        })
    });

    const data = await res.json();

    localStorage.setItem("token", data.token);

    authBox.style.display = "none";
    app.style.display = "block";

    loadSeats();
}

/* ================= LOGOUT ================= */
function logout() {
    localStorage.removeItem("token");
    location.reload();
}

/* ================= LOAD SEATS ================= */
async function loadSeats() {
    const res = await fetch(`${API}/seats`);
    const seats = await res.json();

    const tbl = document.getElementById("tbl");
    tbl.innerHTML = "";

    let tr;

    seats.sort((a, b) => a.id - b.id).forEach((seat, i) => {
        if (i % 8 === 0) tr = document.createElement("tr");

        const td = document.createElement("td");

        const base =
            "w-24 h-24 text-xl font-bold rounded-xl cursor-pointer transition";

        if (seat.isbooked) {
            td.className = base + " bg-red-500/30 cursor-not-allowed";
            td.innerText = seat.id;
        } else {
            td.className = base + " bg-green-500 hover:scale-105";
            td.innerText = seat.id;

            td.onclick = () => bookSeat(seat.id);
        }

        tr.appendChild(td);
        tbl.appendChild(tr);
    });
}

/* ================= BOOK SEAT ================= */
async function bookSeat(id) {
    const res = await fetch(`${API}/book/${id}`, {
        method: "PUT",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    });

    const data = await res.json();

    if (data.error) {
        alert("Already booked!");
    } else {
        alert("Booked successfully");
        loadSeats();
    }
}

/* auto login restore */
if (localStorage.getItem("token")) {
    authBox.style.display = "none";
    app.style.display = "block";
    loadSeats();
}