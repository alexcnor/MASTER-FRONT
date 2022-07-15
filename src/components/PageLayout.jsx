import React, {useState} from "react";
import Navbar from "react-bootstrap/Navbar";
import {AuthenticatedTemplate, useIsAuthenticated, UnauthenticatedTemplate, useMsal} from "@azure/msal-react";
import {SignInButton} from "./SignInButton";
import {SignOutButton} from "./SignOutButton";
import {ProfileData} from "./ProfileData";
import {loginRequest} from "../containers/login/authConfig";
import {callMsGraph} from "../containers/login/graph";
import {Routes, Route, Link} from "react-router-dom"
import Componente from "../routers/componente";
import Home from "../routers/home"
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faFile, faPlus } from '@fortawesome/free-solid-svg-icons'

/**
 * Renders the navbar component with a sign-in or sign-out button depending on whether or not a user is authenticated
 * @param props
 */
export const PageLayout = (props) => {
  const isAuthenticated = useIsAuthenticated();
  const {instance, accounts} = useMsal();
  const [graphData, setGraphData] = useState(null);

  const requestProfileData = () => {
    // Silently acquires an access token which is then attached to a request for MS Graph data
    instance.acquireTokenSilent({
      ...loginRequest,
      account: accounts[0]
    }).then((response) => {
      callMsGraph(response.accessToken).then(response => setGraphData(response));
    });
  }

  const [isShown, setIsShown] = useState(true);

  return (
    <>
      <AuthenticatedTemplate>
      <Navbar bg="primary" variant="dark">
        <a className="navbar-brand" href="/">Service Catalog</a>
        <div className="user-data">
          {isAuthenticated ?
            graphData ?
              <ProfileData graphData={graphData}/>
              : requestProfileData()
            : <div/>
          }
        </div>

        {isAuthenticated ? <SignOutButton/> : <SignInButton/>}
      </Navbar>
        <div className="main-container d-flex" style={{ minHeight: "calc(100vh - 56px)" }}>
          <ProSidebar style={{ position: 'absolute', height: 'calc(100% - 56px)' }} collapsed={isShown} onMouseEnter={() => setIsShown(false)} onMouseLeave={() => setIsShown(true)}>
            <Menu iconShape="square">
              <MenuItem icon={<FontAwesomeIcon icon={faHome} />}>
                Home
                <Link to="/home" />
              </MenuItem>
              <SubMenu title="Componentes" icon={<FontAwesomeIcon icon={faFile} />}>
                <MenuItem icon={<FontAwesomeIcon icon={faPlus} />}>
                Crear
                <Link to="/componentes" />
              </MenuItem>
              </SubMenu>
            </Menu>
          </ProSidebar>
          <div style={{marginLeft: '80px'}} className="w-100">
              <Routes>
                <Route path="home" element={ <Home/> } />
                <Route path="componentes" element={ <Componente/> } />
              </Routes>
          </div>
        </div>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <Navbar bg="primary" variant="dark">
          <a className="navbar-brand" href="/">Service Catalog</a>
        </Navbar>
        <br/>
        <br/>
        {props.children}
        <div>
          <center>{isAuthenticated ? <SignOutButton/> : <SignInButton/>}</center>
        </div>
      </UnauthenticatedTemplate>
    </>
  );
};
