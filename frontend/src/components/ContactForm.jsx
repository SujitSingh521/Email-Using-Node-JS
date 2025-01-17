import React, {useState} from 'react';

const ContactForm =()=>{
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        message: '',
    });

    const [status, setStatus] = useState('');

    const handleChange =(e)=>{
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/contact',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if(response.ok){
                setStatus('Email sent successfully!');
                setFormData({fullName: '', email: '', phone: '', message: ''});
            }else{
                setStatus('Failed to send email.');
            }
        } catch (error) {
            console.error('Error:', error);
            setStatus('Error sending email.');
        }
    };

    return (
        <div className="contact-form">
            <h1>Contact Us</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Full Name*</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email Address*</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Phone Number</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Message*</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <button type="submit">Submit</button>
            </form>
            {status && <p>{status}</p>}
        </div>
    );
};

export default ContactForm;
