import React, { Suspense, useState } from "react";
import "./App.css";
import { createResource } from "./person-api";
import { Person } from "./Person";
import { Num } from "./Num";

// const initialResource = createResource();

function App() {
  const [resource, setResource] = useState(() => createResource());
  return (
    <div className="App">
      <div>Another name here</div>
      <Suspense fallback={<h1>Loading person...</h1>}>
        <Person resource={resource} />
      </Suspense>
      <Suspense fallback={<h1>Loading num...</h1>}>
        <Num resource={resource} />
      </Suspense>
      <button
        onClick={() => {
          setResource(createResource());
        }}
      >
        refresh data
      </button>
    </div>
  );
}

export default App;
