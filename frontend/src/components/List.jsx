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

    const uniqueFirstLettersSet = new Set();
    for(let i=0; i<contacts.length; i++) {
        uniqueFirstLettersSet.add(contacts[i].first_name[0]);
    }
    const uniqueFirstLetters = [...uniqueFirstLettersSet];

    return( 
        <>
        {uniqueFirstLetters.map(letter =>
            <section key={letter}>
                <h2>{letter}</h2>
                <ul>
                    {contacts
                        .filter(c => c.first_name[0] === letter)
                        .map(c => 
                            <li key={c._id}>{c.first_name}</li>
                        )}
                </ul>
            </section>
        )}
        </>
    );
}