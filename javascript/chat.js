const form = document.querySelector(".typing-area"),
incoming_id = form.querySelector(".incoming_id").value,
inputField = form.querySelector(".input-field"),
sendBtn = form.querySelector("button"),
chatBox = document.querySelector(".chat-box");

form.onsubmit = (e)=>{
    e.preventDefault(); // preventing form from submitting
}

inputField.focus();
inputField.onkeyup = ()=>{
    if(inputField.value != ""){
        sendBtn.classList.add("active");
    }else{
        sendBtn.classList.remove("active");
    }
}

sendBtn.onclick = ()=>{
    // Ajax
    let xhr = new XMLHttpRequest(); // creating XML object
    xhr.open("POST", "php/insert-chat.php", true);
    xhr.onload = ()=>{
      if(xhr.readyState === XMLHttpRequest.DONE){
          if(xhr.status === 200){
              inputField.value = ""; // once message inserted into database then leave blank the input field
              scrollToBottom();
          }
      }
    }
    // we have to send the form data through ajax to php
    let formData = new FormData(form); // creating new formData Object
    xhr.send(formData); // sending the form data to php

}
chatBox.onmouseenter = ()=>{ 
    chatBox.classList.add("active");
}

chatBox.onmouseleave = ()=>{
    chatBox.classList.remove("active");
}

setInterval(() =>{
    // Ajax
    let xhr = new XMLHttpRequest(); // creating XML object
    xhr.open("POST", "php/get-chat.php", true);
    xhr.onload = ()=>{
      if(xhr.readyState === XMLHttpRequest.DONE){
          if(xhr.status === 200){
            let data = xhr.response;
            chatBox.innerHTML = data;

            // co-working with above chatbox.onmouseenter/ leave to stopped auto-scroll down chat history
            // when you mouse on the screen, scroll function will be stopped
            if(!chatBox.classList.contains("active")){  
                scrollToBottom();   
              }
          }
      }
    }

    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); //creating new formData Object
    xhr.send("incoming_id="+incoming_id); // sending the form dta to php
}, 500); // this function will run frequently after 500ms

function scrollToBottom(){
    chatBox.scrollTop = chatBox.scrollHeight;
  }
  