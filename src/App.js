import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
function App() {
    const [count, setCount] = useState(0);
    return (React.createElement("div", { className: "App" },
        React.createElement("header", { className: "App-header" },
            React.createElement("img", { src: logo, className: "App-logo", alt: "logo" }),
            React.createElement("p", null, "Hello Vite + React!"),
            React.createElement("p", null,
                React.createElement("button", { type: "button", onClick: () => setCount((count) => count + 1) },
                    "count is: ",
                    count)),
            React.createElement("p", null,
                "Edit ",
                React.createElement("code", null, "App.tsx"),
                " and save to test HMR updates."),
            React.createElement("p", null,
                React.createElement("a", { className: "App-link", href: "https://reactjs.org", target: "_blank", rel: "noopener noreferrer" }, "Learn React"),
                ' | ',
                React.createElement("a", { className: "App-link", href: "https://vitejs.dev/guide/features.html", target: "_blank", rel: "noopener noreferrer" }, "Vite Docs")))));
}
export default App;
