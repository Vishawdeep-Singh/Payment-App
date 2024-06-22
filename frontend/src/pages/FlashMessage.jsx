import React from 'react';

export const SuccessFlashMessage = ({ message, onClose }) => {
  return (
    <div className="fixed top-5 right-5 bg-green-500 text-white p-3 rounded shadow-lg">
      {message}
      <button onClick={onClose} className="ml-3 text-sm underline">
        Close
      </button>
    </div>
  );
};
export const FailureFlashMessage = ({ message, onClose }) => {
  return (
      <div className="fixed top-0 left-0 right-0 p-4 bg-red-500 text-white rounded-lg opacity-85">
          <div className="space-y-2">
              {message.map((messages, index) => (
                  <div key={index} className="bg-red-700 p-2 rounded">
                      {messages}
                  </div>
              ))}
          </div>
          <button 
              onClick={onClose} 
              className="mt-4 bg-white text-red-500 p-2 rounded hover:bg-gray-200 transition"
          >
              Close
          </button>
      </div>
  );
};
export const SingleFailureFlashMessage = ({ message, onClose }) => {
  return (
    <div className="fixed top-5 right-5 bg-red-500 text-white p-3 rounded shadow-lg">
      {message}
      <button onClick={onClose} className="ml-3 text-sm underline">
        Close
      </button>
    </div>
  );
};
