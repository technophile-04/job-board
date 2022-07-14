import { ApolloProvider } from "@apollo/client";
import "bulma/css/bulma.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { client } from "./graphql/queries";
import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </BrowserRouter>
);
