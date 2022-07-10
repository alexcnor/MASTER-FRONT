import {Helmet} from "react-helmet";
import React from "react";

export default function Home() {
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
