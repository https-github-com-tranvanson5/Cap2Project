import { Link } from "react-router-dom"

const Recruiter = () => {
    return (
        <section>
            <h1>Recruiters Page</h1>
            <br />
            <p>You must have been assigned an Recruiter role.</p>
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </section>
    )
}

export default Recruiter
