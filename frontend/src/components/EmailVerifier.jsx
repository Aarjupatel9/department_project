import React from 'react';

const EmailVerifier = () => {
    console.log("IN verifyemail");
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="p-8 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold mb-4">Please Verify Your Email</h1>
                <p className="text-gray-600">
                    To complete your registration, please verify your email by visiting your inbox and clicking the verification link we sent you.
                </p>
            </div>
        </div>
    );
};

export default EmailVerifier;
