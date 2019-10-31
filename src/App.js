import React, { Suspense } from "react";
import "./App.css";
import { createResource } from "./person-api";
import { Person } from "./Person";
import { Num } from "./Num";

const resource = createResource();

function App() {
  return (
    <div className="App">
      <div>Another name here</div>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Num resource={resource} />
        <Person resource={resource} />
      </Suspense>
    </div>
  );
}

export default App;
