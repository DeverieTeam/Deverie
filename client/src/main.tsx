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
import NewPostPage from "./pages/NewPostPage.tsx";
import AuthProvider from "./contexts/AuthProvider.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: async () => {
      return await fetchWebContent("header", "fr");
    },
    children: [
      {
        path: "",
        element: <HomePage />,
        loader: async () => {
          return await fetchWebContent("homepage", "fr", true);
        },
      },
      {
        path: "topic",
        element: <ThreadsPage threadType="topic" />,
        loader: async () => {
          return await fetchWebContent("topic", "fr", true);
        },
      },
      {
        path: "question",
        element: <ThreadsPage threadType="question" />,
        loader: async () => {
          return await fetchWebContent("question", "fr", true);
        },
      },
      {
        path: "chat",
        element: <WIPage />,
        loader: async () => {
          return await fetchWebContent("wip", "fr");
        },
      },
      {
        path: "register",
        element: <WIPage />,
        loader: async () => {
          return await fetchWebContent("wip", "fr");
        },
      },
      {
        path: "newTopic",
        element: <NewPostPage threadType="topic" />,
        loader: async () => {
          return await fetchWebContent("newPost", "fr", true);
        },
      },
      {
        path: "newQuestion",
        element: <NewPostPage threadType="question" />,
        loader: async () => {
          return await fetchWebContent("newPost", "fr", true);
        },
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound404 />,
    loader: async () => {
      return await fetchWebContent("404", "fr");
    },
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <TagsProvider>
        <RouterProvider router={router} />
      </TagsProvider>
    </AuthProvider>
  </StrictMode>
);
