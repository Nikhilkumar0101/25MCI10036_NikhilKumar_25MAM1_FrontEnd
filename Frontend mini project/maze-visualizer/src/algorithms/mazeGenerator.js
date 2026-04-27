export function generateMaze(width, height) {
  const grid = Array(height).fill(0).map(() => Array(width).fill(1));

  function carve(x, y) {
    grid[y][x] = 0;

    const dirs = [[2,0],[0,2],[-2,0],[0,-2]]
      .sort(() => Math.random() - 0.5);

    for (let [dx, dy] of dirs) {
      let nx = x + dx;
      let ny = y + dy;

      if (nx >= 0 && ny >= 0 && nx < width && ny < height && grid[ny][nx] === 1) {
        grid[y + dy/2][x + dx/2] = 0;
        carve(nx, ny);
      }
    }
  }

  carve(0, 0);
  return grid;
}

export function getRandomPoints(grid) {
  const paths = [];

  grid.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell === 0) paths.push([x, y]);
    });
  });

  const start = paths[Math.floor(Math.random() * paths.length)];
  const goal = paths[Math.floor(Math.random() * paths.length)];

  return { start, goal };
}