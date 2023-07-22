document.onreadystatechange = function () {
  document.querySelectorAll(".c-rng").forEach((item) => {
    item.addEventListener("input", (event) => {
      item.parentElement.style = `--value:${event.target.value}%`;
    });
  });
};
