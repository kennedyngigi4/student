"use client"

import { useState } from "react";
import Editor from "@monaco-editor/react";

export default function CodeEditor() {
    const [code, setCode] = useState("// Write JavaScript code here\nconsole.log('Hello World');");
    const [output, setOutput] = useState("");

    const runCode = async () => {
        setOutput("Running...");

        try {
            const response = await fetch("/api/run", {  // ✅ Calls the correct App Router API
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code }),
            });

            const data = await response.json();
            setOutput(data.output || `Error: ${data.error}`);
        } catch (error) {
            setOutput("Error: Could not connect to server.");
        }
    };

    return (
        <div className="p-5">
            <h2 className="text-xl font-bold">Next.js Coding Console</h2>
            <Editor
                height="200px"
                language="javascript"
                theme="vs-dark"
                value={code}
                onChange={(value) => setCode(value)}
            />
            <button
                onClick={runCode}
                className="mt-3 bg-blue-500 text-white px-4 py-2 rounded"
            >
                Run Code
            </button>
            <h3 className="mt-4 font-semibold">Output:</h3>
            <pre className="p-3 bg-gray-100 rounded">{output || "No output yet"}</pre>
        </div>
    );
}
