import React, {useState } from 'react'
import {over} from 'stompjs';
import SockJS from 'sockjs-client';

var stompClient =null;

const App = () => {

    const [bids,setBids]=useState([{}])
    const [myPriceInput,setPriceInput]=useState()
    const [myUserNameInput,setUserNameInput]=useState()
    const [myProductNameInput,setProductNameInput]=useState()
  
    const connect =()=>{
        let Sock = new SockJS('http://localhost:8080/bid');
        stompClient = over(Sock);
        stompClient.connect({},onConnected, (e)=>console.log(e));
    }
  
    const onConnected = () => {
        console.log("connected")
        stompClient.subscribe('/topic/auction', onBidReceived);
    }
    const onBidReceived = (payload)=>{
        console.log(JSON.parse(payload.body))
        bids.push(JSON.parse(payload.body))
        setBids([...bids])        
    }
    const sendAuctionBid=()=>{
        if (stompClient) {
          let sendBid={
            name : myProductNameInput,
            userName: myUserNameInput,
            price: parseFloat(myPriceInput)
          }
          stompClient.send("/app/bid", {}, JSON.stringify(sendBid));
        }
}

  return (
    <div>
    <label>Ad</label>
    <input type="text" onChange={e=>setUserNameInput(e.target.value)}></input><br/>
    <div>
    <label>Ürün</label>
    <input type="text" onChange={e=>setProductNameInput(e.target.value)}></input><br/>
    <label>Fiyat</label>
    <input type="text" onChange={e=>setPriceInput(e.target.value)}></input>
    <button onClick={connect}>connect</button><br/>
    <button onClick={sendAuctionBid}>Teklifi Gönder</button>
    </div>
    <table>
      {bids.length>0 && bids.map((item,key)=>{
       return <tr key={key}>
          <td>
            {item.userName}
          </td>
          <td>
            {item.name}
          </td>
          <td>
            {item.price}
          </td>
        </tr>
      })}
      
    </table>
     
  </div>
  )
}
export default App;
