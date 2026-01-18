import { useEffect, useState } from 'react'; 

export default function Contact({id}) {
    const [contact, setContact] = useState(null);

    useEffect(() => { 
        async function loadContact() {
            const res = await fetch(`/api/contacts/${id}`); // response object: status code, headers, body stream
            const data = await res.json(); // reads response body stream (which is json text) and then parses into a javascript value, which in this case is an object.
            console.log(data);
            setContact(data);
        }
        loadContact();
    }, [id]); 

    if (contact === null) return <p>Loading…</p>;

    return(
        <>
            <p>First name: {contact.first_name}</p>
            <p>Surname: {contact.last_name}</p>
            <p>Email: {contact.email}</p>
            <p>Work phone: {contact.phones[0].number}</p>
            <p>Mobile: {contact.phones.find(p => p.type === "mobile").number}</p>
        </>
    );
}