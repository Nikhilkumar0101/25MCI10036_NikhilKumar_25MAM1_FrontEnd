import { useState } from "react";
import MazeGrid from "./components/MazeGrid";
import Controls from "./components/Controls";
import Metrics from "./components/Metrics";

import { generateMaze, getRandomPoints } from "./algorithms/mazeGenerator";
import { bfs, dfs, astar, bestFirst } from "./algorithms/pathfinding";

export default function App() {
  const [grid, setGrid] = useState([]);
  const [start, setStart] = useState(null);
  const [goal, setGoal] = useState(null);
  const [results, setResults] = useState({});
  const [selected, setSelected] = useState(["bfs", "astar"]);

  const generate = () => {
    const maze = generateMaze(21, 21);
    const { start, goal } = getRandomPoints(maze);

    setGrid(maze);
    setStart(start);
    setGoal(goal);
    setResults({});
  };

  const solve = () => {
    if (!grid.length) return;

    let res = {};

    if (selected.includes("bfs")) res.bfs = bfs(grid, start, goal);
    if (selected.includes("dfs")) res.dfs = dfs(grid, start, goal);
    if (selected.includes("astar")) res.astar = astar(grid, start, goal);
    if (selected.includes("bestFirst")) res.bestFirst = bestFirst(grid, start, goal);

    setResults(res);
  };

  return (
    <div className="app">
      <h1>Maze Visualizer</h1>

      <Controls
        onGenerate={generate}
        onSolve={solve}
        selected={selected}
        setSelected={setSelected}
      />

      {grid.length > 0 && (
        <div className="grid-container">

          {/* BEFORE SOLVE */}
          {Object.keys(results).length === 0 && (
            <MazeGrid
              title="Maze"
              grid={grid}
              path={[]}
              visited={[]}
              start={start}
              goal={goal}
            />
          )}

          {/* AFTER SOLVE */}
          {Object.entries(results).map(([name, r]) => (
            <MazeGrid
              key={name}
              title={name.toUpperCase()}
              grid={grid}
              path={r.path}
              visited={r.visited}
              start={start}
              goal={goal}
            />
          ))}
        </div>
      )}

      {Object.keys(results).length > 0 && (
        <Metrics results={results} />
      )}
    </div>
  );
}