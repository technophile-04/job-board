import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getCompanyDetails } from "../graphql/queries";

function CompanyDetail() {
    const { companyId } = useParams();

    const [company, setCompany] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const data_company = await getCompanyDetails(companyId);
            setCompany(data_company);
            setLoading(false);
        })();
    }, [companyId]);

    if (loading) {
        return <p>Loading....</p>;
    }

    return (
        <div>
            <h1 className="title">{company.name}</h1>
            <div className="box">{company.description}</div>
        </div>
    );
}

export default CompanyDetail;
