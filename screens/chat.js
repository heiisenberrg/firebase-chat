import React, {useState, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';

function Chat(props) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const message = [
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ];
    setMessages(message);
  }, []);

  const onSend = (messages = []) => {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  );
}

export default Chat;
