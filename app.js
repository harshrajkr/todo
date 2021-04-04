const button = document.querySelector(".submit-name");
const sec1 = document.querySelector(".intro");
const sec2 = document.querySelector(".inner");
const inputName = document.querySelector(".intro-name");
const todoName = document.querySelector(".p-name");

document.addEventListener("DOMContentLoaded", hideUnhide);
document.addEventListener("DOMContentLoaded", nameGen);
button.addEventListener("click", nameSubmittion);

function nameSubmittion(e) {
    const name = inputName.value;

    //Local storage of names
    let names;
    if (localStorage.getItem('names') === null) {
        names = name;
    }
    else {
        names = JSON.parse(localStorage.getItem("names"));
    }
    localStorage.setItem("names", JSON.stringify(names));
    sec1.classList.add("hidden");
    sec2.classList.remove("hidden");
    nameGen();
    e.preventDefault();
}
function hideUnhide(e) {
    const name = inputName.value;
    let names;
    if (localStorage.getItem('names') === null) {
        names = name;
        sec2.classList.add("hidden");
    }
    else {
        sec1.classList.add("hidden");
        sec2.classList.remove("hidden");
    }
    inputName.value = null;
    nameGen();
}

function nameGen() {
    var name;
    if (localStorage.getItem('names') != null) {
        name = JSON.parse(localStorage.getItem('names'));
        var gen = `<h1>${name} Todo List</h1>`;
        todoName.innerHTML = gen;
    }
    else {
        sec2.classList.add("hidden");
        sec1.classList.remove("hidden");
    }
}

//RESET BUTTON
const resetBtn = document.querySelector(".reset-btn");

resetBtn.addEventListener("click", function () {
    localStorage.clear();
});