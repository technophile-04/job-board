import { request, gql } from "graphql-request";

const GRAPHQL_URL = "http://localhost:9000/graphql";

export async function getJob() {
    const query = gql`
        query {
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

    const { jobs } = await request(GRAPHQL_URL, query);
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
    const { job } = await request(GRAPHQL_URL, query, { id: jobId });
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

    const { company } = await request(GRAPHQL_URL, query, { id: companyId });
    return company;
}

export const createJob = async (input) => {
    const query = gql`
        mutation CreateJobMutation($input: CreateJobInput!) {
            job: createJob(input: $input) {
                id
            }
        }
    `;

    const variables = { input };

    const { job } = await request(GRAPHQL_URL, query, variables);
    return job;
};
