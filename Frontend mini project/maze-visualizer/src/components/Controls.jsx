export default function Controls({ onGenerate, onSolve, selected, setSelected }) {
  const algos = ["bfs", "dfs", "astar", "bestFirst"];

  return (
    <div className="controls">
      <button onClick={onGenerate}>Generate Maze</button>

      {algos.map(a => (
        <label key={a}>
          <input
            type="checkbox"
            checked={selected.includes(a)}
            onChange={() => {
              setSelected(prev =>
                prev.includes(a)
                  ? prev.filter(x => x !== a)
                  : [...prev, a]
              );
            }}
          />
          {a.toUpperCase()}
        </label>
      ))}

      <button onClick={onSolve}>Solve</button>
    </div>
  );
}