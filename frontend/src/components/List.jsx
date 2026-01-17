import { useEffect, useState } from 'react'; 

export default function List() {
    const [contacts, setContacts] = useState([]); 
    
    useEffect(() => { 
        async function loadContacts() {
            const res = await fetch('/api/contacts'); // response object: status code, headers, body stream
            const data = await res.json(); // reads response body stream (which is json text) and then parses into a javascript value, which in this case is an array of objects.
            setContacts(data);
        }
        loadContacts();
    }, []); 

    const listItems = contacts.map(contact => 
        <li key={contact._id}>
            {contact.first_name} {contact.last_name}
        </li>
    );

    return( 
        <>
        <h2>List</h2>
        <ul>{listItems}</ul>
        </>
    );
}