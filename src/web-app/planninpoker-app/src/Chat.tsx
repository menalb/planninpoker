import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket';
import './App.css'
import { useCallback, useEffect, useState } from 'react';
import { ReadyState } from 'react-use-websocket';

const WS_URL = import.meta.env.VITE_WS;

const ChatComponent: React.FC<{ username: string }> = ({ username }) => {
    const [socketUrl, setSocketUrl] = useState(WS_URL + '?userId=123&username=' + username);
    const [messageHistory, setMessageHistory] = useState([] as MessageEvent<any>[]);
    const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

    useEffect(() => {
        if (lastMessage !== null) {
            setMessageHistory((prev) => prev.concat(lastMessage));
        }
    }, [lastMessage, setMessageHistory]);

    const handleClickSendMessage = useCallback(() => sendMessage('{"action":"actionmessage","data":"hello"}'), []);

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    return <>
        <div>
            <button
                onClick={handleClickSendMessage}
                disabled={readyState !== ReadyState.OPEN}
            >
                Click Me to send 'Hello'
            </button>
            <span>The WebSocket is currently {connectionStatus}</span>
            {lastMessage ? <span>Last message: {lastMessage.data}</span> : null}
            <ul>
                {messageHistory.map((message, idx) => (
                    <span key={idx}>{message ? message.data : null}</span>
                ))}
            </ul>
        </div>
    </>
}

export default ChatComponent;