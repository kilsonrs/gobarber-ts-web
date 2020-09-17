import React from 'react';
import {
  Redirect,
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';
// import { Container } from './styles';
interface RouteProps extends ReactDOMRouteProps {
  component: React.ComponentType;
  isPrivate?: boolean;
}

// isPrivate  ===  isSigned
//      true  ===  true   -> OK, pass
//      true  ===  false  -> redirect to login
//     false  ===  true   -> retirect to dashboard
//     false  ===  false  -> OK, pass

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();
  const isSigned = !!user;
  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === isSigned ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
