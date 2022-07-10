/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';


export function HomePage() {
    return (
        <article>
            <Helmet>
                <title>Home Page</title>
                <meta
                    name="description"
                    content="A React.js Boilerplate application homepage"
                />
            </Helmet>
            <div>
                <center>HOME</center>
            </div>
        </article>
    );
}

export default compose(
    memo,
)( HomePage );
