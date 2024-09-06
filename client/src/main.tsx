import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import fetchWebContent from "./scripts/fetchWebContent.tsx";

import App from "./App.tsx";
import "./index.css";
import HomePage from "./pages/HomePage.tsx";
import PageNotFound404 from "./pages/PageNotFound404.tsx";
import WIPage from "./pages/WIPage.tsx";
import ThreadsPage from "./pages/ThreadsPage.tsx";
import TagsProvider from "./contexts/TagsProvider.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: async () => {
      return (await fetchWebContent("header", "fr"));
    },
    children: [
      {
        path: "",
        element: <HomePage />,
        loader: async () => {
          return (await fetchWebContent("homepage", "fr", true));
        }
      },
      {
        path: "topics",
        element: <ThreadsPage threadType="topics" />,
        loader: async () => {
          return (await fetchWebContent("topics", "fr", true));
        }
      },
      {
        path: "questions",
        element: <ThreadsPage threadType="questions" />,
        loader: async () => {
          return (await fetchWebContent("questions", "fr", true));
        }
      },
      {
        path: "chats",
        element: <WIPage />,
         loader: async () => {
          return (await fetchWebContent("wip", "fr"));
        },
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound404 />,
     loader: async () => {
      return (await fetchWebContent("404", "fr"));
    },
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TagsProvider>
      <RouterProvider router={router} />
    </TagsProvider>
  </StrictMode>
);
