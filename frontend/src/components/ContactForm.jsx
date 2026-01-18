import { useState } from "react";

function ContactForm() {
    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phones: [
            {
                type: "work",
                number: ""
            },
            {
                type: "private",
                number: ""
            }
        ]
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    }

    function handlePhoneChange(e, index) {
        const { value } = e.target;

        setForm(prev => {
            const updatedPhones = [...prev.phones];
            updatedPhones[index] = {
                ...updatedPhones[index],
                number: value
            };

            return { ...prev, phones: updatedPhones };
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:3000/api/contacts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });

            if (!res.ok) {
                throw new Error("Failed to create contact");
            }

            const created = await res.json();
            console.log("Contact created:", created);

            // Optional: reset form
            setForm({
                first_name: "",
                last_name: "",
                email: "",
                phones: [
                    {
                        type: "work",
                        number: ""
                    },
                    {
                        type: "private",
                        number: ""
                    }
                ]
            });

        } catch (err) {
            console.error(err);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                First name:
                <input
                    name="first_name"
                    type="text"
                    value={form.first_name}
                    onChange={handleChange}
                />
            </label>

            <label>
                Last name:
                <input
                    name="last_name"
                    type="text"
                    value={form.last_name}
                    onChange={handleChange}
                />
            </label>

            <label>
                Email:
                <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                />
            </label>

            <label>
                Work phone:
                <input
                    name="work_phone"
                    type="text"
                    value={form.phones[0].number}
                    onChange={(e) => handlePhoneChange(e, 0)}
                />
            </label>

            <label>
                Private phone:
                <input
                    name="private_phone"
                    type="text"
                    value={form.phones[1].number}
                    onChange={(e) => handlePhoneChange(e, 1)}
                />
            </label>

            <button type="submit">Add contact</button>
        </form>
    );
}

export default ContactForm;
