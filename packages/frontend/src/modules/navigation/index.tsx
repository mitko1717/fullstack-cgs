import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePageContainer from '../home';
import { APP_KEYS } from '../common/consts';
import { TodoViewComponent } from '../common/components/TodoView';
import { StartPageComponent } from '../common/components/StartPage';
import { SigninComponent } from '../common/components/SignIn';
import { LoginComponent } from '../common/components/Login';

export const MainRouter = () => (
  <Router>
    <Routes>
      <Route element={<StartPageComponent />} path={APP_KEYS.ROUTER_KEYS.ROOT} />
      <Route element={<HomePageContainer />} path={APP_KEYS.ROUTER_KEYS.STARTPAGE} />
      <Route element={<TodoViewComponent />} path={APP_KEYS.ROUTER_KEYS.TODOVIEW} />
      <Route element={<SigninComponent />} path={APP_KEYS.ROUTER_KEYS.SIGNIN} />
      <Route element={<LoginComponent />} path={APP_KEYS.ROUTER_KEYS.LOGIN} />
    </Routes>
  </Router>
);
