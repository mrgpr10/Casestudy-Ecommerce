import React, { useState } from 'react';
import './share.css'; // Import your CSS file

function ShareButton({ productUrl, closeModal }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleShareClick = () => {
        setIsModalOpen(true);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(productUrl)
            .then(() => {
                alert('Link copied to clipboard!');
                setIsModalOpen(false);
                closeModal();
            })
            .catch((error) => {
                console.error('Error copying to clipboard:', error);
            });
    };

    return (
        <div>
            <div className="share-modal">
                <h3>Share this product</h3>
                <p>Share via:</p>
                <div className="share-options">
                    <button onClick={copyToClipboard}>Copy Link</button>
                    {/* Add more sharing options here */}
                    <a href={`mailto:?subject=Check out this product&body=${productUrl}`} className="share-option">
                        Email
                    </a>
                    <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(productUrl)}`} target="_blank" rel="noopener noreferrer" className="share-option">
                        Twitter
                    </a>
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`} target="_blank" rel="noopener noreferrer" className="share-option">
                        Facebook
                    </a>
                </div>
                <button onClick={closeModal} className="close-button">Close</button>
            </div>

        </div>
    );
}

export default ShareButton;
