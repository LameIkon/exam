import { useEffect, useState } from "react";

function ContactList() {
    const [contacts, setContacts] = useState([]);
    const [filterType, setFilterType] = useState("");


    async function fetchAllContacts() {
        fetch("http://localhost:3000/api/contacts")
            .then(res => res.json())
            .then(data => setContacts(data))
            .catch(err => console.log(err));
    }


    useEffect(() => {
        fetchAllContacts();
    }, []);

    async function handleSearchFilter(){
        if(!filterType){
            fetchAllContacts();
            return;
        }

        await fetch(`http://localhost:3000/api/contacts/search?type=${filterType}`)
            .then(res => res.json())
            .then(data => setContacts(data))
            .catch(err => console.log(err));

    }



    const grouped = contacts.reduce((acc, c) => {
        const letter = c.first_name[0].toUpperCase();
        if (!acc[letter]) acc[letter] = [];
        acc[letter].push(c);
        return acc;
    }, {});

    const letters = Object.keys(grouped);

    return (
        <div>
            {/* Filter UI */}
            <div style={{ marginBottom: "1rem" }}>
                <label>
                    Filtrer efter telefontype:
                    <select value={filterType} onChange={(e) => setFilterType(e.target.value)}
                    >
                        <option value="">Alle</option>
                        <option value="work">Work</option>
                        <option value="mobile">Mobile</option>
                        <option value="private">Private</option>
                        <option value="home">Home</option>
                    </select>
                </label>

                <button onClick={handleSearchFilter} style={{ marginLeft: "10px" }}>
                    Søg
                </button>
            </div>
            <div>
                {letters.map(letter => (
                    <section key={letter}>
                        <h2>{letter}</h2>
                        <ul>
                            {grouped[letter].map(c => (
                                <li key={c._id}>{c.first_name} {c.last_name}</li>
                            ))}
                        </ul>
                    </section>
                ))}
            </div>
        </div>
    );
}

export default ContactList;