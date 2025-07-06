import React, { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;

    // TODO: Send email to backend / API
    console.log('Subscribed:', email);
    setEmail('');
  };

  return (
    <section className="bg-white border border-gray-200 rounded-lg p-6 max-w-xl mx-auto text-center mt-16 shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-800">Subscribe to our Newsletter</h2>
      <p className="text-gray-500 text-sm mt-1">
        Get the latest blogs and updates directly to your inbox.
      </p>

      <form onSubmit={handleSubscribe} className="mt-6 flex flex-col sm:flex-row items-center gap-3">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
          required
        />
        <button
          type="submit"
          className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
        >
          Subscribe
        </button>
      </form>
    </section>
  );
};

export default Newsletter;
