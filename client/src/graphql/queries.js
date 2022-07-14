import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
// import { request } from "graphql-request";
import { getAccessToken } from "../auth";

const GRAPHQL_URL = "http://localhost:9000/graphql";

const JOB_DETAIL_FRAGMENT = gql`
    fragment JobDetails on Job {
        id
        title
        description
        company {
            id
            name
        }
    }
`;

const JOB_QUERY = gql`
    query JobQuery($id: ID!) {
        job(id: $id) {
            ...JobDetails
        }
    }

    ${JOB_DETAIL_FRAGMENT}
`;

const client = new ApolloClient({
    uri: GRAPHQL_URL,
    cache: new InMemoryCache(),
    /* defaultOptions: {
        query: {
            fetchPolicy: "network-only",
        },
        mutate: {
            fetchPolicy: "network-only ",
        },
        watchQuery: {
            fetchPolicy: "network-only",
        },
    }, */
});

export async function getJob() {
    const query = gql`
        query JobsQuery {
            jobs {
                id
                description
                title
                company {
                    id
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
    } = await client.query({ query, fetchPolicy: "network-only" });
    /* Fetch Policy */
    // 'cache-first' -> (default)Apollo will look data in cache first if its not there then only you make request to server
    // 'no-cache' -> don't store it in cache
    // 'network only' -> take data only from server but unlike no-cache make, store it in cache
    return jobs;
}

export async function getJobDetails(jobId) {
    console.log("⚡️ ~ file: queries.js ~ line 24 ~ getJobDetails ~ jobId", jobId);
    // const { job } = await request(GRAPHQL_URL, query, { id: jobId });
    const variables = { id: jobId };

    const {
        data: { job },
    } = await client.query({ query: JOB_QUERY, variables });

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
                ...JobDetails
            }
        }

        ${JOB_DETAIL_FRAGMENT}
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

    // Here the update function will run once the mutation query goes through and returns result
    // its has 2 args currCache and result returned by mutation
    const {
        data: { job },
    } = await client.mutate({
        mutation,
        variables,
        context,
        update: (cache, { data: { job } }) => {
            console.log("[job]", job);

            cache.writeQuery({
                query: JOB_QUERY,
                variables: { id: job.id },
                data: { job },
            });
        },
    });

    return job;
};
