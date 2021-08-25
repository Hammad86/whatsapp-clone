import { Avatar,Button,IconButton } from '@material-ui/core'
import React,{useEffect,useState} from 'react'
import './Chat.css'
import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import {useParams} from 'react-router-dom'
import db from './firebase'
import firebase from 'firebase';
import { useStateValue } from './StateProver';

function Chat() {
    const [{user},dispatch] = useStateValue();
    const [input, setInput] = useState('')
    const [seed, setSeed] = useState('')
    const [roomName, setRoomName] = useState('')
    const [messages, setMessages] = useState([])
    const {roomId} = useParams();

    useEffect(() => {
        if (roomId){
            db.collection('rooms').doc(roomId).onSnapshot
        ((snapshot)=> setRoomName(snapshot.data().name));
        db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp','asc')
        .onSnapshot(snapshot=>(
            setMessages(snapshot.docs.map(doc=>doc.data()))
        ))
        }
    }, [roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random()*5000))
    }, [roomId])
    const sendMessage = (e) =>{
        e.preventDefault()
        console.log(`You typed ${input}`);

        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
        })

        setInput(``);
    }
    return (
        <div className='chat'>
            <div className='chat-header'>
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className='chatHeader-info'>
                    <h3>{roomName}</h3>
                    <p>Last Seen{' '}
                    {new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}</p>
                </div>
                <div className='chatHeader-right'>
                <IconButton><SearchIcon/></IconButton>
                <IconButton><AttachFileIcon/></IconButton>
                <IconButton><MoreVertIcon/></IconButton>
                </div>
            </div>
            <div className='chat-body'>
                {messages.map((message)=>(
                    <p className={`chat-message ${message.name === user.displayName && 'chat-reciever'}`}><span className='chat-name'>{message.name}</span>{message.message}
                    <span className='chat-time'>{new Date(message.timestamp?.toDate()).toUTCString()}</span></p>
                ))}
                
                
            </div>
            <div className='chat-footer'>
                <IconButton><InsertEmoticonIcon/></IconButton>
                <form>
                    <input value={input} onChange={e=>setInput(e.target.value)} type='text' placeholder='Type a message'/>
                    <Button onClick={sendMessage} type='submit'>Send Message</Button>
                </form>
                <IconButton><MicIcon/></IconButton>
            </div>
        </div>
    )
}

export default Chat
