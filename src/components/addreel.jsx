import React, { useState, useEffect } from "react";
import '../styles/addreel.css';
import {useNavigate} from "react-router-dom";

function Addreel() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [gid, setUserid] = useState('');
  let [glength, setLength] = useState(0);
  const navigate = useNavigate();
  const mainServerUrl = 'https://instacloneserver-raj1.onrender.com';
  let gllemail;

  function addanother() {
    window.location.reload();
  }

  function handleDragEnter(event) {
    event.preventDefault();
    document.getElementById('addreelcontent').classList.add('drag-over');
  }

  function handleDragLeave(event) {
    event.preventDefault();
    document.getElementById('addreelcontent').classList.remove('drag-over');
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    document.getElementById('addreelcontent').classList.remove('drag-over');

    const files = event.dataTransfer.files;

    if (files.length > 0) {
      const fileSize = files[0].size;
      const fileSizeInMB = fileSize / (1024 * 1024);
      const formattedFileSize = fileSizeInMB.toFixed(2);
      let label = document.getElementById('sctdropbox');
      if (label) {
        label.innerText = 'File size '+formattedFileSize+' mb';
      }

          // Create a video element to obtain video duration
  const videoElement = document.createElement('video');
  videoElement.src = URL.createObjectURL(files[0]);

  // Wait for metadata to be loaded
  videoElement.addEventListener('loadedmetadata', () => {
    let videoDuration = videoElement.duration;
    // Convert video duration to seconds
    let formattedDuration = videoDuration.toFixed(2);
    setLength(formattedDuration);
  })


      setSelectedFile(files[0]);
    }
  }

  async function add() {
    if (!selectedFile) {
        alert('Select a video to add');
        return;
      }
    
    if(glength>90){
      alert('Videos length should be less then or equall to 90 secounds');
      return;
    }
  
      // Check if the selected file is a video
      const allowedTypes = ['video/mp4', 'video/webm', 'video/ogg'];
      if (!allowedTypes.includes(selectedFile.type)) {
        alert('Select only a video files');
        return;
      }

    try {
      const formData = new FormData();
      const nameofvideo = document.getElementById('nameofvideo').value.trim();
      if(nameofvideo.length<1){
        alert('Fill the name of the video field');
        return;
      }

      // Append the video file and name to the FormData
      formData.append('video', selectedFile);
      formData.append('videoname', nameofvideo);
      formData.append('userid', gid);
      formData.append('videoDuration', glength);

      let hideaddcontent = document.getElementById('addreelcontent');
      let showloadingcontent = document.getElementById('addloading');

      if(hideaddcontent){
        hideaddcontent.style.display = 'none';
      }
      if(showloadingcontent){
        showloadingcontent.style.display = 'flex';
      }

      const response = await fetch(mainServerUrl+'/addreel', {
        method: 'POST',
        body: formData,
      });


      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const { message } = await response.json();
      if(message) {
        let added = document.getElementById('addedvideo');
        if (added) {
          added.style.display = 'flex';
        }
        else{
          alert('Failed to upload video please try again later or check your internet connection');
          window.location.reload();
        }
        if (showloadingcontent) {
          showloadingcontent.style.display = 'none';
        }
      }
      else{
        alert('Something went wrong try again later or check your internet connection');
        window.location.reload();
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

  useEffect(() => {

    document.getElementById('mainhomebar').style.backgroundColor='';
    document.getElementById('mainsearchbar').style.backgroundColor='';
    document.getElementById('mainexplorebar').style.backgroundColor='';
    document.getElementById('mainreelsbar').style.backgroundColor='';
    document.getElementById('mainaddbar').style.backgroundColor='#dbdbdb';
    document.getElementById('mainnotificationbar').style.backgroundColor='';
    document.getElementById('mainprofilebar').style.backgroundColor='';


    let btn = document.getElementById('addreelbtn');
    if (btn) {
      btn.innerText = 'Wait';
      btn.disabled = true;
    } 

    async function alldet() {
      let locallocaldata = JSON.parse(localStorage.getItem("logindata"));
      if(!locallocaldata){
        navigate('/');
        return;
      }
      else{
        let { email } = locallocaldata;
        gllemail = email;
      }
      
      let dataToServer = {
        semail: gllemail
      };
      try {
        const response = await fetch(mainServerUrl+'/getuserdetails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToServer),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const { message } = await response.json();
        if (message === 'sorry! there is some problem in fetching user details or check your internet connection and try again') {
          alert(message);
        } else {
          let { sid } = message;
          setUserid(sid);
          document.getElementById('addreelbtn').innerText = 'Add';
          document.getElementById('addreelbtn').disabled = false;
        }
      } catch (error) {
        console.log('error is ', error);
      }
    }

    alldet();



  }, []);

  const handleFileChange = (event) => {
    const fileInput = event.target;
    const fileName = fileInput.files[0]?.name || 'Drag or select video';
    const fileSize = fileInput.files[0]?.size;
    const fileSizeInMB = fileSize / (1024 * 1024);
    const formattedFileSize = fileSizeInMB.toFixed(2);

    let label = document.getElementById('sctdropbox');
    if (label) {
      label.innerText = 'File size '+formattedFileSize+' mb';
    }

    // Create a video element to obtain video duration
  const videoElement = document.createElement('video');
  videoElement.src = URL.createObjectURL(fileInput.files[0]);

  // Wait for metadata to be loaded
  videoElement.addEventListener('loadedmetadata', () => {
    let videoDuration = videoElement.duration;
    // Convert video duration to seconds
    let formattedDuration = videoDuration.toFixed(2);
    setLength(formattedDuration);
  })
  
  
    setSelectedFile(fileInput.files[0]);
  };
  

  return (
    <div id="addreelmain">
      <h3 id="addreelheading">Add post</h3>
      <div
        id="addreelcontent"
        onDrop={handleDrop}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
      >
        <input type="file" id="fileInput" name="fileInput" onChange={handleFileChange} />
        <div id="ckked">
            <label htmlFor="fileInput" className="custom-file-input" id="sctdropbox">Drag or select video</label>
        </div>
        <input type="text" placeholder="Name of the video" id="nameofvideo" />
        <button onClick={add} id="addreelbtn">Add</button>
      </div>


      <div id="addloading">
        <h2>Uploading video please wait</h2>
        <div class="loading-spinner"></div>
      </div>

      <div id="addedvideo">
        <h2>Video added successfully</h2>
        <button id="addnother" onClick={()=>{addanother()}} >Add another</button>
      </div>


    </div>
  );
}

export default Addreel;
