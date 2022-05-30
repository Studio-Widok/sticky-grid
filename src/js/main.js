import $ from 'cash-dom';
import throttle from 'widok-throttle';

const DESIRED_GRID_COUNT = 8;

const elements = {
  top: $('#top'),
  container: $('#container'),
  grid: $('#grid'),
  gridPattern: $('#grid-pattern'),
  right: $('#right'),
  textarea: $('#right textarea'),
  img: $('#img'),
};

let gridSize = 200;

function calcGridSize() {
  const containerWidth = elements.container.width();
  gridSize = Math.round(containerWidth / DESIRED_GRID_COUNT);
}

function applyGridSize() {
  if (isNaN(gridSize) || gridSize === Infinity) return;

  const containerWidth = DESIRED_GRID_COUNT * gridSize;
  const textareaHeight = elements.textarea.height();
  const textareaVerticalGridCount = Math.max(Math.ceil(textareaHeight / gridSize), 3);
  const height = (textareaVerticalGridCount + 3) * gridSize + 1;

  elements.top.css({
    marginBottom: -gridSize * 2,
    width: gridSize * 3 + 1,
    minHeight: gridSize * 2,
  });

  elements.container.css({
    paddingTop: gridSize,
    width: containerWidth,
    height: height,
  });

  elements.grid.attr({
    viewBox: `0 0 ${containerWidth + gridSize * 2} ${height}`,
  }).css({
    width: containerWidth + gridSize * 2,
    left: -gridSize,
  });

  elements.gridPattern.attr({
    width: gridSize,
    height: gridSize,
  });

  elements.right.css({
    width: containerWidth / 2 + 1,
    height: textareaVerticalGridCount * gridSize + 1,
  });

  elements.textarea.css({
    marginTop: -(textareaHeight - textareaVerticalGridCount * gridSize) / 2,
    marginBottom: -(textareaHeight - textareaVerticalGridCount * gridSize) / 2,
  });

  elements.img.css({
    top: gridSize * 3,
    bottom: gridSize - 1,
    width: gridSize * 3 + 1,
  });
}

const onResize = throttle(33, () => {
  elements.container.css({ width: 'auto' });
  setTimeout(() => {
    calcGridSize();
    applyGridSize();
  }, 0);
});

$(window).on({
  load: onResize,
  resize: onResize,
});

new ResizeObserver(onResize).observe(elements.textarea[0]);