// Анкета гостя. Пока ответы только выводятся в консоль —
// отправку добавим позже в submitRsvp.

const rsvpForm = document.querySelector(".rsvp__form");
const attendingBlock = rsvpForm.querySelector(".rsvp__attending");
const partnerField = rsvpForm.querySelector(".rsvp__partner");
const rsvpError = rsvpForm.querySelector(".rsvp__error");
const rsvpThanks = rsvpForm.querySelector(".rsvp__thanks");

// Скрытый блок выключаем, чтобы его поля не попали в ответ
function toggleBlock(block, visible) {
  block.hidden = !visible;
  block.querySelectorAll("input").forEach((input) => {
    input.disabled = !visible;
  });
}

// Вопросы о спутнике и трансфере нужны, только если гость придёт,
// а поле для имени спутника — только если он будет с +1
function updateVisibility() {
  const attending = rsvpForm.elements.attendance.value === "yes";
  toggleBlock(attendingBlock, attending);
  toggleBlock(
    partnerField,
    attending && rsvpForm.elements.company.value === "plus-one",
  );
}

function collectAnswers() {
  const data = new FormData(rsvpForm);
  return {
    name: data.get("name").trim(),
    attendance: data.get("attendance"),
    company: data.get("company"),
    partner: data.get("partner")?.trim() || null,
    transfer: data.get("transfer"),
    message: data.get("message").trim(),
  };
}

function submitRsvp(answers) {
  console.log("Ответ на анкету:", answers);
}

function showError(text) {
  rsvpError.textContent = text;
  rsvpError.hidden = false;
  rsvpThanks.hidden = true;
}

rsvpForm.addEventListener("change", () => {
  updateVisibility();
  rsvpError.hidden = true;
});

rsvpForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const answers = collectAnswers();

  if (!answers.name || !answers.attendance) {
    showError("Пожалуйста, укажите ФИО и ответьте, сможете ли прийти.");
    return;
  }

  if (answers.company === "plus-one" && !answers.partner) {
    showError("Пожалуйста, укажите ФИО спутника.");
    return;
  }

  rsvpError.hidden = true;
  submitRsvp(answers);
  rsvpForm.reset();
  updateVisibility();
  rsvpThanks.hidden = false;
});

updateVisibility();
