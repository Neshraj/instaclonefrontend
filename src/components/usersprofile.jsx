import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useId, } from 'react';
import '../styles/profile.css';

function Profile() {
  let glid;
  let glfl = false;
  let nres1 = false;
  let nres2 = false;
  let ch1 = false;
  let ch2 = false;
  let [id, setId] = useState('---');
  let [email, setEmail] = useState('');
  let [name, setName] = useState('---');
  let [posts, setPost] = useState(0);
  let [followers, setFollowers] = useState(0);
  let [following, setFollowing] = useState(0);
  let [btnsh, showbtn] = useState(false);
  let [followersdatas, setFollowersdata] = useState([]);
  let [followingdatas, setFollowingdata] = useState([]);
  let [videoFilenames, setReels] = useState([]);
  let glemail;
  const navigate = useNavigate();
  const location1 = useLocation();
  const mainServerUrl = 'http://localhost:4000';


  function navtoreels(){
    navigate('/userposts', {
      state: {
        filepathfromnot : videoFilenames,
      },
    });
}


  function flwnavtoprofile(index) {
    let userid = followersdatas[index];
    navigate('/userprofile', {
      state: {
        userid,
      },
    });
    window.location.reload();
  }

  function flwnavtoprofile2(index) {
    let userid = followingdatas[index];
    navigate('/userprofile', {
      state: {
        userid,
      },
    });
    window.location.reload();
  }

  function showflw(){
    document.getElementById('frfwbox2').style.display='none';
    document.getElementById('frfwbox').style.display='block';
  }

  function showflwing(){
    document.getElementById('frfwbox').style.display='none';
    document.getElementById('frfwbox2').style.display='block';
  }

  function hidediv(){
    document.getElementById('frfwbox').style.display='none';
    document.getElementById('frfwbox2').style.display='none';
  }



  let followingdata=[];
    //To check following status
    let [myfst, setMyfst] = useState(false);
    let [myfst2, setMyfst2] = useState(false);
    let checkc = false;
    function showbtnfn(){
      if(btnsh){
        document.getElementById('followbtn').style.display='block';
      }
      else{
        document.getElementById('followbtn').style.display='hidden';
      }
    }

    async function getmyfollowingdetails() {

      try {
        let localdata = location.state;
        //alert('ldata : ',localdata)
        //let userid = id;
        //alert('id : '+id);
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
          followingdata = message.split(',');
          followingdata.splice(0, 1);
          //alert('zxcv'+followingdata)
          //alert('import'+glid);
            if (followingdata.includes(glid)){
              setMyfst(true);
              nres1 = true;
              //alert('he following you');
              //alert('bothres'+nres1+''+nres2);
              if(nres1 && nres2){
                document.getElementById('followbtn').innerText='Un friend';
                document.getElementById('frst').style.display='block';
              }
              else{
                document.getElementById('followbtn').innerText='Follow back';
              }
              
          }
          else{
            if(glfl){
              document.getElementById('followbtn').innerText='Unfollow';
            }
            else{
              document.getElementById('followbtn').innerText='Follow';
            }
            
          }
        }
        //alert('1');
      } catch (error) {
        // Handle errors during the fetch
        console.log('error is ', error);
        //alert('We are facing some problem or check your internet connection')
      }
      showbtn(true);
      ch2 = true;
      if(ch1 && ch2){
        const followBtnElement = document.getElementById('followbtn');

      if (followBtnElement) {
        followBtnElement.style.display = 'block';
      }
        //document.getElementById('followbtn').style.display='block';
      }
    }
    const location = useLocation();
    //let followfollowingdata=[];
    //let [mfollowfollowingdata, setFollowFollowingData] = useState();


    //To check follwing data
    async function getfollowingdetails() {
      let localdata = location.state;
      let {userid} = localdata;
      //alert('userid : '+userid);
      let chemail = userid;
      //alert('non :'+chemail)
      try {
        let ldata = JSON.parse(localStorage.getItem("logindata"));
        let { email } = ldata;
  
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
        
        
        let { message } = await response.json();
        if (message === 'asorry! there is some problem in fetching user details or check your internet connection and try again') {
          alert(message);
          //navigate('/');
        } else {
          //alert('fffm'+message);
          followingdata = message.split(',');
          followingdata.splice(0, 1);
          //alert('fff'+followingdata);
  
          //for (let i = 0; i < chemail.length; i++) {
            if (followingdata.includes(chemail)){
              //alert('you following him');
              setMyfst2(true);
              nres2 = true;
              //alert('bothres'+nres1+''+nres2);
              document.getElementById('followbtn').innerText='Unfollow';
              glfl = true;
              //followfollowingdata[i] = 'Following';
            }
            else{
              glfl = false;
            }
          //}
          //setFollowFollowingData([...followfollowingdata]); // Update state using spread operator
        }
        //alert('2');
      } catch (error) {
        // Handle errors during the fetch
        console.log('error is ', error);
        //alert('We are facing some problem or check your internet connection')
      }
      ch1 = true;
      if(ch1 && ch2){
        
        document.getElementById('followbtn').style.display='block';
      }
    }

    //Function to decreaser followers
    async function decreasefollower() {
      if(document.getElementById('followbtn').innerText==='Unfollow'){
          let fows = document.getElementById('followers').innerText;
          fows = fows.split(' ')
          fows[0] = parseInt(fows[0])-1;
          fows = fows.join(' ');
          document.getElementById('followers').innerText = fows;
          //getfollowingdetails();
          if(myfst){
            document.getElementById('followbtn').innerText='Follow back';
          }
          else{
            document.getElementById('followbtn').innerText='Follow';
          }
          try {
              let ldata = JSON.parse(localStorage.getItem("logindata"));
              let localdata = location.state;
              let {userid} = localdata;
              let {email} = ldata;

              let dataToServer ={
                  semail : email,
                  upid : userid

              }
              const response = await fetch(mainServerUrl+'/removefollowers', {
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
                let { sposts, sfollowers, sfollowing, sid, sname, sfollowersdata, sfollowingdata, semail } = message;
                let allflwrsdata = sfollowersdata.split(',');
                allflwrsdata.splice(0, 1);
                let allflwingsdata = sfollowingdata.split(',');
                allflwingsdata.splice(0, 1);

                setId(sid);
                setName(sname);
                setPost(sposts);
                setFollowers(sfollowers);
                setFollowing(sfollowing);
                setEmail(semail);
                if(semail===glemail){
                  navigate('/profile');
                }
                setFollowersdata(allflwrsdata);
                setFollowingdata(allflwingsdata);
              }
        
            } catch (error) {
              // Handle errors during the fetch
              console.log('error is ', error);
              //alert('We are facing some problem or check your internet connection')
            }
      
      }
      else{
        checkc = true;
      }
  }

    //Function to increase followers
    async function increasefollower() {
        if(document.getElementById('followbtn').innerText==='Follow'){
            let fows = document.getElementById('followers').innerText;
            fows = fows.split(' ')
            fows[0] = parseInt(fows[0])+1;
            fows = fows.join(' ');
            document.getElementById('followers').innerText = fows;
            //getfollowingdetails();
            document.getElementById('followbtn').innerText='Unfollow';
            checkc = false;
            
            try {
                let ldata = JSON.parse(localStorage.getItem("logindata"));
                let localdata = location.state;
                let {userid} = localdata;
                let {email} = ldata;

                let dataToServer ={
                    semail : email,
                    upid : userid

                }
                const response = await fetch(mainServerUrl+'/addfollowers', {
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
                  let { sposts, sfollowers, sfollowing, sid, sname, sfollowersdata, sfollowingdata, semail} = message;
                  let allflwrsdata = sfollowersdata.split(',');
                  allflwrsdata.splice(0, 1);
                  let allflwingsdata = sfollowingdata.split(',');
                  allflwingsdata.splice(0, 1);
                  
                  setId(sid);
                  setName(sname);
                  setPost(sposts);
                  setFollowers(sfollowers);
                  setFollowing(sfollowing);
                  setEmail(semail);
                  if(semail===glemail){
                    navigate('/profile')
                  }
                  setFollowersdata(allflwrsdata);
                  setFollowingdata(allflwingsdata);
                }
          
              } catch (error) {
                // Handle errors during the fetch
                console.log('error is ', error);
                //alert('We are facing some problem or check your internet connection')
              }
        
        }


    }



    async function fbincreasefollower() {
      let localdata = location.state;
      let { userid } = localdata;
      //alert('local id ',+userid);
      if(document.getElementById('followbtn').innerText==='Follow back'){
          let fows = document.getElementById('followers').innerText;
          fows = fows.split(' ')
          fows[0] = parseInt(fows[0])+1;
          fows = fows.join(' ');
          document.getElementById('followers').innerText = fows;
          nres2 = true;
          document.getElementById('followbtn').innerText='Un friend';
          document.getElementById('frst').style.display='block';
          checkc = false;
          
          try {
              let ldata = JSON.parse(localStorage.getItem("logindata"));
              let localdata = location.state;
              let {userid} = localdata;
              let {email} = ldata;

              let dataToServer ={
                  semail : email,
                  upid : userid

              }
              const response = await fetch(mainServerUrl+'/addfollowers', {
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
                let { sposts, sfollowers, sfollowing, sid, sname, sfollowersdata, sfollowingdata, semail} = message;
                let allflwrsdata = sfollowersdata.split(',');
                allflwrsdata.splice(0, 1);
                let allflwingsdata = sfollowingdata.split(',');
                allflwingsdata.splice(0, 1);
                
                setId(sid);
                setName(sname);
                setPost(sposts);
                setFollowers(sfollowers);
                setFollowing(sfollowing);
                setEmail(semail);
                if(semail===glemail){
                  navigate('/profile')
                }
                setFollowersdata(allflwrsdata);
                setFollowingdata(allflwingsdata);
              }
        
            } catch (error) {
              // Handle errors during the fetch
              console.log('error is ', error);
              //alert('We are facing some problem or check your internet connection')
            }
      
      }


  }



      //Function to decreaser followers
      async function unfriend() {
        if(document.getElementById('followbtn').innerText==='Un friend'){
            let fows = document.getElementById('followers').innerText;
            fows = fows.split(' ')
            fows[0] = parseInt(fows[0])-1;
            fows = fows.join(' ');
            document.getElementById('followers').innerText = fows;
            //getfollowingdetails();
            document.getElementById('followbtn').innerText='Follow back';
            document.getElementById('frst').style.display='none';
            try {
                let ldata = JSON.parse(localStorage.getItem("logindata"));
                let localdata = location.state;
                let {userid} = localdata;
                let {email} = ldata;
  
                let dataToServer ={
                    semail : email,
                    upid : userid
  
                }
                const response = await fetch(mainServerUrl+'/removefollowers', {
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
                  let { sposts, sfollowers, sfollowing, sid, sname, sfollowersdata, sfollowingdata, semail} = message;
                  let allflwrsdata = sfollowersdata.split(',');
                  allflwrsdata.splice(0, 1);
                  let allflwingsdata = sfollowingdata.split(',');
                  allflwingsdata.splice(0, 1);

                  setId(sid);
                  setName(sname);
                  setPost(sposts);
                  setFollowers(sfollowers);
                  setFollowing(sfollowing);
                  setEmail(semail);
                  if(semail===glemail){
                    navigate('/profile')
                  }
                  setFollowersdata(allflwrsdata);
                  setFollowingdata(allflwingsdata);
                }
          
              } catch (error) {
                // Handle errors during the fetch
                console.log('error is ', error);
                //alert('We are facing some problem or check your internet connection')
              }
        
        }
        else{
          checkc = true;
        }
    }





    function afdffb(){
      let txt = document.getElementById('followbtn').innerText;
      //alert(txt);
      if(txt==='Follow'){
        increasefollower();
      }
      else if(txt==='Unfollow'){
        decreasefollower();
        }
      else if(txt==='Follow back'){
        //alert('f back');
        fbincreasefollower()
      }
      else if(txt==='Un friend'){
        unfriend();
      }
    }
    

  async function alldet(userid){
    let dataToServer={
      sid : userid
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
        let { sposts, sfollowers, sfollowing, sid, sname, sfollowersdata, sfollowingdata, semail} = message;
        let allflwrsdata = sfollowersdata.split(',');
        allflwrsdata.splice(0, 1);
        let allflwingsdata = sfollowingdata.split(',');
        allflwingsdata.splice(0, 1);

        setId(sid);
        glid = sid;
        //alert('global id : '+glid);
        getmyfollowingdetails();
        setName(sname);
        setEmail(semail);
        if(semail===glemail){
          navigate('/profile')
        }
        setPost(sposts);
        setFollowers(sfollowers);
        setFollowing(sfollowing);
        setFollowersdata(allflwrsdata);
        setFollowingdata(allflwingsdata);
        getallreelsdata(sid);
      }

    } catch (error) {
      // Handle errors during the fetch
      console.log('error is ', error);
      //alert('We are facing some problem or check your internet connection')
    }
  }

  useEffect(()=>{
    document.getElementById('mainhomebar').style.backgroundColor='#dbdbdb';
    document.getElementById('mainsearchbar').style.backgroundColor='';
    document.getElementById('mainexplorebar').style.backgroundColor='';
    document.getElementById('mainreelsbar').style.backgroundColor='';
    document.getElementById('mainaddbar').style.backgroundColor='';
    document.getElementById('mainnotificationbar').style.backgroundColor='';
    document.getElementById('mainprofilebar').style.backgroundColor='';
    document.getElementById('followbtn').style.display='none';
    document.getElementById('frst').style.display='none';
    showbtn(false);
    let localdata = location.state;
    //alert('local data',localdata);
    let locallocaldata = JSON.parse(localStorage.getItem("logindata"));
    let {email} = locallocaldata;
    glemail = email;
    if(localdata && locallocaldata){
      let {userid} = localdata;
      alldet(userid);
      getfollowingdetails();
      //getmyfollowingdetails();

      //document.getElementById('followbtn').style.display='none';
    }
    else{
      navigate('/');
    }
  },[])
  //document.getElementById('followbtn').style.display='block';



  
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
    <div id='profile'>
            <div id="info">
                <div id="logo"><img id='profimg' src="/assets/icons/profileimg.png" alt="profilelogo" /></div>
                <div id="alldetails">
                    <div id="allinfotop">
                        <h5>{id}</h5>                       
                    </div>
                    <div id="allinfomidle">
                        <h5>{posts} Posts</h5>
                        <h5 id='followers' className='flwflrlb' onClick={() => showflw()} >{followers} Followers</h5>
                        <h5 className='flwflrlb' onClick={() => showflwing()} >{following} Following</h5>
                    </div>
                    <div id="allinfobottom">
                        <h5>{name}</h5>
                        <h5 id='frst'>Friends</h5>
                        <button id='followbtn' onClick={()=>afdffb()} onLoad={showbtnfn} >---</button>
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
                  <source src={`${mainServerUrl}/stream-video/${filename}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                </div>
                ))}


            <div id="frfwbox">
              <div id="frfwboxhead">
                <h4 id='frfwboxheadlb'>{name} followers</h4>
                <img onClick={() => hidediv()} id='closebtn' src="/assets/icons/close.png" alt="close" />
              </div>
              <ul id='flul'>
                {followersdatas.map((user, index) => (<li onClick={() => flwnavtoprofile(index)} key={index} className='flli' >{user}</li>))}
              </ul>
            </div>

            <div id="frfwbox2">
              <div id="frfwboxhead">
                <h4 id='frfwboxheadlb'>{name} followed</h4>
                <img onClick={() => hidediv()} id='closebtn' src="/assets/icons/close.png" alt="close" />
              </div>
              <ul id='flul'>
                {followingdatas.map((user, index) => (<li onClick={() => flwnavtoprofile2(index)} key={index} className='flli' >{user}</li>))}
              </ul>

            </div>

            </div>


        </div>
  );
}
  


export default Profile;





