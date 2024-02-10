import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/users.css';

function Users() {
  //2data
  let glfl = false;
  let nres1 = false;
  let nres2 = false;
  let btfb = [];
  //2data
  let glid;
  //22data
  let followingdata1 = [];

  //22data
  let followfollowingdata = [];
  let followingdata = [];
  const navigate = useNavigate();
  const [mfollowfollowingdata, setFollowFollowingData] = useState([]);
  const mainServerUrl = 'https://instacloneserver-00mi.onrender.com';



    //22


    async function getmyfollowingdetails() {

      try {
        //let localdata = location.state;
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
          console.log('second request : ',message);
          followingdata1 = message.split(',');
          followingdata1.splice(0, 1);
          //alert('zxcv'+followingdata1)
          //alert('followingdata1'+followingdata1);
          //alert('userid'+glid);
          //alert('import data'+followingdata1);
          for(let gi = 0; gi<=glid.length; gi++){
            //alert('inc '+glid[gi]);
            if (followingdata1.includes(glid[gi])){
              //setMyfst(true);
              //alert('yes');
              nres1 = true;
              //alert('he following you');
              //alert('bothres'+nres1+''+nres2);
              if(nres1 && btfb.includes(gi)){
                followfollowingdata[gi] = 'Un friend';
                //document.getElementById('followbtn').innerText='Un friend';
                //document.getElementById('frst').style.display='block';
              }
              
              else{
                  followfollowingdata[gi] = 'Follow back';
                //document.getElementById('followbtn').innerText='Follow back';
              }
              console.log('follwonh',followingdata1);
              
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
          setFollowFollowingData([...followfollowingdata]);
  
            
          
        }
        //alert('22');
      } catch (error) {
        // Handle errors during the fetch
        console.log('error is ', error);
        //alert('We are facing some problem or check your internet connection')
      }
      //showbtn(true);
    }




  async function getfollowingdetails(allUserIds) {
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
          //alert('data : ' +allUserIds);
          //alert('df : '+followfollowingdata);
          if (followingdata.includes(allUserIds[i])){
            followfollowingdata[i] = 'Unfollow';
            //alert('you following him');
            //setMyfst2(true);
            nres2 = true;
            btfb.push(i);
            //alert('bothres'+nres1+''+nres2);
            //document.getElementById('followbtn').innerText='Unfollow';
            glfl = true;
            //followfollowingdata[i] = 'Following';
          }
          else{
            glfl = false;
          }

          /*if (followingdata.includes(allUserIds[i])) {
            followfollowingdata[i] = 'Following';
          } else {
            followfollowingdata[i] = 'Follow';
          }*/
        }
        setFollowFollowingData([...followfollowingdata]); // Update state using spread operator
      }
      //alert('11');
    } catch (error) {
      // Handle errors during the fetch
      console.log('error is ', error);
      //alert('We are facing some problem or check your internet connection')
    }
    getmyfollowingdetails();
  }

  // State variables to store user data
  const [allUsernames, setAllUsernames] = useState([]);
  const [allUserIds, setAllUserIds] = useState([]);
  const [allUseremail, setAllUseremail] = useState([]);

  function navtoprofile(index) {
    let userid = allUserIds[index];
    let username = allUsernames[index];
    let useremail = allUseremail[index];
    //alert('nav id : '+userid);
    navigate('/userprofile', {
      state: {
        userid,
      },
    });
  }

  // Functions start here
  useEffect(() => {

    document.getElementById('mainhomebar').style.backgroundColor='#dbdbdb';
    document.getElementById('mainsearchbar').style.backgroundColor='';
    document.getElementById('mainexplorebar').style.backgroundColor='';
    document.getElementById('mainreelsbar').style.backgroundColor='';
    document.getElementById('mainaddbar').style.backgroundColor='';
    document.getElementById('mainnotificationbar').style.backgroundColor='';
    document.getElementById('mainprofilebar').style.backgroundColor='';

    let localdata = JSON.parse(localStorage.getItem('logindata'));
    if(!localdata){
      navigate('/');
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
        let userIds = [];
        let useremails = [];

        message.forEach((element) => {
          const { sname, sid, semail } = element;
          usernames.push(sname);
          userIds.push(sid);
          useremails.push(semail);
        });
        glid = userIds;
        


        // Update the state with the fetched data
        
        
        getfollowingdetails(userIds);
        let localedata = JSON.parse(localStorage.getItem("logindata"));
        let {email} = localedata;
        if(useremails.includes(email)){
          let index = useremails.indexOf(email);
          if (index !== -1) {
            usernames.splice(index, 1);
            userIds.splice(index, 1);
            useremails.splice(index, 1);
        }
        }
        for (let i = userIds.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [userIds[i], userIds[j]] = [userIds[j], userIds[i]];
          [useremails[i], useremails[j]] = [useremails[j], useremails[i]];
          [usernames[i], usernames[j]] = [usernames[j], usernames[i]];
        }
        setAllUseremail(useremails);
        setAllUserIds(userIds);
        setAllUsernames(usernames);
        
         // Pass userIds to the function
      } catch (error) {
        // Handle errors during the fetch
        console.error('Fetch error:', error);
      }
    }

    // Call the fetchData function
    getallusers();
  }, []); // The empty dependency array means this effect will run once when the component mounts

  // Functions end here
  //let allUsern=['neshraj','niranjan','praveen','vamsi','bharath','kalam','mohan','raj','neshraj','niranjan','praveen','vamsi','bharath','kalam','mohan','raj']
  return (
    <div id='usersbody'>
      <h1 id='userheading'>Suggested for you</h1>
      <ul id='userlist'>
        {allUserIds.map((user, index) => (
          <li onClick={() => navtoprofile(index)} key={index} className='users'>
            {user}<button className='btns' id='followfollwingbtn' >{mfollowfollowingdata[index]}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
