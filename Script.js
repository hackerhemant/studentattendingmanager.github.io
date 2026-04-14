let students = JSON.parse(localStorage.getItem("students")) || [];

function saveData() {
  localStorage.setItem("students", JSON.stringify(students));
}

function render() {
  let tbody = document.getElementById("studentList");
  tbody.innerHTML = "";

  students.forEach((s, index) => {
    let percent =
      s.total === 0 ? 0 : ((s.present / s.total) * 100).toFixed(2);

    tbody.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${s.name}</td>
        <td>
          <button class="btn-present" onclick="markPresent(${index})">
            Present
          </button>
        </td>
        <td>
          <button class="btn-absent" onclick="markAbsent(${index})">
            Absent
          </button>
        </td>
        <td>${percent}%</td>
        <td>
          <button class="btn-remove" onclick="removeStudent(${index})">
            ❌
          </button>
        </td>
      </tr>
    `;
  });
}

function addStudent() {
  let input = document.getElementById("studentName");
  let name = input.value.trim();

  if (name === "") return;

  // Check if student exists (case-insensitive)
  let existingIndex = students.findIndex(
    (s) => s.name.toLowerCase() === name.toLowerCase()
  );

  if (existingIndex !== -1) {
    // Student exists, just focus row
    document.querySelectorAll("#studentList tr")[existingIndex].scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
    input.value = "";
    return;
  }

  // Add new student
  students.push({
    name: name,
    present: 0,
    total: 0
  });

  saveData();
  render();
  input.value = "";
}

function markPresent(i) {
  students[i].present++;
  students[i].total++;
  saveData();
  render();
}

function markAbsent(i) {
  students[i].total++;
  saveData();
  render();
}

function removeStudent(i) {
  students.splice(i, 1);
  saveData();
  render();
}

render();