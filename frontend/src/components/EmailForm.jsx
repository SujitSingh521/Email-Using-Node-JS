import React, { useState } from 'react';
import axios from 'axios';

const EmailForm = () => {
    const [formData, setFormData] = useState({
        to: '',
        subject: '',
        text: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/send-email', formData);
            alert(response.data.message);
        } catch (error) {
            alert('Failed to send email');
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Send Email</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>To:</label>
                    <input
                        type="email"
                        name="to"
                        value={formData.to}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Subject:</label>
                    <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Message:</label>
                    <textarea
                        name="text"
                        value={formData.text}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Send Email</button>
            </form>
        </div>
    );
};

export default EmailForm;
