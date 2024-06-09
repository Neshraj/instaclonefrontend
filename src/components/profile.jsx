import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../styles/common.css';
import '../styles/profile.css';

function Profile() {

  function upnav(){
    navigate('/updatedata');
  }

  const navigate = useNavigate();
  function logout(){
    localStorage.removeItem('logindata');
    navigate('/');
    
  }

  let [id, setId] = useState('---');
  let [name, setName] = useState('---');
  let [posts, setPost] = useState(0);
  let [followers, setFollowers] = useState(0);
  let [following, setFollowing] = useState(0);
  let [followersdata, setFollowersdata] = useState([]);
  let [followingdata, setFollowingdata] = useState([]);

  let [videoFilenames, setReels] = useState([]);
  const mainServerUrl = 'https://instacloneserver-00mi.onrender.com';

  function navtoreels(){
      navigate('/userposts', {
        state: {
          filepathfromnot : videoFilenames,
        },
      });
  }

  function flwnavtoprofile(index) {
    let userid = followersdata[index];
    //alert('nav id : '+userid);
    navigate('/userprofile', {
      state: {
        userid,
      },
    });
  }

  function flwnavtoprofile2(index) {
    let userid = followingdata[index];
    //alert('nav id : '+userid);
    navigate('/userprofile', {
      state: {
        userid,
      },
    });
  }

  function showflw() {
    const frfwbox = document.getElementById('frfwbox');
    const frfwbox2 = document.getElementById('frfwbox2');
  
    if (frfwbox && frfwbox2 && document.readyState === 'complete') {
      frfwbox.style.display = 'block';
      frfwbox2.style.display = 'none';
    }
  }
  
  function showflwing() {
    const frfwbox = document.getElementById('frfwbox');
    const frfwbox2 = document.getElementById('frfwbox2');
  
    if (frfwbox && frfwbox2 && document.readyState === 'complete') {
      frfwbox.style.display = 'none';
      frfwbox2.style.display = 'block';
    }
  }
  
  function hidediv() {
    const frfwbox = document.getElementById('frfwbox');
    const frfwbox2 = document.getElementById('frfwbox2');
  
    if (frfwbox && frfwbox2 && document.readyState === 'complete') {
      frfwbox.style.display = 'none';
      frfwbox2.style.display = 'none';
    }
  }

  async function alldet(semail){
    let dataToServer={
      semail : semail
    }
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
        //navigate('/');
      } else {
        let { sposts, sfollowers, sfollowing, sid, sname, sfollowersdata, sfollowingdata} = message;
        let allflwrsdata = sfollowersdata.split(',');
        allflwrsdata.splice(0, 1);
        let allflwingsdata = sfollowingdata.split(',');
        allflwingsdata.splice(0, 1);

        setId(sid);
        setName(sname);
        setPost(sposts);
        setFollowers(sfollowers);
        setFollowing(sfollowing);
        setFollowersdata(allflwrsdata);
        setFollowingdata(allflwingsdata);
        //alert(followersdata);
        //alert(followingdata);
        getallreelsdata(sid);
      }

    } catch (error) {
      // Handle errors during the fetch
      console.log('error is ', error);
      //alert('We are facing some problem or check your internet connection')
    }
  }

  useEffect(()=>{
    document.getElementById('mainhomebar').style.backgroundColor='';
    document.getElementById('mainsearchbar').style.backgroundColor='';
    document.getElementById('mainexplorebar').style.backgroundColor='';
    document.getElementById('mainreelsbar').style.backgroundColor='';
    document.getElementById('mainaddbar').style.backgroundColor='';
    document.getElementById('mainnotificationbar').style.backgroundColor='';
    document.getElementById('mainprofilebar').style.backgroundColor='#dbdbdb';

    let localdata = JSON.parse(localStorage.getItem("logindata"));
    if(localdata){
      let {email} = localdata;
      alldet(email);
    }
    else{
      navigate('/');
    }
  },[])


  async function getallreelsdata(sid) {
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
        d2.forEach((i,index)=>{

          let sm = d2[index].split('|');
          if(sm[1]===sid){
            rnm.push(sm[0]);
          }
        });
        setReels(rnm);


        
      }
    } catch (error) {
      console.log('error is ', error);
    }
  }


  return (
    <div id='profile' >
            <div id="info">
                <div id="logo"><img id='profimg' src="/assets/icons/profileimg.png" alt="profilelogo" /></div>
                <div id="alldetails">
                    <div id="allinfotop">
                        <h5>{id}</h5>

                        <button id='editbtn' onClick={upnav}>Edit progile<img src="/assets/icons/settings.png" alt="profilelogo" /></button>
                        
                    </div>
                    <div id="allinfomidle">
                        <h5>{posts} Posts</h5>
                        <h5 id='followers' className='flwflrlb' onClick={() => showflw()} >{followers} Followers</h5>
                        <h5 className='flwflrlb' onClick={() => showflwing()} >{following} Following</h5>
                    </div>
                    <div id="allinfobottom">
                        <h5>{name}</h5>
                        <img src="/assets/icons/logout.png" alt="logout" id='settingsbtn' title='Logout' onClick={logout}/>
                    </div>
                </div>
            </div>



            <div id="posts">

                {videoFilenames.map((filename, index) => (
                <div className="boxinprofile" key={index} onClick={()=>{navtoreels()}} >
                <video
                  loading="lazy"
                  className="background-videoinprofile"
                >
                  <source src={`http://localhost:4000/stream-video/${filename}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                </div>
                ))}




            <div id="frfwbox">
              <div id="frfwboxhead">
                <h5 id='frfwboxheadlb'>{name} followers</h5>
                <img onClick={() => hidediv()} id='closebtn' src="/assets/icons/close.png" alt="close" />
              </div>
              <ul id='flul'>
                {followersdata.map((user, index) => (<li onClick={() => flwnavtoprofile(index)} key={index} className='flli' >{user}</li>))}
              </ul>
            </div>

            <div id="frfwbox2">
              <div id="frfwboxhead">
                <h5 id='frfwboxheadlb'>{name} followed</h5>
                <img onClick={() => hidediv()} id='closebtn' src="/assets/icons/close.png" alt="close" />
              </div>
              <ul id='flul'>
                {followingdata.map((user, index) => (<li onClick={() => flwnavtoprofile2(index)} key={index} className='flli' >{user}</li>))}
              </ul>

            </div>


            </div>


        </div>
  );
  
}

export default Profile;

