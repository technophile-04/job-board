import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getJobDetails } from "../graphql/queries";

function JobDetail() {
    const { jobId } = useParams();

    const [job, setJob] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchJob = useCallback(async () => {
        const data_job = await getJobDetails(jobId);
        setJob(data_job);
        setLoading(false);
    }, [jobId]);

    useEffect(() => {
        fetchJob();
    }, [fetchJob]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1 className="title">{job?.title}</h1>
            <h2 className="subtitle">
                <Link to={`/companies/${job?.company?.id}`}>{job?.company?.name}</Link>
            </h2>
            <div className="box">{job?.description}</div>
        </div>
    );
}

export default JobDetail;
