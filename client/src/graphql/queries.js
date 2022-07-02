import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
// import { request } from "graphql-request";
import { getAccessToken } from "../auth";

const GRAPHQL_URL = "http://localhost:9000/graphql";

const client = new ApolloClient({
    uri: GRAPHQL_URL,
    cache: new InMemoryCache(),
});

export async function getJob() {
    const query = gql`
        query JobsQuery {
            jobs {
                id
                description
                title
                company {
                    name
                }
            }
        }
    `;

    // const { jobs } = await request(GRAPHQL_URL, query);

    // const res = await client.query({query});
    // console.log("⚡️ ~ file: queries.js ~ line 28 ~ getJob ~ res", res);

    const {
        data: { jobs },
    } = await client.query({ query });

    return jobs;
}

export async function getJobDetails(jobId) {
    console.log("⚡️ ~ file: queries.js ~ line 24 ~ getJobDetails ~ jobId", jobId);
    const query = gql`
        query JobQuery($id: ID!) {
            job(id: $id) {
                id
                title
                description
                company {
                    id
                    name
                }
            }
        }
    `;
    // const { job } = await request(GRAPHQL_URL, query, { id: jobId });
    const variables = { id: jobId };

    const {
        data: { job },
    } = await client.query({ query, variables });

    return job;
}

export async function getCompanyDetails(companyId) {
    const query = gql`
        query CompanyQuery($id: ID!) {
            company(id: $id) {
                id
                description
                name
                jobs {
                    description
                    id
                    title
                }
            }
        }
    `;

    // const { company } = await request(GRAPHQL_URL, query, { id: companyId });
    const variables = { id: companyId };
    const {
        data: { company },
    } = await client.query({ query, variables });
    return company;
}

export const createJob = async (input) => {
    const mutation = gql`
        mutation CreateJobMutation($input: CreateJobInput!) {
            job: createJob(input: $input) {
                id
            }
        }
    `;

    const variables = { input };
    // const headers = {
    //     Authorization: "Bearer " + getAccessToken(),
    // };

    // const { job } = await request(GRAPHQL_URL, query, variables, headers);

    const context = {
        headers: {
            Authorization: "Bearer " + getAccessToken(),
        },
    };

    const {
        data: { job },
    } = await client.mutate({ mutation, variables, context });

    return job;
};
