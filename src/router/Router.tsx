import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";

import useRouter from "./useRouter";

import Layout from "@/components/layout/layout";

import NotFound from "@/pages/NotFound";

const RouteConfig = () => {
  const { routes } = useRouter();

  return (
    <Routes>
      {/* under this is implement layout for what's inside */}
      <Route element={<Layout />}>
        {routes.map(({ index, path, element, children }) => (
          <Fragment key={path}>
            {children && children.length > 0 ? (
              <Route {...{ path, element }}>
                {children.map(({ index, path, element }) => (
                  <Route key={path} {...{ index, path, element }} />
                ))}
              </Route>
            ) : (
              <Route {...{ index, path, element }} />
            )}
          </Fragment>
        ))}
        {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
              routes for. */}
        {/* for not found page */}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RouteConfig;
