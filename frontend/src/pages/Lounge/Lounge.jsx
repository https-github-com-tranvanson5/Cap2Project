import { Link } from "react-router-dom"
import React from 'react'

export default function Lounge() {
    return (
        <section>
            <h1>The Lounge</h1>
            <br />
            <p>Admins and Recruiter can hang out here.</p>
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </section>
    )
}
