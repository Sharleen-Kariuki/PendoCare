import React, { useState } from 'react';
import { School, CheckCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SchoolAccessForm = () => {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contactPerson: '',
        phone: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await axios.post('http://localhost:3000/api/request-access', formData);
            setSubmitted(true);
        } catch (err) {
            console.error("Submission error:", err);
            setError('Failed to submit request. Please check your connection.');
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
                <div className="card max-w-md w-full text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-6">
                        <CheckCircle size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Request Sent!</h2>
                    <p className="text-slate-600 mb-8">
                        Thank you for registering <strong>{formData.name}</strong>. Our admin team will review your details and email your Access Code shortly.
                    </p>
                    <Link to="/" className="btn-primary">Back to Home</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <div className="max-w-7xl mx-auto px-4 py-6 w-full">
                <Link to="/" className="text-sm text-slate-500 hover:text-brand-600">&larr; Back to Home</Link>
            </div>

            <div className="flex-1 flex items-center justify-center p-4">
                <div className="card max-w-lg w-full">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center text-brand-600">
                            <School size={20} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">School Registration</h1>
                            <p className="text-sm text-slate-500">Get access for your students today.</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">School Name</label>
                            <input
                                required
                                type="text"
                                placeholder="e.g. Nairobi High School"
                                className="input-field"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Official Email Address</label>
                            <input
                                required
                                type="email"
                                placeholder="info@school.ac.ke"
                                className="input-field"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Contact Person</label>
                                <input
                                    required
                                    type="text"
                                    placeholder="Principal Name"
                                    className="input-field"
                                    value={formData.contactPerson}
                                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                                <input
                                    required
                                    type="tel"
                                    placeholder="+254 7..."
                                    className="input-field"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={loading}
                            >
                                {loading ? 'Submitting...' : 'Submit Request'}
                            </button>
                        </div>
                        {error && (
                            <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm flex items-center gap-2">
                                <AlertCircle size={16} />
                                {error}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SchoolAccessForm;
