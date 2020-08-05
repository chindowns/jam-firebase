import React, { useState, useEffect } from "react";
import { Store, del, set } from 'idb-keyval';
import { useHistory } from 'react-router-dom';

export default (props) => {

    const [application, setApplication] = useState({});
    const applicationStore = new Store('job-manager', 'applications')
    const history = useHistory();
    let tempApp = {}

    props.location.data.application ? tempApp = props.location.data.application : tempApp = {};

    useEffect(() => {
        setApplication(tempApp);
    }, [tempApp.length])

    const handleSubmit = (e) => {
        e.preventDefault()
        const updateApplication = {
            "companyName": application.companyName,
            "jobTitle": application.jobTitle,
            "jobDescription": application.jobDescription,
            "source": application.source,
            "resume": application.resume,
            "dateApplied": application.dateApplied,
            "stage": application.stage
        }

        del(application.companyName, applicationStore)
            .then(() => {
                set(application.companyName, updateApplication, applicationStore)
                    .then(() => history.replace('/view'))
                    .catch((err) => console.log('It failed!', err));
            })
            .catch((err) => console.log('Failed to delete', err));


    }

    return (
        <>
            <form className="form-group" onSubmit={handleSubmit}>
                <input id="editCompanyName"
                    readOnly="readOnly"
                    type="text"
                    name="companyName" 
                    value={tempApp.companyName} />
                <input id="editJobTitle"
                    type="text"
                    name="jobTitle"
                    defaultValue={tempApp.jobTitle}
                    onChange={e => setApplication({ ...application, 'jobTitle': e.target.value ? e.target.value : tempApp.jobTitle })} />
                <br />
                <input id="inpurtSource"
                    type="url"
                    name="source"
                    defaultValue={tempApp.source}
                    onChange={e => setApplication({ ...application, 'source': e.target.value ? e.target.value : tempApp.source })} />
                <input id="editResume"
                    type="url"
                    name="resume"
                    defaultValue={tempApp.resume}
                    onChange={e => setApplication({ ...application, 'resume': e.target.value ? e.target.value : tempApp.resume })} />
                <br />
                <input id="editStage"
                    type="select"
                    name="stage"
                    list="stages"
                    placeholder={tempApp.stage}
                    onChange={e => setApplication({ ...application, 'stage': e.target.value ? e.target.value ? e.target.value : tempApp.stage : tempApp.stage })} />
                <datalist id="stages">
                    <option value="0 - Declined" />
                    <option value="1 - Applied" />
                    <option value="2 - Recruiter" />
                    <option value="3 - Interview" />
                    <option value="4 - Hired" />
                </datalist>

                <br />
                <input id="editJobDescription"
                    type="textarea"
                    name="jobDescription"
                    defaultValue={tempApp.jobDescription}
                    onChange={e => setApplication({ ...application, 'jobDescription': e.target.value ? e.target.value : tempApp.jobDescription })} />
                <br />
                <button type="submit">Submit Application</button>
            </form>
        </>
    )
}