import { Suspense } from "react";
import Views from "./views";

function App() {
  return (
    <div className="App">
      <Suspense fallback={<p>Loading...</p>}>
        <Views />
      </Suspense>
    </div>
  );
}

export default App;
