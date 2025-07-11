import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import PastLinks from '../components/PastLinks.jsx';
import '../styles/Dashboard.css';
import axios from 'axios';

const Dashboard = () => {
  const [url, setUrl] = useState('');
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/api/url/mylinks', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLinks(response.data.links);
      } catch (err) {
        console.error('Error fetching links:', err);
      }
    };

    fetchLinks();
  }, []);

  
  const handleClick = async () => {
    if (!url) return;

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:3000/api/url/shorten',
        { originalUrl: url },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newLink = response.data.link;
      setLinks((prev) => [newLink, ...prev]);
      setUrl('');
    } catch (err) {
      console.error(err);
      setError("Some Error Occured");
    }

    setLoading(false);
  };

  return (
    <div className="dashboard">
      <Navbar />

      <div className="main">
        <h1>Enter Your Long URL</h1>
        <input
          type="url"
          value={url}
          placeholder="https://example.com"
          onChange={(e) => setUrl(e.target.value)}
        />
        <button onClick={handleClick}>
          {loading ? 'Shortening...' : 'Shorten!'}
        </button>
        {error && <div className="error">{error}</div>}
      </div>

      <PastLinks links={links} />

      <footer>
        <p className="footer">Made with ❤️ by Aditya</p>
      </footer>
    </div>
  );
};

export default Dashboard;
