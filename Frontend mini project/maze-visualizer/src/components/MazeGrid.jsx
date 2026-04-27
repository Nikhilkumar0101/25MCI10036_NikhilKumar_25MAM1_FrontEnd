export default function MazeGrid({ grid, path, visited, start, goal, title }) {
  return (
    <div className="maze-box">
      <h3>{title}</h3>

      <div className="grid">
        {grid.map((row, y) =>
          row.map((cell, x) => {
            let cls = "cell";

            if (cell === 1) cls += " wall";

            if (visited?.some(v => v[0] === x && v[1] === y))
              cls += " visited";

            if (path?.some(p => p[0] === x && p[1] === y))
              cls += " path";

            if (start && x === start[0] && y === start[1]) cls += " start";
            if (goal && x === goal[0] && y === goal[1]) cls += " goal";

            return <div key={`${x}-${y}`} className={cls}></div>;
          })
        )}
      </div>
    </div>
  );
}