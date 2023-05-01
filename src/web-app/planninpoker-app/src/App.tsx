import './App.css'
import { useState } from 'react';
import ChatComponent from './Chat';
import { SubmitButton } from './Components/Buttons';


function App() {

  const [username, setUsername] = useState('');
  const [shouldConnect, setShouldConnect] = useState(false);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    setShouldConnect(true);
    e.preventDefault();
  }
  return (
    <div>
      <header className='container mx-auto bg-white'>
        Hello to my app
      </header>
      <main>
        {!shouldConnect &&
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
                <SubmitButton text='Enter' />
              </div>
            </form>
          </div>
        }
        {shouldConnect && username.length > 0 &&
          <div>
            <ChatComponent username={username} onClose={() => setShouldConnect(false)} />
          </div>
        }
      </main>
    </div>
  );
}

export default App
