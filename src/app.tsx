import { useState } from "preact/hooks";

const ALL_LETTERS: string[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export function App() {
  const [usedLetters, setUsedLetters] = useState<Set<string>>(new Set());
  const [inputValue, setInputValue] = useState<string>("");

  const toggleLetter = (letter: string): void => {
    const newUsed = new Set(usedLetters);
    if (newUsed.has(letter)) {
      newUsed.delete(letter);
    } else {
      newUsed.add(letter);
    }
    setUsedLetters(newUsed);
  };

  const handleInputChange = (e: Event): void => {
    const target = e.target as HTMLInputElement;
    const value = target.value.toUpperCase();
    setInputValue(value);

    const newUsed = new Set(usedLetters);
    value.split("").forEach((char: string) => {
      if (ALL_LETTERS.includes(char)) {
        newUsed.add(char);
      }
    });
    setUsedLetters(newUsed);
  };

  const resetAll = (): void => {
    setUsedLetters(new Set());
    setInputValue("");
  };

  const availableLetters: string[] = ALL_LETTERS.filter((l) => !usedLetters.has(l));

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2 text-center">🎯 Wordle Helper</h1>
          <p className="text-gray-600 text-center mb-6">Track used letters while playing Wordle</p>

          {/* Input Section */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Type or paste letters you've tried:
            </label>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter letters (e.g., AROSE)"
              className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500 uppercase"
            />
          </div>

          {/* All Letters Grid */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold text-gray-700">All Letters (Click to mark as used)</h2>
              <button
                onClick={resetAll}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
              >
                Reset All
              </button>
            </div>
            <div className="grid grid-cols-7 sm:grid-cols-9 gap-2">
              {ALL_LETTERS.map((letter: string) => (
                <button
                  key={letter}
                  onClick={() => toggleLetter(letter)}
                  className={`aspect-square rounded-lg font-bold text-lg sm:text-xl transition-all ${
                    usedLetters.has(letter)
                      ? "bg-gray-400 text-gray-200 line-through"
                      : "bg-green-500 text-white hover:bg-green-600 shadow-md hover:shadow-lg"
                  }`}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>

          {/* Available Letters Display */}
          <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">Available Letters ({availableLetters.length})</h2>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-green-700 tracking-wider">
              {availableLetters.length > 0 ? availableLetters.join(" ") : "All letters used!"}
            </div>
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-gray-800">{usedLetters.size}</div>
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
