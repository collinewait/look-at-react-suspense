import React, { Suspense, useState, useTransition } from "react";
import "./App.css";
import { createResource, wrapPromise } from "./person-api";
import { Person } from "./Person";
import { Num } from "./Num";
import { ErrorBoundary } from "./ErrorBoundary";
import { PostResult } from "./PostResult";

const initialResource = createResource();

function App() {
  // const [resource, setResource] = useState(() => createResource());
  const [resource, setResource] = useState(initialResource);
  const [postResource, setPostResource] = useState({
    result: {
      read() {
        return null;
      }
    }
  });
  const [startTransition, isPending] = useTransition({
    timeoutMs: 4000
  });
  return (
    <div className="App">
      <div>Another name here</div>
      <Suspense fallback={<h1>Loading person...</h1>}>
        <ErrorBoundary>
          <Person resource={resource} />
          <PostResult resource={postResource} />
        </ErrorBoundary>
      </Suspense>
      <Suspense fallback={<h1>Loading num...</h1>}>
        <Num resource={resource} />
      </Suspense>
      <button
        onClick={() => {
          const promise = fetch("https://en1olkzc4fykg.x.pipedream.net/", {
            method: "POST",
            body: JSON.stringify({ hello: "buddy" })
          })
            .then(x => x.json())
            .then(x => {
              console.log(x);
              return x;
            });
          setPostResource({ result: wrapPromise(promise) });
        }}
      >
        Call post request
      </button>
      <button
        onClick={() => {
          startTransition(() => {
            setResource(createResource());
          });
        }}
      >
        refresh data {isPending ? "(Loading...)" : ""}
      </button>
    </div>
  );
}

export default App;
