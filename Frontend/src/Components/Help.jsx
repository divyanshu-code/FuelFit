import React from "react";
import { FaEnvelope, FaPhoneAlt, FaInfoCircle } from "react-icons/fa";

const Help = () => {
    return (
        <div className=" bg-green-500 py-12 px-6 md:px-20 mt-40" id="help">
            <h1 className="text-xl md:text-2xl font-bold italic text-white mb-8 text-center">
                Need Help? We're Here for You
            </h1>

            
            <div className="max-w-4xl mx-auto bg-green-100 shadow-md rounded-lg p-8 text-gray-700">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-green-700">
                    <FaInfoCircle /> Contact Support
                </h2>

                <p className="mb-3 leading-tight">
                    Have any issues or suggestions? We’d love to hear from you! Reach out to us using the details below.
                </p>

                <div className="space-y-2">
                    <p className="flex items-center gap-2">
                        <FaEnvelope className="text-green-600" /> support@smartdietfit.com
                    </p>
                    <p className="flex items-center gap-2">
                        <FaPhoneAlt className="text-green-600" /> +91 98765 43210
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Help;
