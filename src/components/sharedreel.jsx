import { useEffect, useRef, useState } from "react";
import '../styles/reels.css';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Reels() {
  let [videoFilenames, setReels] = useState([]);
  let [useridm, setUserid] = useState([]);
  let [likescount, setLikesCount] = useState(0);
  let [commandscount, setCommandsCount] = useState(0);
  let [sharescount, setSharesCount] = useState(0);
  let [lkld, setLikeLiked] = useState([])
  let [allcomands, setCommnadsData] = useState([]);
  let [allcmtuserid, setComtUserId] = useState([]);
  let [mainalluserids, setMainAllUserIds] =useState([]);
  let [reelupdata, setUpdat] = useState([]);
  let [rllength, setlenth] = useState([])
  let [allfilestoshare, setSharefilepath] =useState([]);
  const mainServerUrl = 'https://instacloneserver-raj1.onrender.com';
;  let slkd =  [];
  const videoRefs = useRef([]);
  let currentIndex = 0;
  let chtr=false;
  const navigate = useNavigate();

  let followingdata =[];
  let followfollowingdata = [];
  let nres1 = false;
  let btfb = [];
  const [mfollowfollowingdata, setFollowFollowingData] = useState([]);

  const [mfollowfollowingdata2, setMFollowFollowingData] = useState([]);

  let followingdata1 = [];
  let glid;
  let [globslindex, setGlobalIndex] = useState(0);

  //All data about reel
   let rlength = [];
   let date = [];
   let id = [];
   let nfl = [];
   let nfc = [];
   let rcommands = [];
   let likes = [];
   let nfshr = [];
   let rfuulpathcopy = [];
   const locationm = useLocation();
   let localdata = locationm.state;
   let {filepathfromnot} = localdata;


  //To get all data about reeel

  async function alldataaboutreel() {
    try {

      let dataToServer = {
        reelsnames: videoFilenames
      };

      const response = await fetch(mainServerUrl+'/alldataaboutreel', {
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
        
        let ldata = JSON.parse(localStorage.getItem("logindata"));
        let {email} = ldata;
        for (const key in message) {
          for(let key1 in message[key]){
            if(key1==='metadata'){
              let {userId} = message[key][key1];
              let {numberOfLikes} = message[key][key1];
              let {numberOfCommands} = message[key][key1];
              let {commands} = message[key][key1];
              let {likesdata} = message[key][key1];
              let {videoDuration} = message[key][key1];
              if(likesdata){
                if(likesdata.includes(email)){
                  slkd[key] = '/assets/icons/liked.png';
                }
                else{
                  slkd[key] = '/assets/icons/like.png';
                }
              }
              else{
                slkd[key] = '/assets/icons/like.png';
              }

              let {numberOfShares} = message[key][key1];
              id.push(userId);
              nfl.push(numberOfLikes);
              nfc.push(numberOfCommands);
              rcommands.push(commands);
              likes.push(likesdata);
              nfshr.push(numberOfShares);
              rlength.push(videoDuration);


            }

          }


          let {filename} = message[key];
          let fuptch = window.location+'/stream-video/'+filename.replace(/ /g,"%20");
          let fuptch1 = fuptch.replace("/reels", "");
          let fuptch2 = fuptch1.replace(':3000/',':4000/');
          rfuulpathcopy.push(fuptch2);

          let {uploadDate} = message[key];
          date.push(uploadDate);

        }

        getallreelsdata();
      }
    } catch (error) {
      console.log('error is ', error);
    }
    //getmyfollowingdetails();
  }


useEffect(()=>{

  let shopdivs = document.querySelectorAll('.sidecontroles');

  shopdivs.forEach((divsop, index) => {
    divsop.style.display='flex';
});



},[likescount])




  async function getmyfollowingdetails() {
    try {
      let ldata = JSON.parse(localStorage.getItem("logindata"));
      let {email} = ldata;
      let dataToServer = {
        semail: email,
      };
      const response = await fetch(mainServerUrl+'/checkmyfollowing', {
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
        //navigate('/');
      } else {
        followingdata1 = message.split(',');
        followingdata1.splice(0, 1);
        for(let gi = 0; gi<=glid.length; gi++){
          if (followingdata1.includes(glid[gi])){
            nres1 = true;
            if(nres1 && btfb.includes(gi)){
              followfollowingdata[gi] = 'Un friend';
            }
            
            else{
                followfollowingdata[gi] = 'Follow back';
            }
        }

        else{
          if(btfb.includes(gi)){
            followfollowingdata[gi] = 'Un follow';
          }
          else{
            followfollowingdata[gi] = 'Follow';
          }
        }
        
        }
        setFollowFollowingData(followfollowingdata);
        setMFollowFollowingData(...followfollowingdata);
      }
    } catch (error) {
      // Handle errors during the fetch
      console.log('error is ', error);
      //alert('We are facing some problem or check your internet connection')
    }
    //showbtn(true);
    
  }

  async function getfollowingdetails(allUserIds) {
    //alert('in fun'+allUserIds)
    try {
      let ldata = JSON.parse(localStorage.getItem("logindata"));
      let {email} = ldata;
      let dataToServer = {
        semail: email,
      };
      const response = await fetch(mainServerUrl+'/checkfollowing', {
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
        //navigate('/');
      } else {
        followingdata = message.split(',');
        followingdata.splice(0, 1);
        for (let i = 0; i < allUserIds.length; i++) {
          if (followingdata.includes(allUserIds[i])){
            followfollowingdata[i] = 'Unfollow';
            btfb.push(i);
          }
          else{
            followfollowingdata[i] = 'Follow';
            
          }
        }
        setFollowFollowingData(followfollowingdata);// Update state using spread operator
        setMFollowFollowingData(followfollowingdata);
      }
    } catch (error) {
      // Handle errors during the fetch
      console.log('error is ', error);
      //alert('We are facing some problem or check your internet connection')
    }
    getmyfollowingdetails();
  }



  const handleVideoPlayPause = (index) => {
    const video = videoRefs.current[index];
    if (video) {
      if (video.paused || video.ended) {
        // Check if the video is already in the process of playing
        const playPromise = video.play();

        let playpause = document.querySelectorAll('.playbtn');
        playpause.forEach((pp, index) => {
          pp.style.display='none';
        });


        if (playPromise !== undefined) {
          playPromise.then(() => {
            // Video started playing
          }).catch((error) => {
            // Auto-play was prevented, handle it here
            // Manually start playing the video
            video.play();
            let playpause = document.querySelectorAll('.playbtn');
            playpause.forEach((pp, index) => {
              pp.style.display='none';
            });
          });
        }
      } else {
        video.pause();
        let playpause = document.querySelectorAll('.playbtn');
        playpause.forEach((pp, index) => {
          pp.style.display='flex';
        });
      }
    }
  }
  
// To mute and unmute video
const handleVideoMuteUnmute = (event, index) => {
  event.stopPropagation(); // Stop the event from bubbling up

  let imgscr = document.querySelectorAll('.muteunmuteimg');

if(chtr){
  
}
else{
  
}

  //const videom = videoRefs.current[index];
  videoRefs.current.forEach((video) => {

    if (video) {
      if (video.muted) {
        video.muted = false;
        imgscr.forEach((imglg, index) => {
          imglg.src='/assets/icons/unmute.png';
        });
      } else {
        video.muted = true;
        imgscr.forEach((imglg, index) => {
          imglg.src='/assets/icons/mute.png';
          });
      }
    }
  });
};

 




  const handleKeyDown = (event) => {
    const divs = document.querySelectorAll('.box');

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      currentIndex = Math.min(currentIndex + 1, divs.length - 1);

      if (divs[currentIndex]) {
        divs[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      currentIndex = Math.max(currentIndex - 1, 0);

      if (divs[currentIndex]) {
        divs[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleVideoLoad = (index) => {
    // Code to execute after video has loaded


    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Pause all videos
          videoRefs.current.forEach((video) => {
            video.pause();
            let playpause = document.querySelectorAll('.playbtn');
            playpause.forEach((pp, index) => {
              pp.style.display='none';
            });
          });

          // Play the video in the center of the screen if there's user interaction
          try {
            const playPromise = entry.target.play();

            if (playPromise !== undefined) {
              playPromise.catch((error) => {
                // Auto-play was prevented, handle it here
              });
            }
          } catch (error) {
          }
        }
      });
    };

    // Create Intersection Observer
    const observer = new IntersectionObserver(handleIntersection, options);

    // Add all video elements to the observer
    videoRefs.current.forEach((video) => {
      if (video instanceof HTMLVideoElement) {
        observer.observe(video);
      }
    })

    // Cleanup observer on component unmount

    return () => observer.disconnect();
  };






  // Server function to add likes

  async function addlikeremovelike(index,mod){
    let ldata = JSON.parse(localStorage.getItem("logindata"));
    let {email} = ldata;
    try {
      let dataToServer;
      if(mod==='Add'){
        dataToServer = {
          semail: email,
          mode : 'Add',
          userid : useridm[index],
          filename : videoFilenames[index]
        };
      }

      else{
        dataToServer = {
          semail: email,
          mode : 'Rmw',
          userid : useridm[index],
          filename : videoFilenames[index]
        };
      }
      const response = await fetch(mainServerUrl+'/addremovelikes', {
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
        //navigate('/');
      } else {


      }
    } catch (error) {
      // Handle errors during the fetch
      console.log('error is ', error);
      alert('We are facing some problem or check your internet connection')
    }

  }




  async function getallreelsdata() {
    try {
      const response = await fetch(mainServerUrl+'/getallreelsdata', {
        method: 'Get',
        headers: {
          'Content-Type': 'application/json',
        }
      });


      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const { message } = await response.json();
      if (message === 'sorry! there is some problem in fetching user details or check your internet connection and try again') {
        alert(message);
      } else {
        let d1 = message.split(',');
        let d2 = d1.slice(1);
        let rnm = [];
        let uid = []
        d2.forEach((i,index)=>{

          let sm = d2[index].split('|');
          rnm.push(sm[0]);
          uid.push(sm[1])
        });

  const indices = Array.from({ length: rnm.length }, (_, index) => index);

  for (let i = rnm.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    // Swap elements in the rnm
    [rnm[i], rnm[j]] = [rnm[j], rnm[i]];
    [uid[i], uid[j]] = [uid[j], uid[i]];

    [slkd[i], slkd[j]] = [slkd[j], slkd[i]];
    [nfl[i], nfl[j]] = [nfl[j], nfl[i]];
    [nfc[i], nfc[j]] = [nfc[j], nfc[i]];
    [nfshr[i], nfshr[j]] = [nfshr[j], nfshr[i]];
    [date[i], date[j]] = [date[j], date[i]];
    [rlength[i], rlength[j]] = [rlength[j], rlength[i]];
    [rfuulpathcopy[i], rfuulpathcopy[j]] = [rfuulpathcopy[j], rfuulpathcopy[i]];

    [indices[i], indices[j]] = [indices[j], indices[i]];

  }
        let tempnotfilepthindx = rnm.indexOf(filepathfromnot);
        let tempnotfile = rnm[0];
        rnm[0]= filepathfromnot;
        rnm[tempnotfilepthindx] = tempnotfile;

        setReels(rnm);
        setUserid(uid);
        setLikeLiked(slkd);
        setLikesCount(nfl);
        setCommandsCount(nfc);
        setSharesCount(nfshr);
        setUpdat(date);
        setlenth(rlength);
        
        setSharefilepath(rfuulpathcopy);
        glid = uid;

        let initialFollowData = new Array(useridm.length).fill(''); // Assuming initial value is an empty string
        setMFollowFollowingData(initialFollowData);

        getfollowingdetails(uid);
        
      }
    } catch (error) {
      console.log('error is ', error);
    }
  }

  useEffect(() => {
    alldataaboutreel();
  }, []);



  //To handle likes and dislikes
  const handleLike = (event, index) => {
    event.stopPropagation(); // Stop the event from bubbling up
  
    let imgscr = document.querySelectorAll('.likes');
  
        if(imgscr[index].src.endsWith('like.png')){
          imgscr[index].src='/assets/icons/liked.png';
          addlikeremovelike(index,'Add');

          setLikesCount((prevLikes) => {
            const updatedLikes = [...prevLikes];
            updatedLikes[index] += 1;
            return updatedLikes;
          });

        }
        else{ 
          imgscr[index].src='/assets/icons/like.png';
          addlikeremovelike(index,'Rmw');
          setLikesCount((prevLikes) => {
            const updatedLikes = [...prevLikes];
            updatedLikes[index] -= 1;
            return updatedLikes;
          });

        }

  
  };

  function hidediv(event) {
    setMainAllUserIds([]);
    event.stopPropagation();
    let cd = document.getElementById('commanddiv');
    if(cd){
      cd.style.display='none';
    }
    let chshr = document.getElementById('commanddivshr');

    if(chshr){
      chshr.style.display='none';
    }

    let reeldet = document.getElementById('reeldetails');
    if(reeldet){
      reeldet.style.display='none';
    }

  }

  function showcdiv(event,index) {
    setGlobalIndex(index);
    setCommnadsData([]);
    event.stopPropagation();
    let cd = document.getElementById('commanddiv');
    if(cd){
      cd.style.display='flex';
    }
  
  
 


    //Function to get all commands

    async function getcommandsofvide() {

      let dataToServer = {
        filename : videoFilenames[index]
      }

      try {
        const response = await fetch(mainServerUrl+'/getcommands', {
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
        console.log('uyjhnyyh',message);
        
        let scm = message.split(',');
        let scm2 = scm.slice(1);
        console.log('all command ',scm2);
        let fruid = [];
        let frcmd = [];
        console.log('length ',scm2.length);
        for(let ic=0;ic<scm2.length;ic++){
          let ccdd = scm2[ic].split('|');
          frcmd.push(ccdd[0]);
          fruid.push(ccdd[1]);
        }
        console.log('all id ',fruid);
        console.log('all cmd ',frcmd);
        //setCommnadsData((prevCommandsData) => [...prevCommandsData, fcmd]);
        setCommnadsData(frcmd);
        setComtUserId(fruid);
        console.log('c data ',frcmd);
        console.log('user ', fruid);
        
      // Pass userIds to the function
      } catch (error) {
        // Handle errors during the fetch
        console.error('Fetch error:', error);
      }
    }

    getcommandsofvide();

 
  }




  //To show share div
  function showcdivshr(event,index) {
    event.stopPropagation();
    setGlobalIndex(index);
    let cdshr = document.getElementById('commanddivshr');
    if(cdshr){
      cdshr.style.display='flex';
    }


    async function getallusers() {
      try {
        const response = await fetch(mainServerUrl+'/allusers', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const { message } = await response.json();
        console.log('allus',response);
        console.log('ms',message);
        let usernames = [];
        let userMainIds = [];
        let useremails = [];

        message.forEach((element) => {
          const { sname, sid, semail } = element;
          usernames.push(sname);
          userMainIds.push(sid);
          useremails.push(semail);
        });

        for (let i = userMainIds.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [userMainIds[i], userMainIds[j]] = [userMainIds[j], userMainIds[i]];
        }

        setMainAllUserIds(userMainIds);


         // Pass userIds to the function
      } catch (error) {
        // Handle errors during the fetch
        console.error('Fetch error:', error);
      }
    }

    getallusers();




  }


  function showrdetdiv(event,index) {
    setGlobalIndex(index);
    setGlobalIndex(index);
    event.stopPropagation();
    let cd = document.getElementById('reeldetails');
    if(cd){
      cd.style.display='flex';
    }
  }





  //To navigate to profile

  function navtoprofile(index) {
    let userid = allcmtuserid[index];
    navigate('/userprofile', {
      state: {
        userid,
      },
    });
  }


  function navtoprofileshr(index) {
    let userid = mainalluserids[index];
    navigate('/userprofile', {
      state: {
        userid,
      },
    });
  }



  //Function to send reel to the user
  async function sendreeltousewr(event,index){
    event.stopPropagation();
    let sendtext = document.querySelectorAll('.sharetoibtn');
    if(sendtext[index].innerText==='Send'){

      sendtext[index].innerText='Sent';
      setSharesCount((prevLikes) => {
        const updatedLikes = [...prevLikes];
        updatedLikes[globslindex] += 1;
        return updatedLikes;
      });


      try {
        let ldata = JSON.parse(localStorage.getItem("logindata"));
        let {email} = ldata;
        let dataToServer = {
          semail: email,
          userid : useridm[globslindex],
          reelfullpath : allfilestoshare[globslindex],
          touid : mainalluserids[index],
        };





      const response = await fetch(mainServerUrl+'/sendreel', {
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
        //navigate('/');
      } else {
        
  
      }
    } catch (error) {
      // Handle errors during the fetch
      console.log('error is ', error);
      alert('We are facing some problem or check your internet connection')
    } 


    }

  }


  //To handle hidding in input and button
  function stophide(event){
    event.stopPropagation();
  }

  //Function to copy file path of the reel

  function copypath(event) {
    try{

      document.body.focus();
    }catch{}
    if (navigator.clipboard) {
      navigator.clipboard.writeText(allfilestoshare[globslindex]);
  } else {
      console.error('Clipboard API not supported');
  }
}


  //Function to add command
  async function addcommand(event){
    event.stopPropagation();
    let ldata = JSON.parse(localStorage.getItem("logindata"));
    let cmdata = document.getElementById('commandinput').value.trim();
    if(cmdata.length<1){
      return ;
    }

    setCommandsCount((prevLikes) => {
      const updatedLikes = [...prevLikes];
      updatedLikes[globslindex] += 1;
      return updatedLikes;
    });

    setCommnadsData((prevCmdata) => {
      const updatedCmd = [...prevCmdata];
      updatedCmd.push(cmdata) ;
      return updatedCmd;
    });

    setComtUserId((prevUserid)=>{
      const updatedUserid = [...prevUserid];
      updatedUserid.push(useridm[globslindex]);
      return updatedUserid;

    })


    let {email} = ldata;
    try {
        let dataToServer = {
          semail: email,
          filename : videoFilenames[globslindex],
          cdata : cmdata,
          userid : useridm[globslindex]
        };

        document.getElementById('commandinput').value='';
        //hidediv()
        

      const response = await fetch(mainServerUrl+'/addcommand', {
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
        //navigate('/');
      } else {
        

      }
    } catch (error) {
      // Handle errors during the fetch
      console.log('error is ', error);
      alert('We are facing some problem or check your internet connection')
    } 

  }


  useEffect(() => {
    document.getElementById('mainhomebar').style.backgroundColor = '';
    document.getElementById('mainsearchbar').style.backgroundColor = '';
    document.getElementById('mainexplorebar').style.backgroundColor = '';
    document.getElementById('mainreelsbar').style.backgroundColor = '#dbdbdb';
    document.getElementById('mainaddbar').style.backgroundColor = '';
    document.getElementById('mainnotificationbar').style.backgroundColor = '';
    document.getElementById('mainprofilebar').style.backgroundColor = '';

    let localdata;
    try{
      localdata = JSON.parse(localStorage.getItem('logindata'));
  }
  catch{
      
  }
  if(!localdata){
      navigate('/');
  }

    document.addEventListener('keydown', handleKeyDown);

    // Add event listeners for each video
    videoRefs.current.forEach((video, index) => {
      if (video) {
        video.addEventListener('loadeddata', () => handleVideoLoad(index));
      }
    });

    return () => {
      document.removeEventListener('keydown', handleKeyDown);

      // Remove event listeners when component unmounts
      videoRefs.current.forEach((video) => {
        if (video) {
          video.removeEventListener('loadeddata', handleVideoLoad);
        }
      });
    };
  }, [videoRefs, handleVideoLoad]);

  return (
    <div id="reelsbody" onClick={(event) => hidediv(event)}>
      <div className="container">
        
        {videoFilenames.map((filename, index) => (
          <div className="box" key={index} onClick={() => handleVideoPlayPause(index)} >
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              loop
              autoPlay
              loading="lazy"
              className="background-video"
            >
              <source src={`${mainServerUrl}/stream-video/${filename}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <div className="playbtn">
              <img src="/assets/icons/playbuttton.png" alt="play"/>
            </div>

            <div className="muteunmute" onClick={(event) => handleVideoMuteUnmute(event,index)}>
              <img src="/assets/icons/unmute.png" alt="mute" className="muteunmuteimg"/>
            </div>

            <div className="sidecontroles" id="sidemainbaroptions">

              <div className="lcwdiv">
                <img src={lkld[index]?lkld[index]:'/assets/icons/like.png'} alt="like" className="sidelcsdicond likes" onClick={(event)=>{handleLike(event,index)}} />
                <h6 className="counts likescount">{likescount[index]}</h6>
              </div>

              <div className="lcwdiv">
                <img src="/assets/icons/command.png" alt="command" className="sidelcsdicond commands" onClick={(event)=>{showcdiv(event,index)}} />
                <h6 className="counts">{commandscount[index]}</h6>
              </div>


              <div className="lcwdiv">
                <img src="/assets/icons/share.png" alt="share" className="sidelcsdicond" onClick={(event)=>{showcdivshr(event,index)}} />
                <h6 className="counts">{sharescount[index]}</h6>
              </div>

              <img src="/assets/icons/details.png" alt="details" className="sidelcsdicond" onClick={(event)=>{showrdetdiv(event,index)}} />
            </div> 

            <div id="reelfooter" onClick={()=>{navtoprofile(index)}}>
              <div id="useididflwbtn">
              <img src="/assets/icons/user2.png" alt="user" className="reelidl" />
              <h5 className="reelid">{useridm[index]}</h5>
              <button className="rlfwbtn">{mfollowfollowingdata[index]}</button>
              </div>
              <p className="reelname">{filename}</p>
            </div>
          </div>
        ))}
      </div>

      <div id="commanddiv" onClick={(event)=>{stophide(event)}} >
          <div id="commandhead">
            <h4 id="commandheadlb">Commands</h4>
            <img id='closebtnc' src="/assets/icons/close.png" alt="close" onClick={(event) => hidediv(event)} />
          </div>

          <div id="commandbody" onClick={(event)=>{stophide(event)}}>
  {allcomands.map((command, index) => (
    <div key={index} className="commandmsg" onClick={()=>{navtoprofile(index)}}>
      <h5 className="usercmid">{allcmtuserid[index]}</h5>
      <p>{command}</p>
    </div>
  ))}
</div>


          <div id="commandfoot">
            <input type="text" placeholder="Add a commad" id="commandinput" onClick={(event)=>{stophide(event)}}  />
            <button id="postcommandbtn" onClick={(event)=>{addcommand(event)}}  >Post</button>
        </div>

  </div>



        <div id="commanddivshr" onClick={(event)=>{stophide(event)}}>
          <div id="commandhead">
            <h4 id="commandheadlb">Share reel</h4>
            <img id='closebtnc' src="/assets/icons/close.png" alt="close" onClick={(event) => hidediv(event)} />
          </div>
          <h6 className="copylink" onClick={(event)=>{copypath(event)}}>Copylink<img id="copyicon" src="/assets/icons/copy.png" alt="copy" /></h6>

          <div className="shrebody">

            {mainalluserids.map((alusid, index) => (
            <div key={index} className="shuid" onClick={()=>{navtoprofileshr(index)}}>

              <div className="shcontentuidbtn">

                <h5 className="malshid">{mainalluserids[index]}<h5 className="sharetoibtn" onClick={(event)=>{sendreeltousewr(event,index)}}>Send</h5> </h5>
              </div>

              

            </div>
  ))}
          
          </div>

        </div>

        <div id="reeldetails" onClick={(event)=>{stophide(event)}} >
          <div id="commandhead">
            <h4 id="commandheadlb">Rell details</h4>
            <img id='closebtnc' src="/assets/icons/close.png" alt="close" onClick={(event) => hidediv(event)} />
          </div>

          <div id="reeldatamain">

            <h4 className="details">Uploadede by : <span className="chdetails">{useridm[globslindex]}</span></h4>

            <h4 className="details">Reel name : <span className="chdetails">{videoFilenames[globslindex]}</span></h4>

            <h4 className="details">Uploaded on : <span className="chdetails">{reelupdata[globslindex]}</span></h4>

            <h4 className="details">Lenght : <span className="chdetails">{parseInt(rllength[globslindex])+'s'}</span></h4>
            
            <h4 className="details">Likes : <span className="chdetails">{likescount[globslindex]}</span></h4>
            
            <h4 className="details">Commands : <span className="chdetails">{commandscount[globslindex]}</span></h4>
            
            <h4 className="details">Shares : <span className="chdetails">{sharescount[globslindex]}</span></h4>
            

          </div>


        </div>


    
    </div>


  );
}

export default Reels;
