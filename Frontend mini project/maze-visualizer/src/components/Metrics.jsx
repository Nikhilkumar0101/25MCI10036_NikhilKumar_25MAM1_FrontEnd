export default function Metrics({ results }) {
  return (
    <div className="metrics">
      <h3>Performance</h3>
      <table>
        <thead>
          <tr>
            <th>Algo</th>
            <th>Nodes</th>
            <th>Path</th>
            <th>Time(ms)</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(results).map(([name, r]) => (
            <tr key={name}>
              <td>{name}</td>
              <td>{r.nodes}</td>
              <td>{r.length}</td>
              <td>{r.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}