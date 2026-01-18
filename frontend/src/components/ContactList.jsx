import { useEffect, useState } from "react";

function ContactList() {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {

        fetch("http://localhost:3000/api/contacts")
            .then(res => res.json())
            .then(data => setContacts(data))
            .catch(err => console.log(err));
    }, []);

    console.log(contacts);

    const grouped = contacts.reduce((acc, c) => {
        const letter = c.first_name[0].toUpperCase();
        if (!acc[letter]) acc[letter] = [];
        acc[letter].push(c);
        return acc;
    }, {});

    const letters = Object.keys(grouped);

    return (
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
    );
}

export default ContactList;