import React, { useState } from "react";

const Poll = () => {
  const initialOptions = [
    { text: "Red", votes: 0 },
    { text: "Blue", votes: 0 },
    { text: "Green", votes: 0 },
  ];

  const [question] = useState("What's your favorite color?");
  const [options, setOptions] = useState(initialOptions);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleVote = () => {
    if (selectedOption !== null) {
      const updatedOptions = [...options];
      updatedOptions[selectedOption].votes++;
      setOptions(updatedOptions);
      setSelectedOption(null); // Reset selected option
      // Add your API call here to update the server with the vote.
    }
  };

  return (
    <div className="poll max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">{question}</h2>
      <ul>
        {options.map((option, index) => (
          <li key={index} className="mb-2">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="pollOption"
                value={index}
                checked={selectedOption === index}
                onChange={() => setSelectedOption(index)}
                className="mr-2 form-radio text-blue-500"
              />
              {option.text}
            </label>
          </li>
        ))}
      </ul>
      <button
        onClick={handleVote}
        className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full mt-4"
      >
        Vote
      </button>
      <p className="mt-2">Votes: {options[selectedOption]?.votes || 0}</p>
    </div>
  );
};

export default Poll;
