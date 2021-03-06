import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateJob } from "../graphql/hooks";
// import { createJob, CREATE_JOB_MUTATION, JOB_QUERY } from "../graphql/queries";
// import { useMutation } from "@apollo/client";
// import { getAccessToken } from "../auth"

function JobForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();
    const { createJob, loading } = useCreateJob();

    const handleSubmit = async (event) => {
        event.preventDefault();
        // const job = await createJob({ title, description });
        const job = await createJob(title, description);
        console.log("⚡️ ~ file: JobForm.js ~ line 11 ~ handleSubmit ~ job", job);
        navigate(`/jobs/${job.id}`, { replace: true });
    };

    return (
        <div>
            <h1 className="title">New Job</h1>
            <div className="box">
                <form>
                    <div className="field">
                        <label className="label">Title</label>
                        <div className="control">
                            <input
                                className="input"
                                type="text"
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Description</label>
                        <div className="control">
                            <textarea
                                className="textarea"
                                rows={10}
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <button
                                className="button is-link"
                                onClick={handleSubmit}
                                disabled={loading}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default JobForm;
