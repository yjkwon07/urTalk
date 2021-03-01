import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { SWRConfig } from 'swr';
import loadable from '@loadable/component';
import { HOME_URL, LOGIN_URL, SIGNUP_URL, WORKSPACE_URL } from '@utils/url';
import fetcher from '@utils/fetcher';

const LogIn = loadable(() => import('@pages/LogIn'));
const SignUp = loadable(() => import('@pages/SignUp'));
const Workspace = loadable(() => import('@layouts/Workspace'));

const App = () => {
  return (
    <SWRConfig
      value={{
        dedupingInterval: 2000,
        refreshInterval: 3000,
        fetcher,
      }}
    >
      <Switch>
        <Redirect exact path={HOME_URL} to={LOGIN_URL} />
        <Route path={LOGIN_URL} component={LogIn} />
        <Route path={SIGNUP_URL} component={SignUp} />
        <Route path={WORKSPACE_URL} component={Workspace} />
      </Switch>
    </SWRConfig>
  );
};

export default App;
