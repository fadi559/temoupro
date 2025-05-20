'use client';

import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';

const initialState = {
    message: '',
};

type SignUpProps = {
    action: (prevState: any, formData: FormData) => Promise<{ message: string } | undefined>;
};

const SignUpPage44 = ({ action }: SignUpProps) => {
    const [state, setState] = useState(initialState);
    const [isPending, setIsPending] = useState(false);

    const handleSubmit = async (formData: FormData) => {
        setIsPending(true);
        try {
            const result = await action(initialState, formData);
            if (result) {
                setState(result);
            }
        } catch (error) {
            setState({ message: 'An error occurred. Please try again.' });
        } finally {
            setIsPending(false);
        }
    };

    return (
        <form
            action={handleSubmit}
            className="max-w-md mx-auto my-16 p-8 bg-white rounded-2xl shadow-lg border border-gray-100"
        >
            <h1 className="text-3xl font-bold text-black text-center mb-2">Create Account</h1>
            <p className="text-center text-sm text-rose-600 font-semibold mb-1">🔥 JOIN THE DEAL FAMILY 🔥</p>
            <p className="text-center text-sm text-gray-500 mb-6">
                Sign up to get exclusive deals and member benefits.
            </p>

            <div className="space-y-5">
                {/* Email */}
                <div className="space-y-1">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email address
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        autoComplete="email"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black transition-colors"
                        placeholder="Enter your email"
                    />
                </div>

                {/* Password */}
                <div className="space-y-1">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        autoComplete="new-password"
                        required
                        className="w-full px-4 py-3 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-colors"
                        placeholder="Create a password"
                    />
                </div>

                {/* Copywriting */}
                <div className="text-center text-xs text-gray-500 space-y-1">
                    <p>⚡ Get 15% off your first order!</p>
                    <p>🛍 Free shipping on orders over $15.00</p>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isPending}
                    className={`w-full bg-rose-600 text-white py-3 rounded-lg hover:bg-rose-700 transition-colors font-medium flex items-center justify-center gap-2 ${
                        isPending ? 'cursor-not-allowed opacity-75' : ''
                    }`}
                >
                    {isPending ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            CREATING ACCOUNT...
                        </>
                    ) : (
                        'CREATE ACCOUNT'
                    )}
                </button>

                {/* Error Message */}
                {state?.message && state.message.length > 0 && (
                    <p className="text-center text-sm text-red-600">{state.message}</p>
                )}
            </div>
        </form>
    );
};

export default SignUpPage44;