import React, { Suspense, useContext } from "react";
import { Navigate, Routes, Route } from "react-router-dom";

import AuthContext from "./store/authContext";
import Layout from "./pages/page-layout/Layout";
import HomePage from "./pages/Home";
import NotFound from "./pages/NotFound";
import Spinner from "./components/UI/Spinner/Spinner";

const UserAuthPage = React.lazy(() => import("./pages/UserAuth"));

const App = () => {
  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <Suspense
        fallback={
          <div className="p-5">
            <Spinner />
          </div>
        }>
        <Routes>
          <Route path="/" element={<HomePage />} />

          {authCtx.isLoggedIn && (
            <>
              <Route path="/auth" element={<Navigate replace to="/" />} />
            </>
          )}

          {!authCtx.isLoggedIn && (
            <>
              <Route path="/auth" element={<UserAuthPage />} />
            </>
          )}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
};

export default App;
