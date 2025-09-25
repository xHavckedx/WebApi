document.addEventListener("DOMContentLoaded", () => {
  const btnList = document.getElementById("btn-list");
  const output = document.getElementById("output");
  const btnToggle = document.getElementById("btn-toggle-form");
  const addForm = document.getElementById("add-form");
  const btnAdd = document.getElementById("btn-add");
  const addResult = document.getElementById("add-result");

  btnList.addEventListener("click", async () => {
    output.textContent = "Cargando...";
    try {
      const res = await fetch("/api/users");
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data = await res.json();
      output.textContent = JSON.stringify(data, null, 2);
    } catch (err) {
      output.textContent = "Error al obtener usuarios: " + err;
    }
  });

  btnToggle.addEventListener("click", () => {
    addForm.style.display = addForm.style.display === "none" ? "block" : "none";
  });

  btnAdd.addEventListener("click", async () => {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    if (!name || !email) {
      addResult.textContent = "Rellena ambos campos.";
      return;
    }
    addResult.textContent = "Enviando...";
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email })
      });
      if (!res.ok) {
        const t = await res.text();
        throw new Error(`${res.status} ${t}`);
      }
      const created = await res.json();
      addResult.textContent = "Usuario creado: " + JSON.stringify(created);
      // opcional: actualizar la lista automáticamente
      const listRes = await fetch("/api/users");
      const list = await listRes.json();
      document.getElementById("output").textContent = JSON.stringify(list, null, 2);
      addForm.reset();
    } catch (err) {
      addResult.textContent = "Error al crear usuario: " + err;
    }
  });
});
