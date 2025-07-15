import React from 'react';
import '../styles/PastLinks.css';

const PastLinks = ({ links }) => {
  return (
    <div className="past-links">
      <h2>Your Shortened Links</h2>
      <div className="scrollable-links">
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {links.map((link) => (
            <li key={link._id} className="link-item">
              <div className="link-row">
                <a href={link.originalUrl} target="_blank" rel="noreferrer">
                  {link.originalUrl}
                </a>{' '}
                → {link.shortUrl}
              </div>
              <div className="link-meta">
                <div>📊 Clicks: {link.clicks || 0}</div>
                <div>🔍 Referrers: {link.referrers?.slice(-3).join(', ') || 'None'}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PastLinks;
