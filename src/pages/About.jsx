import React from 'react';

function About() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">About BookReviews</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-gray-600 mb-4">
          BookReviews is a platform where book lovers can discover new books,
          share their thoughts, and connect with other readers.
        </p>
        <p className="text-gray-600">
          Join our community to start sharing your own book reviews and
          recommendations with readers from around the world.
        </p>
      </div>
    </div>
  );
}

export default About;