import React  from "react";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { PageLayout } from "../../components/PageLayout";
import "../../styles/App.css";

/**
 * Renders information about the signed-in user or a button to retrieve data about the user
 */
const ProfileContent = () => {
    const {  accounts } = useMsal();
    return (
        <>
            <h5 className="card-title">Welcome {accounts[0].name}</h5>
        </>
    );
};

/**
 * If a user is authenticated the ProfileContent component above is rendered. Otherwise a message indicating a user is not authenticated is rendered.
 */
const MainContent = () => {    
    return (
        <div className="App">
            <AuthenticatedTemplate>
                <ProfileContent />
            </AuthenticatedTemplate>

            <UnauthenticatedTemplate>
                <h5 className="card-title">Please sign-in.</h5>
            </UnauthenticatedTemplate>
        </div>
    );
};

export default function Index() {
    return (
        <PageLayout>
            <MainContent />
        </PageLayout>
    );
}
