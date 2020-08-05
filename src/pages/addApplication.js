import React, { useState } from "react";
import { Store, set } from 'idb-keyval';


export default () => {

    const [getApplication, setApplication] = useState({});

    const today = new Date().toISOString().slice(0, 10);
    const applicationStore = new Store('job-manager', 'applications')

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submit Form")
        const newApplication = {
            "companyName": getApplication.companyName,
            "jobTitle": getApplication.jobTitle,
            "jobDescription": getApplication.jobDescription,
            "source": getApplication.source,
            "resume": getApplication.resume,
            "dateApplied": today,
            "stage": "1 - Applied"
        }

        set(getApplication.companyName, newApplication, applicationStore)
            .then(() => window.location.reload(false))
            .catch((err) => console.log('It failed!', err));

    }

    return (
        <>
            <form className="form-group form-add" onSubmit={handleSubmit}>
                <input id="inputCompanyName"
                    type="text"
                    name="companyName"
                    onChange={e => setApplication({ ...getApplication, 'companyName': e.target.value })}
                    placeholder="Company Name" />
                <input id="inputJobTitle"
                    type="text"
                    name="jobTitle"
                    onChange={e => setApplication({ ...getApplication, 'jobTitle': e.target.value })}
                    placeholder="Job Title" />
                <br />
                <input id="inpurtSource"
                    type="url"
                    name="source"
                    onChange={e => {
                        setApplication({ ...getApplication, 'source': e.target.value });
                        fetch(getApplication.source)
                        .then(response => console.log(response))
                }}
                    placeholder="Link to Source" />
                <input id="inputResume"
                    type="url"
                    name="resume"
                    onChange={e => setApplication({ ...getApplication, 'resume': e.target.value })}
                    placeholder="Link to Resume" />
                <br />
                <input id="inputJobDescription"
                    type="textarea"
                    name="jobDescription"
                    onChange={e => setApplication({ ...getApplication, 'jobDescription': e.target.value })}
                    placeholder="Job Description" />
                <br />
                <button type="submit">Submit Application</button>
            </form>
        </>
    )
}