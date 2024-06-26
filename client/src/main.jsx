import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import HomePage from "./pages/HomePage";
import ForumsPage from "./pages/ForumsPage";

import data from "./assets/fakeData.json"

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage/>,
      },
      {
        path: "/forums",
        element: <ForumsPage />,
        loader: () => data,
          // {
          // const dataFetched = fetch("localhost:3310/api/forums")
          //   .then((response) => response.json())
          //   .catch((err) => console.error(err))
          //   return dataFetched;
          // }
      },
    ],
  },
]);


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
