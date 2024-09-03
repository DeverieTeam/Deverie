import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import PageNotFound404 from "./pages/PageNotFound404.tsx";
import WIPage from "./pages/WIPage.tsx";
import ThreadsPage from "./pages/ThreadsPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "topics",
        element: <ThreadsPage threadType="topics" />,
      },
      {
        path: "questions",
        element: <ThreadsPage threadType="questions" />,
      },
      {
        path: "chats",
        element: <WIPage />,
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound404 />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
