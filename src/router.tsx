import { Routes, Route, BrowserRouter } from "react-router-dom";
import LandingPage from "./pages/landing/LandingPage";
import App from "./App";
import Login from "./pages/auth/Login";
import Saves from "./pages/saves/Saves";
import NotFoundPage from "./pages/NotFoundPage";
import AccountPage from "./pages/auth/AccountPage";
import Tag from "./pages/tag";
import TagSaves from "./pages/tag/Saves";
import { ArticleStateEnum } from "./typings/article/type";

// import PricingPage from "./pages/pricing/Pricing";
// import App from "./App";
// import Login from "./pages/auth/Login";
// import Saves from "./pages/articles/Saves";
// import NotFoundPage from "./pages/common/NotFound";
// import AccountPage from "./pages/account/Account";
// Router
export const routes = {
  LandingPageRoute: {
    to: ["/"],
    component: <LandingPage />,
  },
  LoginPageRoute: {
    to: ["/login"],
    component: <Login />,
  },
  SavesPageRoute: {
    to: ["/saves", "/saves/folder/:folderId"],
    component: <Saves />,
  },
  // deprecated: migrated to use same component as Saves
  // ArchivePageRoute: {
  //   to: ["/archives"],
  //   component: <Saves state={ArticleStateEnum.ARCHIVED} />,
  // },
  TagPageRoute: {
    to: ["/tags"],
    component: <Tag />,
  },
  TagSavesPageRoute: {
    to: ["/tags/saves"],
    component: <TagSaves />,
  },
  //   PricingPageRoute: {
  //     to: "/pricing",
  //     component: <PricingPage />,
  //   },

  ProfilePage: {
    to: ["/account"],
    component: <AccountPage />,
  },
  NotFoundPage: {
    to: ["/*"],
    component: <NotFoundPage />,
  },
} as const;

const router = (
  <BrowserRouter basename="/">
    <App>
      <Routes>
        {Object.entries(routes).map(
          ([routeKey, route]) =>
            Array.isArray(route.to) &&
            route.to.map((to) => (
              <Route key={routeKey} path={to} element={route.component} />
            )),

          // <Route key={routeKey} path={route.to} element={route.component} />
        )}
      </Routes>
    </App>
  </BrowserRouter>
);

export default router;
