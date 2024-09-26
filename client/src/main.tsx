import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import fetchWebContent from "./scripts/fetchWebContent.tsx";

import App from "./App.tsx";
import "./index.css";

import WIPage from "./pages/WIPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import ThreadsPage from "./pages/ThreadsPage.tsx";
import NewPostPage from "./pages/NewPostPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";

import BackOfficePage from "./pages/BackOfficePage.tsx";

import PageNotFound404 from "./pages/PageNotFound404.tsx";

import AuthProvider from "./contexts/AuthProvider.tsx";
import TagsProvider from "./contexts/TagsProvider.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: async () => {
      return await fetchWebContent({page: "header", lang: "fr"});
    },
    children: [
      {
        path: "",
        element: <HomePage />,
        loader: async () => {
          return await fetchWebContent({page: "homepage", lang: "fr", hasPosts: true});
        },
      },
      {
        path: "topic",
        element: <ThreadsPage threadType="topic" />,
        loader: async () => {
          return await fetchWebContent({page: "topic", lang: "fr", hasPosts: true});
        },
      },
      {
        path: "question",
        element: <ThreadsPage threadType="question" />,
        loader: async () => {
          return await fetchWebContent({page: "question", lang: "fr", hasPosts: true});
        },
      },
      {
        path: "chat",
        element: <WIPage />,
        loader: async () => {
          return await fetchWebContent({page: "wip", lang: "fr"});
        },
      },
      {
        path: "register",
        element: <RegisterPage />,
        loader: async () => {
          return await fetchWebContent({page: "register", lang: "fr"});
        },
      },
      {
        path: "newTopic",
        element: <NewPostPage threadType="topic" />,
        loader: async () => {
          return await fetchWebContent({page: "newPost", lang: "fr", hasPosts: true});
        },
      },
      {
        path: "newQuestion",
        element: <NewPostPage threadType="question" />,
        loader: async () => {
          return await fetchWebContent({page: "newPost", lang: "fr", hasPosts: true});
        },
      },
      {
        path: "favourites",
        element: <WIPage />,
        loader: async () => {
          return await fetchWebContent({page: "wip", lang: "fr"});
        },
      },
      {
        path: "profile",
        element: <WIPage />,
        loader: async () => {
          return await fetchWebContent({page: "wip", lang: "fr"});
        },
      },
    ],
  },
  {
    path: "backoffice",
    element: <App isBackOfficeHeader={true}/>,
    loader: async () => {
      return await fetchWebContent({page: "header", lang: "fr", isBackOffice: true});
    },
    children: [
      {
        path: "",
        element: <BackOfficePage />,
        loader: async () => {
          return await fetchWebContent({page: "homepage", lang: "fr", isBackOffice: true});
        },
      },
      {
        path: "chats",
        element: <WIPage />,
        loader: async () => {
          return await fetchWebContent({page: "wip", lang: "fr", isBackOffice: false});
        },
      },
      {
        path: "tags",
        element: <WIPage />,
        loader: async () => {
          return await fetchWebContent({page: "wip", lang: "fr", isBackOffice: false});
        },
      },
      {
        path: "moderation",
        element: <WIPage />,
        loader: async () => {
          return await fetchWebContent({page: "wip", lang: "fr", isBackOffice: false});
        },
      },
      {
        path: "interface",
        element: <PageNotFound404 />,
        loader: async () => {
          return await fetchWebContent({page: "404", lang: "fr", isBackOffice: false});
        },
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound404 />,
    loader: async () => {
      return await fetchWebContent({page: "404", lang: "fr"});
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
