"use client"

import { useRef } from 'react';

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

function onChange(newValue) {
  console.log("change", newValue);
}

const CodeEditor = () => {
    const aceEditorRef = useRef(null);

    const handleRunCode = () => {
        const editor = aceEditorRef.current.editor;
        const code = editor.getValue();
        // Execute code using one of the methods mentioned above
        console.log('Code to execute:', code);
    };

    return (
        <div>
            <AceEditor
                ref={aceEditorRef}
                mode="javascript"
                theme="monokai"
                onChange={onChange}
                name="UNIQUE_ID_OF_DIV"
                editorProps={{ $blockScrolling: true }}
            />
            <div>console</div>
            <button onClick={handleRunCode}>Run Code</button>
        </div>
    )
}

export default CodeEditor;