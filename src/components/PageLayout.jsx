import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";

import { AuthenticatedTemplate, useIsAuthenticated, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { SignInButton } from "./SignInButton";
import { SignOutButton } from "./SignOutButton";
import { ProfileData } from "./ProfileData";
import { loginRequest } from "../containers/login/authConfig";
import { callMsGraph } from "../containers/login/graph";

/**
 * Renders the navbar component with a sign-in or sign-out button depending on whether or not a user is authenticated
 * @param props
 */
export const PageLayout = ( props ) => {
    const isAuthenticated = useIsAuthenticated();
    const {instance, accounts} = useMsal();
    const [graphData, setGraphData] = useState( null );

    const requestProfileData = () => {
        // Silently acquires an access token which is then attached to a request for MS Graph data
        instance.acquireTokenSilent( {
            ...loginRequest,
            account: accounts[0]
        } ).then( ( response ) => {
            callMsGraph( response.accessToken ).then( response => setGraphData( response ) );
        } );
    }

    return (
        <>
            <AuthenticatedTemplate>
                <Navbar bg="primary" variant="dark">
                    <a className="navbar-brand" href="/">Service Catalog</a>
                    {isAuthenticated ?
                        graphData ?
                            <ProfileData graphData={graphData}/>
                            : requestProfileData()
                        : <div/>
                    }
                    {isAuthenticated ? <SignOutButton/> : <SignInButton/>}
                </Navbar>
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
