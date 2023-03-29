const l = document.querySelector("#l");
const i = document.querySelector("#i");
const b1 = document.querySelector("#b1");
const b2 = document.querySelector("#b2");

i.addEventListener("keyup", function (e) {
    b1.value = ((2 * parseFloat(l.value) * parseFloat(i.value)) / 294.64).toFixed(2);
    b2.value = ((1.73 * parseFloat(l.value) * parseFloat(i.value)) / 510.4).toFixed(2);
});