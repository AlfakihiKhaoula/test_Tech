import { Link, Route, RouterProvider, Routes } from "react-router-dom";
import "./App.css";
import { routes } from "./routes";
import { Suspense } from "react";
import Navbar from "./layout/navbar";

function App({ router }) {
  return (
    <div className="min-h-screen  text-black font-sans">
      <main className="max-w-5xl mx-auto p-6">
        <Routes>
          {routes.map((route, index) => {
            const { path, component: Component } = route;
            return (
              <>
                <Route
                  path={path}
                  element={
                    <Suspense fallback={<p>loading...</p>}>
                      <Navbar />
                      <Component />
                    </Suspense>
                  }
                />
              </>
            );
          })}
        </Routes>
      </main>
    </div>
  );
}

export default App;
