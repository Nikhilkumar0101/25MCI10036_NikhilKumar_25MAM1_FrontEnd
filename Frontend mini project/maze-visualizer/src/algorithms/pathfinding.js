const key = (node) => node.toString();

function reconstruct(parent, goal) {
  let path = [];
  let curr = goal;

  while (curr) {
    path.push(curr);
    curr = parent[key(curr)];
  }
  return path.reverse();
}

function getNeighbors(grid, x, y) {
  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
  return dirs
    .map(([dx, dy]) => [x + dx, y + dy])
    .filter(([nx, ny]) => grid[ny] && grid[ny][nx] === 0);
}

function metrics(path, nodes, startTime, visited) {
  return {
    path,
    nodes,
    length: path.length,
    time: (performance.now() - startTime).toFixed(2),
    visited
  };
}

// BFS
export function bfs(grid, start, goal) {
  const startTime = performance.now();
  const queue = [start];
  const visitedSet = new Set([key(start)]);
  const visitedList = [start];
  const parent = {};
  let nodes = 0;

  while (queue.length) {
    const [x, y] = queue.shift();
    nodes++;

    if (key([x,y]) === key(goal)) {
      return metrics(reconstruct(parent, goal), nodes, startTime, visitedList);
    }

    for (let n of getNeighbors(grid, x, y)) {
      const k = key(n);
      if (!visitedSet.has(k)) {
        visitedSet.add(k);
        visitedList.push(n);
        parent[k] = [x, y];
        queue.push(n);
      }
    }
  }
  return metrics([], nodes, startTime, visitedList);
}

// DFS
export function dfs(grid, start, goal) {
  const startTime = performance.now();
  const stack = [start];
  const visitedSet = new Set([key(start)]);
  const visitedList = [start];
  const parent = {};
  let nodes = 0;

  while (stack.length) {
    const [x, y] = stack.pop();
    nodes++;

    if (key([x,y]) === key(goal)) {
      return metrics(reconstruct(parent, goal), nodes, startTime, visitedList);
    }

    for (let n of getNeighbors(grid, x, y)) {
      const k = key(n);
      if (!visitedSet.has(k)) {
        visitedSet.add(k);
        visitedList.push(n);
        parent[k] = [x, y];
        stack.push(n);
      }
    }
  }
  return metrics([], nodes, startTime, visitedList);
}

// Heuristic
function heuristic(a, b) {
  return Math.abs(a[0]-b[0]) + Math.abs(a[1]-b[1]);
}

// A*
export function astar(grid, start, goal) {
  const startTime = performance.now();
  const open = [[heuristic(start, goal), 0, start]];
  const visitedSet = new Set();
  const visitedList = [];
  const parent = {};
  const gScore = { [key(start)]: 0 };
  let nodes = 0;

  while (open.length) {
    open.sort((a,b)=>a[0]-b[0]);
    const [_, g, current] = open.shift();
    const k = key(current);

    if (visitedSet.has(k)) continue;

    visitedSet.add(k);
    visitedList.push(current);
    nodes++;

    if (k === key(goal)) {
      return metrics(reconstruct(parent, goal), nodes, startTime, visitedList);
    }

    for (let n of getNeighbors(grid, ...current)) {
      const nk = key(n);
      const newG = g + 1;

      if (!(nk in gScore) || newG < gScore[nk]) {
        gScore[nk] = newG;
        parent[nk] = current;
        open.push([newG + heuristic(n, goal), newG, n]);
      }
    }
  }
  return metrics([], nodes, startTime, visitedList);
}

// Best First
export function bestFirst(grid, start, goal) {
  const startTime = performance.now();
  const open = [[heuristic(start, goal), start]];
  const visitedSet = new Set();
  const visitedList = [];
  const parent = {};
  let nodes = 0;

  while (open.length) {
    open.sort((a,b)=>a[0]-b[0]);
    const [_, current] = open.shift();
    const k = key(current);

    if (visitedSet.has(k)) continue;

    visitedSet.add(k);
    visitedList.push(current);
    nodes++;

    if (k === key(goal)) {
      return metrics(reconstruct(parent, goal), nodes, startTime, visitedList);
    }

    for (let n of getNeighbors(grid, ...current)) {
      const nk = key(n);
      if (!visitedSet.has(nk)) {
        parent[nk] = current;
        open.push([heuristic(n, goal), n]);
      }
    }
  }
  return metrics([], nodes, startTime, visitedList);
}