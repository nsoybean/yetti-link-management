import { useMemo, useEffect, ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { AppNavbar } from "./components/AppNavbar";
import ArticleMenuBar from "./components/ArticleMenuBar";

// import { User } from "./types/user/User";
// import AppNavBar from "./components/AppNavBar";

// import NotFoundPage from "./pages/common/NotFound";
// import ArticlesSidebarMenu from "./components/ArticlesSidebarMenu";
/**
 * use this component to wrap all child components
 * this is useful for templates, themes, and context
 */

export default function App({ children }: { children: ReactNode }) {
  const location = useLocation();
  // include routes where nav bar shouldnt appear
  const shouldDisplayAppNavBar = useMemo(() => {
    return (
      location.pathname !== "/" &&
      location.pathname !== "/login" &&
      location.pathname !== "/signup"
    );
  }, [location]);

  // include routes where articles sidebar menu should appear
  const shouldDisplayArticlesSidebarMenu = useMemo(() => {
    return (
      location.pathname === "/saves" ||
      location.pathname === "/archives" ||
      location.pathname === "/tags" ||
      location.pathname === "/dashboard"
    );
  }, [location]);

  const isAdminDashboard = useMemo(() => {
    return location.pathname.startsWith("/admin");
  }, [location]);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView();
      }
    }
  }, [location]);

  return (
    <div className="dark:bg-boxdark-2 flex min-h-screen flex-col items-center justify-start dark:text-white">
      {isAdminDashboard ? (
        <>{children}</>
      ) : (
        <>
          {shouldDisplayAppNavBar && <AppNavbar />}

          <div
            className={`${
              shouldDisplayArticlesSidebarMenu && "flex"
            }  mx-auto max-w-7xl gap-6 sm:px-6 lg:px-6`}
          >
            <>
              {shouldDisplayArticlesSidebarMenu && <ArticleMenuBar />}

              {children}
            </>
          </div>
        </>
      )}
    </div>
  );
}
