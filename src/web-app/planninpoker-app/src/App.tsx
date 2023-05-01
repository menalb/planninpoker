import './App.css'
import { useState } from 'react';
import ChatComponent from './Chat';


function App() {

  const [username, setUsername] = useState('');
  const [shouldConnect, setSouldConnect] = useState(false);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    setSouldConnect(true);
    e.preventDefault();
  }
  return (
    <div>
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={submit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            Enter your username:
            <input
              id="username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Enter
            </button>
          </div>
        </form>
      </div>
      {shouldConnect && username.length > 0 &&
        <div>
          <ChatComponent username={username} />
        </div>
      }
    </div>
  );
}

export default App
