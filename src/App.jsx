import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Tailwind CSS Test Card */}
        <div className="bg-white rounded-xl shadow-2xl p-8 mb-8">
          <h1 className="text-4xl font-bold text-indigo-600 mb-4">
            🎨 Tailwind CSS is Working!
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            If you can see this styled card with colors and shadows, Tailwind CSS is configured correctly.
          </p>

          {/* Color Palette Test */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-red-500 h-20 rounded-lg flex items-center justify-center text-white font-semibold">
              Red
            </div>
            <div className="bg-blue-500 h-20 rounded-lg flex items-center justify-center text-white font-semibold">
              Blue
            </div>
            <div className="bg-green-500 h-20 rounded-lg flex items-center justify-center text-white font-semibold">
              Green
            </div>
            <div className="bg-yellow-500 h-20 rounded-lg flex items-center justify-center text-white font-semibold">
              Yellow
            </div>
          </div>

          {/* Button Test */}
          <div className="flex flex-wrap gap-4 mb-6">
            <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold shadow-md">
              Primary Button
            </button>
            <button className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-semibold">
              Secondary Button
            </button>
            <button className="px-6 py-3 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors font-semibold">
              Outline Button
            </button>
          </div>

          {/* Responsive Grid Test */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
              <h3 className="font-bold text-indigo-700 mb-2">Card 1</h3>
              <p className="text-sm text-gray-600">Responsive grid system working</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h3 className="font-bold text-purple-700 mb-2">Card 2</h3>
              <p className="text-sm text-gray-600">Responsive grid system working</p>
            </div>
            <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
              <h3 className="font-bold text-pink-700 mb-2">Card 3</h3>
              <p className="text-sm text-gray-600">Responsive grid system working</p>
            </div>
          </div>

          {/* Input Test */}
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter text here..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <textarea
              placeholder="Enter multiline text..."
              rows="3"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
            ></textarea>
          </div>
        </div>

        {/* Status Card */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-green-800">✅ All Systems Operational</h3>
              <p className="text-green-600">React + Vite + Tailwind CSS setup is complete!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
