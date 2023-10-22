import React, {useState, useEffect} from 'react';
import logo from '../assets/logo.svg';
import '../styles/ui.css';

function App() {
  const [findVal, setFindVal] = useState("");
  const [replaceVal, setReplaceVal] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(true);
  const [exactMatch, setExactMatch] = useState(true);
  const [searchInOption, setSearchInOption] = useState("Page");

  const onReplace = () => {
    parent.postMessage({ pluginMessage: { type: 'find-and-replace', findVal, replaceVal, caseSensitive, exactMatch, searchInOption } }, '*');
  };

  const onCancel = () => {
    parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*');
  };

  const toggleCaseSensitiveCheckbox = () => {
    setCaseSensitive(!caseSensitive);
  }

  const toggleExactMatchCheckbox = () => {
    setExactMatch(!exactMatch);
  }

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
        Search In
        <select name="searchIn" id="searchIn" value={searchInOption} onChange={(e) => setSearchInOption(e.target.value)}>
          <option value="Page">Current Page</option>
          <option value="Selection">Selection</option>
        </select>
      </label>
      <label>
        Find
        <input type="text" value={findVal} onChange={(e) => setFindVal(e.target.value)}/>
      </label>
      <label>
        Replace
        <input type="text" value={replaceVal} onChange={(e) => setReplaceVal(e.target.value)} />
      </label>
      <label>
        Case Sensitive
        <input type="checkbox" value="caseSensitive" checked={caseSensitive} onChange={() => toggleCaseSensitiveCheckbox()}/>
      </label>
      <label>
        Exact Match
        <input type="checkbox" value="exactMatch" checked={exactMatch} onChange={() => toggleExactMatchCheckbox()}/>
      </label>
      <button id="find-and-replace" onClick={onReplace}>
        Replace
      </button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}

export default App;
