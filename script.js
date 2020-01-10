const pixelCanvas = document.querySelector(".pixel-canvas");
const fillGrid = document.querySelector(".fill-grid");

function createGrid() {
  let height = document.querySelector(".canvas").getAttribute("data-value1");
  let width = document.querySelector(".canvas").getAttribute("data-value2");
  // Reset functionality --> Clear any filled-in cells if grid is already present.
  while (pixelCanvas.firstChild) {
    pixelCanvas.removeChild(pixelCanvas.firstChild);
  }
  // Create rows and cells
  for (let i = 1; i <= height; i++) {
    let row = document.createElement("tr");
    pixelCanvas.appendChild(row);
    for (let j = 1; j <= width; j++) {
      let cell = document.createElement("td");
      row.appendChild(cell);
      // Use left-click to fill cell with selected color
      cell.addEventListener("mousedown", function() {
        const color = document.querySelector(".select-color").value;
        this.style.backgroundColor = color;
      });
    }
  }
}

createGrid();

// Enable cell coloring while dragging mouse across grid
let pressed = false; // Tracks whether left-click is pressed or not

// Listens for mouse press and release on grid. Changes value to true when pressed, sets it back to false when released.
pixelCanvas.addEventListener("mousedown", function(e) {
  pressed = true;
  pixelCanvas.addEventListener("mouseup", function() {
    pressed = false;
  });
  // Ensures cells won't be colored if grid is left while left-click is pressed
  pixelCanvas.addEventListener("mouseleave", function() {
    pressed = false;
  });

  pixelCanvas.addEventListener("mouseover", function(e) {
    const color = document.querySelector(".select-color").value;
    // If mouse is pressed within grid, fills cell with selected color.
    if (pressed) {
      if (e.target.tagName === "TD") {
        e.target.style.backgroundColor = color;
      }
    }
  });
});

// Function to fill the whole grid with selected color.
fillGrid.addEventListener("click", function(e) {
  e.preventDefault();
  const color = document.querySelector(".select-color").value;
  pixelCanvas
    .querySelectorAll("td")
    .forEach(td => (td.style.backgroundColor = color));
});

// Use right-click to remove color fron cell ;; BUG: When pressing and dragging right-click on grid, it colours the cells.
pixelCanvas.addEventListener("contextmenu", e => {
  e.preventDefault();
  e.target.style.backgroundColor = null;
});
