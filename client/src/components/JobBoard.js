import JobList from "./JobList";
import { getJob } from "../graphql/queries";
import { useEffect, useState } from "react";

function JobBoard() {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        (async () => {
            const data_jobs = await getJob();
            setJobs(data_jobs);
        })();
    }, []);

    return (
        <div>
            <h1 className="title">Job Board</h1>
            <JobList jobs={jobs} />
        </div>
    );
}

export default JobBoard;
