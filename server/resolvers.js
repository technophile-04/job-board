import { Company, Job } from './db.js';

export const resolvers = {
	Query: {
		job: async (_root, { id }) => {
			const job = await Job.findById(id);
			return job;
		},
		jobs: async () => {
			const jobs = await Job.findAll();
			return jobs;
		},
		company: async (_root, { id }) => {
			const company = await Company.findById(id);
			return company;
		},
	},
	Job: {
		// graphQL will call it while preparing each job object of jobs by passing it the job
		company: async (job) => {
			const company = await Company.findById(job.companyId);
			return company;
		},
	},
};