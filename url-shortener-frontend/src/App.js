import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [longUrl, setLongUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [originalUrl, setOriginalUrl] = useState('');
    const [result, setResult] = useState(null);

    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://127.0.0.1:3000';

    const handleGetTinyUrl = async () => {
      console.log("Getting Tiny URL");
      console.log(backendUrl);
        try {
            const response = await axios.get(`${backendUrl}/url`, { originalUrl: longUrl });
            setResult(response.data.shortUrl);
            setShortUrl('');
        } catch (error) {
            console.error('Error generating tiny URL', error);
            setResult('Error generating tiny URL');
        }
    };

    const handleGetOriginalUrl = async () => {
        try {
            const response = await axios.post(`/url/${shortUrl}`);
            setResult(response.data.originalUrl);
            setOriginalUrl(response.data.originalUrl);
        } catch (error) {
            console.error('Error fetching original URL', error);
            setResult('Error fetching original URL');
        }
    };

    const handleRedirect = () => {
        if (originalUrl) {
            window.location.href = originalUrl;
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>URL Shortener</h1>
                <div className="box">
                    <h2>Get Tiny URL</h2>
                    <input
                        type="text"
                        value={longUrl}
                        onChange={(e) => setLongUrl(e.target.value)}
                        placeholder="Enter long URL"
                    />
                    <button onClick={handleGetTinyUrl}>Get Tiny URL</button>
                </div>
                <div className="box">
                    <h2>Get Original URL</h2>
                    <input
                        type="text"
                        value={shortUrl}
                        onChange={(e) => setShortUrl(e.target.value)}
                        placeholder="Enter short URL"
                    />
                    <button onClick={handleGetOriginalUrl}>Get Original URL</button>
                </div>
                {result && (
                    <div className="result-box">
                        <p>{result}</p>
                        {originalUrl && <button onClick={handleRedirect}>Redirect</button>}
                    </div>
                )}
            </header>
        </div>
    );
}

export default App;
