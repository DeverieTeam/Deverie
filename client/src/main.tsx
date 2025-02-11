import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import fetchWebContent from "./scripts/fetchWebContent.tsx";

import App from "./App.tsx";
import "./index.css";

import HomePage from "./pages/HomePage.tsx";
import ThreadsPage from "./pages/ThreadsPage.tsx";
import NewPostPage from "./pages/NewPostPage.tsx";
import PostViewPage from "./pages/PostViewPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import FavouritesPage from "./pages/FavouritesPage.tsx";

import BackOfficeHomepage from "./pages/backOffice/BackOfficeHomepage.tsx";
import BackOfficeTagsManagement from "./pages/backOffice/BackOfficeTagsManagement.tsx";
import BackOfficeMembersManagement from "./pages/backOffice/BackOfficeMembersManagement.tsx";

import WIPAndNotFoundPage from "./pages/WIPAndNotFoundPage.tsx";
import ErrorHandlerPage from "./pages/ErrorHandlerPage.tsx";

import AuthProvider from "./contexts/AuthProvider.tsx";
import TagsProvider from "./contexts/TagsProvider.tsx";

const language: string = 'fr';

const logErrors = (error, info) => {
  console.log('Something went wrong');
  console.error(error);
  console.error(JSON.stringify(info));
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorHandlerPage language={language}/>,
    loader: async () => {
      return await fetchWebContent({
        page: "header",
        lang: language,
      });
    },
    children: [
      {
        path: "",
        element: <HomePage />,
        loader: async () => {
          return await fetchWebContent({
            page: "homepage",
            lang: language,
            hasPosts: true,
          });
        },
      },
      {
        path: "topic",
        element: <ThreadsPage threadType="topic" />,
        loader: async () => {
          return await fetchWebContent({
            page: "topic",
            lang: language,
            hasPosts: true,
          });
        },
      },
      {
        path: "question",
        element: <ThreadsPage threadType="question" />,
        loader: async () => {
          return await fetchWebContent({
            page: "question",
            lang: language,
            hasPosts: true,
          });
        },
      },
      {
        path: "chat",
        element: <WIPAndNotFoundPage type="wip" />,
        loader: async () => {
          return await fetchWebContent({
            page: "wip",
            lang: language,
          });
        },
      },
      {
        path: "register",
        element: <RegisterPage />,
        loader: async () => {
          return await fetchWebContent({
            page: "register",
            lang: language,
          });
        },
      },
      {
        path: "newTopic",
        element: <NewPostPage threadType="topic" />,
        loader: async () => {
          return await fetchWebContent({
            page: "newPost",
            lang: language,
            hasPosts: true,
          });
        },
      },
      {
        path: "newQuestion",
        element: <NewPostPage threadType="question" />,
        loader: async () => {
          return await fetchWebContent({
            page: "newPost",
            lang: language,
            hasPosts: true,
          });
        },
      },
      {
        path: "postView",
        element: <PostViewPage />,
        loader: async () => {
          return await fetchWebContent({
            page: "postView",
            lang: language,
            hasPosts: true,
          });
        },
      },
      {
        path: "favourites",
        element: <FavouritesPage />,
        loader: async () => {
          return await fetchWebContent({
            page: "favourites",
            lang: language,
            hasPosts: true,
          });
        },
      },
      {
        path: "profile",
        element: <ProfilePage />,
        loader: async () => {
          return await fetchWebContent({
            page: "profile",
            lang: language,
            hasPosts: true,
          });
        },
      },
    ],
  },
  {
    path: "backoffice",
    element: <App isBackOfficeHeader={true} />,
    loader: async () => {
      return await fetchWebContent({
        page: "header",
        lang: language,
        isBackOffice: true,
      });
    },
    children: [
      {
        path: "",
        element: <BackOfficeHomepage />,
        loader: async () => {
          return await fetchWebContent({
            page: "homepage",
            lang: language,
            isBackOffice: true,
          });
        },
      },
      {
        path: "chats",
        element: <WIPAndNotFoundPage type="wip" />,
        loader: async () => {
          return await fetchWebContent({
            page: "wip",
            lang: language,
            isBackOffice: false,
          });
        },
      },
      {
        path: "tags",
        element: <BackOfficeTagsManagement />,
        loader: async () => {
          return await fetchWebContent({
            page: "tags",
            lang: language,
            isBackOffice: true,
          });
        },
      },
      {
        path: "threads",
        element: <WIPAndNotFoundPage type="wip" />,
        loader: async () => {
          return await fetchWebContent({
            page: "wip",
            lang: language,
            isBackOffice: false,
          });
        },
      },
      {
        path: "members",
        element: <BackOfficeMembersManagement />,
        loader: async () => {
          return await fetchWebContent({
            page: "members",
            lang: language,
            isBackOffice: true,
          });
        },
      },
      {
        path: "moderation",
        element: <WIPAndNotFoundPage type="wip" />,
        loader: async () => {
          return await fetchWebContent({
            page: "wip",
            lang: language,
            isBackOffice: false,
          });
        },
      },
      {
        path: "interface",
        element: <WIPAndNotFoundPage type="wip" />,
        loader: async () => {
          return await fetchWebContent({
            page: "wip",
            lang: language,
            isBackOffice: false,
          });
        },
      },
    ],
  },
  {
    path: "*",
    element: <WIPAndNotFoundPage type="notFound" />,
    errorElement: <ErrorHandlerPage language={language}/>,
    loader: async () => {
      return await fetchWebContent({
        page: "404",
        lang: language,
      });
    },
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary fallback={<ErrorHandlerPage language={language}/>} onError={logErrors}>
      <AuthProvider>
        <TagsProvider>
          <RouterProvider router={router} />
        </TagsProvider>
      </AuthProvider>
    </ErrorBoundary>
  </StrictMode>
);
