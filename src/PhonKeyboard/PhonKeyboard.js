import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useRef, useEffect } from 'react'; // Import React, useState, useRef, and useEffect
import './PhoneKeyboard.css';

function PhoneKeyboard() {
  const [inputText, setInputText] = useState('');
  const [undoHistory, setUndoHistory] = useState([]);

  const [pastedText, setPastedText] = useState('');
  const [clipboardContent, setClipboardContent] = useState('');
  const [virtualKeyboard, setVirtualKeyboard] = useState('arabic');
  const [caretPosition, setCaretPosition] = useState(0);
  const [newPosition, setnewPosition] = useState(0);

  const inputRef = useRef(null); // Create a ref for the textarea
  const handleKeyPress = (char) => {
    setInputText((prevText) => prevText + char); const textarea = document.querySelector('textarea');
    textarea.focus();

  };
  const handleKeyDown = (event) => {
    if (virtualKeyboard === 'arabic') {
      let newPosition = caretPosition;

      if (event.ctrlKey && event.key === 'z') {
        // Handle undo logic for Arabic virtual keyboard
        if (undoHistory.length > 0) {
          const previousText = undoHistory[undoHistory.length - 1];
          setUndoHistory(undoHistory.slice(0, -1));
          setInputText(previousText);
          newPosition = previousText.length;
        }
      } else if (event.key === 'ArrowLeft') {
        newPosition = Math.max(newPosition - 1, 0);
      } else if (event.key === 'ArrowRight') {
        newPosition = Math.min(newPosition + 1, inputText.length);
      } else if (event.key === 'ArrowUp') {
        const currentLineIndex = inputText
          .substring(0, newPosition)
          .split('\n').length - 1;
        const currentLineStartPosition = inputText.lastIndexOf('\n', newPosition - 1) + 1;
        const currentLineEndPosition = inputText.indexOf('\n', newPosition);
        if (currentLineIndex > 0) {
          if (currentLineEndPosition !== -1) {
            newPosition = currentLineStartPosition + Math.min(newPosition - currentLineStartPosition, currentLineEndPosition - currentLineStartPosition);
          } else {
            newPosition = currentLineStartPosition;
          }
        }
      } else if (event.key === 'ArrowDown') {
        const currentLineIndex = inputText
          .substring(0, newPosition)
          .split('\n').length - 1;
        const currentLineStartPosition = inputText.lastIndexOf('\n', newPosition - 1) + 1;
        const currentLineEndPosition = inputText.indexOf('\n', newPosition);
        if (currentLineIndex < inputText.split('\n').length - 1) {
          if (currentLineEndPosition !== -1) {
            newPosition = currentLineEndPosition + Math.min(newPosition - currentLineStartPosition, inputText.indexOf('\n', currentLineEndPosition + 1) - currentLineEndPosition);
          } else {
            newPosition = inputText.length;
          }
        }
      }

      setCaretPosition(newPosition);
    } else if (event.keyCode === 9) { // Tab key was pressed
      event.preventDefault();
      const val = inputText;
      const start = caretPosition;
      const updatedText = val.substring(0, start) + '\t' + val.substring(start);
      setInputText(updatedText);
      setCaretPosition(start + 1);
    }

    // Add the current state to undoHistory
    setUndoHistory([...undoHistory, inputText]);

    // Set the updated cursor position
    setCaretPosition(newPosition);
  };


  const handleBackspace = () => {
    setInputText((prevText) => prevText.slice(0, -1));
  };

  const handleSpace = () => {
    setInputText((prevText) => prevText + ' ');
  };

  const handleEnter = () => {
    setInputText((prevText) => prevText + '\n');
  };
  const handleGoogleSearch = () => {
    // Open a new Google search page with the typed text
    if (inputText) {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(inputText)}`, '_blank');
    }

  };



  const handletybeSearch = () => {
    // Open a new Google search page with the typed text
    if (inputText) {
      window.open(`https://www.youtube.com/search?q=${encodeURIComponent(inputText)}`, '_blank');
    }
  };


  function MAlert() {
    // Function to handle keydown event
    const handleKeyDown = (event) => {
      if (event.key === ' ') {
        const textarea = document.querySelector('textarea');
        if (textarea) {
          const { selectionStart, selectionEnd, value } = textarea;
          const newValue =
            value.substring(selectionStart, 0) + value.substring(selectionEnd)
            ;
          textarea.value = newValue;
          textarea.selectionStart = textarea.selectionEnd = selectionStart + 0;
          textarea.focus();
        }
      }
    };

    // Effect to listen for keydown event
    useEffect(() => {
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }, []);

    return null;
  }




  const handleClear = () => {
    setInputText('');
  };

  // Define your keyboard layout for alphabetic characters
  const arabicCharacters = [

    'ذ',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'ض',
    'ص',
    'ث',
    'ق',
    'ف',
    'غ',
    'ع',
    'ه',
    'خ',
    'ح',
    'ج',
    'د',
    'ش',
    'س',
    'ي',
    'ب',
    'ل',
    'ا',
    'ت',
    'ن',
    'م',
    'ك',
    'ط',
    'ئ',
    'ء',
    'ؤ',

    'ر',
    'لا',
    'ى',
    'ة',
    'و',
    'ز',
    'ظ',


    'لأ',
    'لآ',
    '.',
    '!',
    '!',
    '~',
    'آ',
    ',',
    '.',
    '؟',
    '-',
    '،',
    'إ',
    ';',


  ];

  return (

    <div >
      <h1 className="h1"> </h1>
      <h1 className="h1"> </h1>

      <h1 className="h1">Arabic keyboard</h1>

      <div className="phone-keyboard">

        <div className="input-fieldP">
          <textarea
            value={inputText}
            dir="rtl" // Set the text direction to right-to-left
            rows={12}
            cols={30}
            placeholder="ادخل هنا.."
            onKeyDown={handleKeyDown}
            ref={inputRef}
            onInput={(e) => {
              setInputText(e.target.value);
            }}
            onSelect={(event) => {
              const selectedText = inputText.substring(event.target.selectionStart, event.target.selectionEnd);
              setClipboardContent(selectedText);
            }}
          />

          <MAlert />


        </div>
        <div className="keyboardP">
          <div>
            <div className="keyboard-rowP">
              {arabicCharacters.slice(0, 11).map((char, index) => (
                <button key={index} onClick={() => handleKeyPress(char)}>
                  {char}
                </button>

              ))}
            </div>
            <div className="keyboard-rowP">
              {arabicCharacters.slice(11, 23).map((char, index) => (
                <button key={index} onClick={() => handleKeyPress(char)}>
                  {char}
                </button>
              ))}
            </div>
            <div className="keyboard-rowP">
              {arabicCharacters.slice(23, 34).map((char, index) => (
                <button key={index} onClick={() => handleKeyPress(char)}>
                  {char}
                </button>
              ))}
            </div>

            <div className="keyboard-rowP">
              {arabicCharacters.slice(34, 44).map((char, index) => (
                <button key={index} onClick={() => handleKeyPress(char)}>
                  {char}
                </button>
              ))}
            </div>        <div className="keyboard-rowP">
              {arabicCharacters.slice(44, 58).map((char, index) => (
                <button key={index} onClick={() => handleKeyPress(char)}>
                  {char}
                </button>
              ))}
            </div>


            <div className="keyboard-rowP">
              <button className="search-google" onClick={handleGoogleSearch}>
                <div className="google-text">
                  <FontAwesomeIcon icon={faGoogle} className="blue" />
                </div>
              </button>

              <button className="search-tube" onClick={handletybeSearch}>
                <p className="tube">
                  <p  >youtube</p>
                </p>

              </button>

              <button className="space" onClick={handleSpace}>
                Space
              </button>
              <button onClick={handleEnter}>Enter</button>
         
              <button   onClick={handleBackspace}>    </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhoneKeyboard;
