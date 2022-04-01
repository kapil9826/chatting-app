import {useEffect, useState} from 'react';
import { getDatabase ,push,ref,set,onChildAdded, update} from "firebase/database";
import './App.css';
import { GoogleAuthProvider ,getAuth,signInWithPopup} from "firebase/auth";

function App() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const googleLogin = () => {
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    setName({name:result.user.displayName, email:result.user.email})
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
  }

  const [name, setName]= useState("");
  const [chats, setChats]= useState([]);
  const [msg,setMsg] = useState('');

const db = getDatabase();
const chatListRef = ref(db, 'chats');

const updateHeight=()=>{
  const el = document.createElementById('chat');
 if(el){
    el.scrollTop = el.scrollHeight;
 }
}

useEffect(()=>{
  onChildAdded(chatListRef, (data) => {
    setChats(chats=>[...chats,data.val()])
    setTimeout(()=>{
      updateHeight()
    },100);
  });
},[])

  const sendChat = ()=>{

const chatRef = push(chatListRef);
set(chatRef, {
  name,message:msg
});
    setMsg('');
  }
  return (
<div>
  {name? null:<div> 
    <input
    type="text"
    placeholder="Enter name to start"
    onBlur={(e) => setName(e.target.value)}> 
    </input>
    <button onClick={e=>{googleLogin()}}>Google SignIn</button>
    </div>}
   { name? <div>
  <h3>User: {name}</h3>
  <div id="chat" className="chat-container">
    {chats.map((c,i) => (
    <div key={i} className={`container ${c.name === name ? 'me':''}`}>
    <p className="chatbox"> 
      <strong>{c.name}:</strong>
      <span>{c.message}</span>
    </p>
    </div>
    ))}
    </div>
  
    <div className="btm">  

         <input type="text" onInput={e=>setMsg(e.target.value)} value={msg} 
         placeholder="enter your message"></input>
         <button onClick={e=>sendChat()}>Send</button>
      </div>
       </div> : null}
  </div>
  
  );
}

export default App;
