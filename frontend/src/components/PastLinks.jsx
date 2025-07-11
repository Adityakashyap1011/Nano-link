import React from 'react';
import '../styles/PastLinks.css';

const PastLinks = ({ links }) => {
  if (!links.length) return <p>No links created yet.</p>;

  return (
    <div className="past-links">
      <h2>Your Past Shortened Links</h2>
      <ul>
        {links.map((link) => (
          <li key={link._id}>
            <a href={link.originalUrl} target="_blank">
              {link.shortUrl}
            </a>{' '}
            → {link.originalUrl}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PastLinks;

