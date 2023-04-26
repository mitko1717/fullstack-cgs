import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePageContainer from '../home';
import { APP_KEYS } from '../common/consts';
import { TodoViewComponent } from '../common/components/TodoView';

export const MainRouter = () => (
  <Router>
    <Routes>
      <Route element={<HomePageContainer />} path={APP_KEYS.ROUTER_KEYS.ROOT} />
      <Route element={<TodoViewComponent />} path={APP_KEYS.ROUTER_KEYS.TODOVIEW} />
    </Routes>
  </Router>
);
