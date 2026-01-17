import { useEffect, useState } from 'react'; 

export default function Form() {
    const [form, setForm] = useState({ firstName: "", lastName: "", email: "", workPhone: "", mobile: "" });
    
    function handleChange(e) { 
        setForm({...form, [e.target.name]: e.target.value }); 
    }

    async function handleSubmit(e) { 
        e.preventDefault(); // stops browser from reloading page

        const payload = {
            first_name: form.firstName,
            last_name: form.lastName,
            email: form.email,
            phones: [
                { type: "work", number: form.workPhone },
                { type: "mobile", number: form.mobile }
            ]
        };

        const res = await fetch("/api/contacts", { 
            method: "POST", 
            headers: { "Content-Type": "application/json" }, 
            body: JSON.stringify(payload) 
        }); 

        if (res.ok) { 
            // Clear the form after successful submit 
            setForm({ firstName: "", lastName: "", email: "", workPhone: "", mobile: "" }); 
        }
    }
    
    return (
        <>
        <form onSubmit={handleSubmit}> 
            <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" /> 
            <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name" /> 
            <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" /> 
            <input name="workPhone" value={form.workPhone} onChange={handleChange} placeholder="Work Phone" /> 
            <input name="mobile" value={form.mobile} onChange={handleChange} placeholder="Mobile" /> 
            
            <button type="submit">Add contact</button> 
        </form>
        </>
    );
}