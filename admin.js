```javascript
const firebaseConfig = {
  apiKey: "AIzaSyBRWneqrJvOZsekAqVd6Q__R8byzgL2BnA",
  authDomain: "skin-care-3e3e0.firebaseapp.com",
  projectId: "skin-care-3e3e0",
  storageBucket: "skin-care-3e3e0.firebasestorage.app",
  messagingSenderId: "93538056876",
  appId: "1:93538056876:web:7f0e59cc228f583fa57d09",
  measurementId: "G-RY14NLKEJ5"
};

const ADMIN_UID = "dNA7u3qgkuTptF5Qrav6sDetNe53";

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

auth.onAuthStateChanged(async (u) => {
  if (!u) {
    deny();
    return;
  }

  document.getElementById("adminEmail").textContent = u.email || "";

  if (u.uid !== ADMIN_UID) {
    deny();
    return;
  }

  document.getElementById("loading").classList.add("hidden");
  document.getElementById("dashboard").classList.remove("hidden");

  loadUsers();
  loadMessages();
});

async function loadUsers() {
  const t = document.getElementById("users");

  try {
    const s = await db.collection("users").get();

    document.getElementById("usersCount").textContent = s.size;

    if (!s.size) {
      t.innerHTML = '<tr><td colspan="4">No users found.</td></tr>';
      return;
    }

    let h = "";

    s.forEach((x) => {
      const u = x.data();

      const d = u.createdAt?.toDate
        ? u.createdAt.toDate().toLocaleString()
        : "Unknown";

      h += `
        <tr>
          <td>${esc(u.name || "No name")}</td>
          <td>${esc(u.email || "No email")}</td>
          <td>${esc(u.contact || "No contact")}</td>
          <td>${d}</td>
        </tr>
      `;
    });

    t.innerHTML = h;

  } catch (e) {
    console.error(e);

    t.innerHTML =
      '<tr><td colspan="4">Unable to load users. Check Firestore Rules.</td></tr>';
  }
}

async function loadMessages() {
  const box = document.getElementById("messages");

  try {
    const s = await db.collection("messages").get();

    document.getElementById("messagesCount").textContent = s.size;

    if (!s.size) {
      box.innerHTML = "<p>No messages received yet.</p>";
      return;
    }

    const a = [];

    s.forEach((x) => {
      a.push(x.data());
    });

    a.sort(
      (x, y) =>
        (y.createdAt?.toMillis?.() || 0) -
        (x.createdAt?.toMillis?.() || 0)
    );

    box.innerHTML = a
      .map((m) => {
        const d = m.createdAt?.toDate
          ? m.createdAt.toDate().toLocaleString()
          : "Unknown";

        return `
          <div class="message">

            <div class="top">

              <div>
                <div class="name">
                  ${esc(m.name || "Website User")}
                </div>

                <div class="email">
                  ${esc(m.userEmail || m.email || "No email")}
                </div>
              </div>

              <div class="date">
                ${d}
              </div>

            </div>

            <div class="subject">
              ${esc(m.subject || "No subject")}
            </div>

            <div class="text">
              ${esc(m.message || "No message")}
            </div>

          </div>
        `;
      })
      .join("");

  } catch (e) {
    console.error(e);

    box.innerHTML =
      "<p>Unable to load messages. Check Firestore Rules.</p>";
  }
}

function esc(v) {
  return String(v)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function logout() {
  await auth.signOut();
  location.href = "index.html";
}

document.getElementById("logout").onclick = logout;

function deny() {
  document.getElementById("loading").classList.add("hidden");
  document.getElementById("dashboard").classList.add("hidden");
  document.getElementById("denied").classList.remove("hidden");
}
```