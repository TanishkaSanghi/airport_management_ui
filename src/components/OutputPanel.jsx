import "./OutputPanel.css";

export default function OutputPanel({
  response,
  status
}) {
  return (
    <div className="output-panel">

      <div className="terminal-header">

        <h3>Live Execution Output</h3>

        <span>
          Status : {status || "--"}
        </span>

      </div>

      <pre className="terminal">
        {response || "No response yet..."}
      </pre>

      <button
        className="clear-btn"
        onClick={() => window.location.reload()}
      >
        Clear Terminal
      </button>

    </div>
  );
}