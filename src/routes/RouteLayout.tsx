import { IsLoggedInValues } from "constants/common";
import React, { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { RootState } from "store/reducers";
import { updateIsUserAuthenticated } from "reducers/userAuth";
import { useAppDispatch } from "store/store";
import { getLocalData, setLocalData } from "utils/localStorage";
import PublicLayout from "./PublicLayout";
import PrivateLayout from "./PrivateLayout";
import { NotifierStack } from "components";
// import Leaderboard from "pages/dashboard/Dashboard";

const RouteLayout = () => {
  const dispatch = useAppDispatch();
  const { isUserAuthenticated } = useSelector(
    (state: RootState) => state.rootReducer.userAuth
  );

  const [isAuthenticated, setIsAuthenticated] = useState(
    getLocalData(IsLoggedInValues.IS_LOGGED_IN)
  );

  useEffect(() => {
    const authenticatedState = getLocalData(IsLoggedInValues.IS_LOGGED_IN);
    if (!authenticatedState) {
      setLocalData(IsLoggedInValues.IS_LOGGED_IN, IsLoggedInValues.LOGGED_OUT);
    }
    dispatch(
      updateIsUserAuthenticated(
        authenticatedState ? authenticatedState : IsLoggedInValues.LOGGED_OUT
      )
    );
  }, [dispatch]);

  useEffect(() => {
    //call a basic api and if it fails also set as logged out
    if (isUserAuthenticated === IsLoggedInValues.LOGGED_OUT) {
      setIsAuthenticated(IsLoggedInValues.LOGGED_OUT);
      setLocalData(IsLoggedInValues.IS_LOGGED_IN, IsLoggedInValues.LOGGED_OUT);
      //clear user details
    }
    //call a basic api if success set as logged in
    if (isUserAuthenticated === IsLoggedInValues.LOGGED_IN) {
      setIsAuthenticated(IsLoggedInValues.LOGGED_IN);
      setLocalData(IsLoggedInValues.IS_LOGGED_IN, IsLoggedInValues.LOGGED_IN);
    }
  }, [isUserAuthenticated]);

  return (
    <>
      {isAuthenticated && (
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* <Route path='/leaderboard' element={<Leaderboard />} /> */}
            {/* <Route path='/identity-quest' element={<Instructions />} /> */}
            {/* <Route path='/identity-quest/questions' element={<IdentityQuest />} /> */}
            <Route
              path='*'
              element={
                isAuthenticated !== IsLoggedInValues.LOGGED_IN ? (
                  <PrivateLayout />
                ) : (
                  <PublicLayout />
                )
              }
            />
          </Routes>
        </Suspense>
      )}
       <NotifierStack />
    </>
  );
}

export default RouteLayout;