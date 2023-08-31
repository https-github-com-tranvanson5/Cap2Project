import { Link } from "react-router-dom"
import React from 'react'

export default function Recruiter() {
    return (
        <section>
            <h1>Recruiter Page</h1>
            <br />
            <p>You must have been assigned an Recruiter role.</p>
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </section>
    )
}
