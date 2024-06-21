import React from 'react';

export const FlashMessage = ({ message, onClose }) => {
  return (
    <div className="fixed top-5 right-5 bg-green-500 text-white p-3 rounded shadow-lg">
      {message}
      <button onClick={onClose} className="ml-3 text-sm underline">
        Close
      </button>
    </div>
  );
};