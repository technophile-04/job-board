import { useJobs } from "../graphql/hooks";
import JobList from "./JobList";

function JobBoard() {
    const { jobs, loading, error } = useJobs();

    /*  WITHOUT USING HOOKS
        const [jobs, setJobs] = useState([]);

        useEffect(() => {
            (async () => {
                const data_jobs = await getJob();
                setJobs(data_jobs);
            })();
        }, []); 
    */

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        console.log(error.message);
        return <p>Internal error</p>;
    }

    return (
        <div>
            <h1 className="title">Job Board</h1>
            <JobList jobs={jobs} />
        </div>
    );
}

export default JobBoard;
