import React from 'react';
import './ChatHeader.css'; // Assuming you have a separate CSS file

const ChatHeader = () => {
    return (
        <div className="chat-header">
            <div className="avatar">
                {/*<img src="/path-to-avatar.jpg" alt="Shopsy Avatar" />*/}
            </div>
            <div className="chat-info">
                <h2>ShopEase</h2>
                <p>Online</p>
            </div>
        </div>
    );
};

export default ChatHeader;
    