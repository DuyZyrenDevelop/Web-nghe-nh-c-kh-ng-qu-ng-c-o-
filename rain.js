document.addEventListener("DOMContentLoaded", function () {
  const rainContainer = document.querySelector(".rain");

  for (let i = 0; i < 80; i++) {
    const drop = document.createElement("span");

    drop.style.left = Math.random() * 100 + "vw";
    drop.style.animationDuration = 2 + Math.random() * 3 + "s";
    drop.style.opacity = Math.random();

    rainContainer.appendChild(drop);
  }
});
