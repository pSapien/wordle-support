import { useEffect, useState } from "preact/hooks";

const ALL_LETTERS: string[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export function App() {
  const [inputValue, setInputValue] = useState<string>("");

  function handleInputChange(word: string) {
    setInputValue(word.toUpperCase().replace(/[^A-Z]/g, ""));
  }

  function onButtonClick(newLetter: string) {
    setInputValue((prev) => prev + newLetter);
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const queryParamsWords = queryParams.get("word");
    if (queryParamsWords) handleInputChange(queryParamsWords);
  }, []);

  const availableLetters: string[] = ALL_LETTERS.filter((l) => !inputValue.includes(l));

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2 text-center">🎯 Wordle Helper</h1>
          <p className="text-gray-600 text-center mb-6">Track used letters while playing Wordle</p>

          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Type or paste letters you've tried:
            </label>
            <input
              className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 uppercase"
              type="text"
              value={inputValue}
              autoFocus
              onInput={(e) => {
                const target = e.target as HTMLInputElement;
                handleInputChange(target.value);
              }}
              placeholder="Enter letters (e.g., AROSE)"
            />
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold text-gray-700">All Letters</h2>
            </div>
            <div className="grid grid-cols-7 sm:grid-cols-9 gap-2">
              {ALL_LETTERS.map((letter: string) => (
                <button
                  key={letter}
                  onClick={() => onButtonClick(letter)}
                  className={`aspect-square rounded-lg font-bold text-lg sm:text-xl transition-all ${
                    inputValue.includes(letter)
                      ? "bg-gray-400 text-gray-200 line-through"
                      : "bg-green-500 text-white hover:bg-green-600 shadow-md hover:shadow-lg"
                  }`}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">Available Letters ({availableLetters.length})</h2>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-green-700 tracking-wider">
              {availableLetters.length > 0 ? availableLetters.join(" ") : "All letters used!"}
            </div>
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-gray-800">{new Set(Array.from(inputValue)).size}</div>
              <div className="text-sm text-gray-600 mt-1">Used Letters</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-green-600">{availableLetters.length}</div>
              <div className="text-sm text-gray-600 mt-1">Available Letters</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
