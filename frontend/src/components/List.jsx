import { useEffect, useState } from 'react'; 

export default function List() {
    const [contacts, setContacts] = useState([]);
    const [filter, setFilter] = useState(""); 
    
    useEffect(() => { 
        async function loadContacts() {
            const res = await fetch('/api/contacts'); // response object: status code, headers, body stream
            const data = await res.json(); // reads response body stream (which is json text) and then parses into a javascript value, which in this case is an array of objects.
            setContacts(data);
        }
        loadContacts();
    }, []); 

    useEffect(() => { 
        if (!filter) {
            console.log("skip getting by tag");
            return; // don't fetch until user picks a filter
        }

        async function load() { 
            const res = await fetch(`/api/contacts/search?type=${filter}`); 
            const data = await res.json(); 
            setContacts(data); 
        } 
        load(); 
    }, [filter]);

    const uniqueFirstLettersSet = new Set();
    for(let i=0; i<contacts.length; i++) {
        uniqueFirstLettersSet.add(contacts[i].first_name[0]);
    }
    const uniqueFirstLetters = [...uniqueFirstLettersSet];

    return( 
        <>
        <select value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="">Filter:</option>
            <option value="work">Work</option>
            <option value="mobile">Mobile </option>
        </select>

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