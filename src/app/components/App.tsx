import React, {useState, useEffect} from 'react';
import logo from '../assets/logo.svg';
import '../styles/ui.css';

function App() {
  const [findVal, setFindVal] = useState("");
  const [replaceVal, setReplaceVal] = useState("");

  const onReplace = () => {
    parent.postMessage({ pluginMessage: { type: 'find-and-replace', findVal, replaceVal } }, '*');
  };

  const onCancel = () => {
    parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*');
  };

  useEffect(() => {
    // This is how we read messages sent from the plugin controller
    window.onmessage = (event) => {
      const { type, message } = event.data.pluginMessage;
      if (type === 'find-and-replace') {
        console.log(`Figma Says: ${message}`);
      }
    };
  }, []);

  return (
    <div>
      <img src={logo} />
      <h2>Layer Renamer</h2>
      <label>
        Find
        <input type="text" value={findVal} onChange={(e) => setFindVal(e.target.value)}/>
      </label>
      <label>
        Replace
        <input type="text" value={replaceVal} onChange={(e) => setReplaceVal(e.target.value)} />
      </label>
      <button id="find-and-replace" onClick={onReplace}>
        Replace
      </button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}

export default App;
