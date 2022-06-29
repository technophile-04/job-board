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
	Mutation: {
		createJob: async (_root, { input }, context) => {
			if (!context.user) {
				throw new Error('Unauthorized');
			}
			const newJob = await Job.create({
				...input,
				companyId: context.user.companyId,
			});

			return newJob;
		},
		deleteJob: async (_root, { jobId }) => {
			const job = await Job.delete(jobId);
			return job;
		},
		updateJob: async (_root, { input }) => {
			const updatedJob = await Job.update(input);
			return updatedJob;
		},
	},
	Job: {
		// graphQL will call it while preparing each job object of jobs by passing it the job
		company: async (job) => {
			const company = await Company.findById(job.companyId);
			return company;
		},
	},

	Company: {
		jobs: async (company) => {
			const jobs = await Job.findAll((job) => job.companyId === company.id);
			return jobs;
		},
	},
};
