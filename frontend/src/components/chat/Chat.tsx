'use client';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { getCookie } from 'cookies-next';

const socket = io('http://localhost:4000'); // Cambia la URL según tu entorno

function Chat() {
    const [messages, setMessages] = useState<any[]>([]);
    const [message, setMessage] = useState('');

    const userCookie = getCookie('cookie') ? JSON.parse(getCookie('cookie') as string) : null;
    const role = userCookie?.user.role;
    const name = userCookie?.user.name;

    useEffect(() => {
        // Escuchar mensajes del servidor
        socket.on('chatMessage', (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        return () => {
            socket.off('chatMessage');
        };
    }, []);

    const sendMessage = () => {
        if (message.trim()) {
            socket.emit('chatMessage', {
                text: message,
                sender: `${role === 'professor' ? 'Profesor' : 'Estudiante'} - ${name}`,
            });
            setMessage('');
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-6 p-4 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4 text-center">Chat</h1>

            {/* Chat messages */}
            <div className="h-80 overflow-y-auto p-4 border border-gray-200 rounded-lg bg-gray-50">
                {messages.length === 0 ? (
                    <p className="text-gray-500 text-center">No hay mensajes aún.</p>
                ) : (
                    messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`mb-2 p-2 rounded-lg ${msg.sender.includes('Profesor') ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                                }`}
                        >
                            <p className="text-sm font-semibold">{msg.sender}</p>
                            <p className="text-gray-700">{msg.text}</p>
                        </div>
                    ))
                )}
            </div>

            {/* Message input */}
            <div className="mt-4 flex items-center">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Escribe tu mensaje..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <button
                    onClick={sendMessage}
                    className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                >
                    Enviar
                </button>
            </div>
        </div>
    );
}

export default Chat;
