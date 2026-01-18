import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ContactDetail() {

    /*
    useEffect(() => {
        async function fetchContact() {
            await fetch(`http://localhost:3000/api/contacts/${id}`)
                .then((res) => setContact(res.json()))
                .catch(err => console.log(err));
        }

        fetchContact();
    }, [id]);
     */

    async function handleDelete() {
        const confirmDelete = window.confirm("Are you sure, you want to delete contact?");

        if (!confirmDelete) return;

        await fetch(`http://localhost:3000/api/contacts/{id}`, {method: "DELETE"})
                .then(() => {console.log("Deleted contact")})
                .catch(err => console.log(err));
    }

    return <div>
        <h2>Contact Details</h2>

        <button onClick={handleDelete} style={{ backgroundColor: "red", color: "white" }}>
            Slet kontakt
        </button>
    </div>
}


export default ContactDetail;
