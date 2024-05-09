import '../styles/notifications.css';
import { useEffect, useId, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Notifications(){

    const navigate = useNavigate();
    let [notificationsdata, setNotification]=useState(['Loading...']);
    let alluserids = [];
    let [malluserid, setAllUserId] = useState([]);
    let [allfilepaths, setfilePath] = useState([]);
    let [alluserstoreel, setUserToReel] = useState([])
    let sharedfilepath = [];
    let usertorell = [];
    const mainServerUrl = 'https://instacloneserver-00mi.onrender.com';

    function navtoprl(index,event) {
      event.stopPropagation();
        let userid = malluserid[index];
        navigate('/userprofile', {
          state: {
            userid,
          },
        });
        //window.location.reload();
      }
    function navtoreels(event,index){
      if(alluserstoreel.includes(index)){
        event.stopPropagation();
        navigate('/sharedreel', {
          state: {
            filepathfromnot : allfilepaths[index],
          },
        });

      }
    }


    async function clearnotdata(){
        alert('in cls');
        setNotification(['No notifications']);
        let localdata;
        let dataToServer;
        let llemail;
        let rlindx = document.querySelectorAll('.watchreelcls');
        rlindx.forEach((pp, index) => {
          rlindx[index].style.display='none';
        });
        try{
            localdata = JSON.parse(localStorage.getItem('logindata'));
            let { email } = localdata;
            dataToServer = {
              semail: email
            };
        }
        catch{
          
        }

        try {
            const response = await fetch(mainServerUrl+'/clearnotifications', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(dataToServer),
            });
    
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }

          } catch (error) {
            // Handle errors during the fetch
            console.error('Fetch error:', error);
          }
    }

    useEffect(()=>{
        document.getElementById('mainhomebar').style.backgroundColor='';
        document.getElementById('mainsearchbar').style.backgroundColor='';
        document.getElementById('mainexplorebar').style.backgroundColor='';
        document.getElementById('mainreelsbar').style.backgroundColor='';
        document.getElementById('mainaddbar').style.backgroundColor='';
        document.getElementById('mainnotificationbar').style.backgroundColor='#dbdbdb';
        document.getElementById('mainprofilebar').style.backgroundColor='';

        async function getnotification() {
            let localdata;
            let dataToServer;
            let llemail;
            try{
                localdata = JSON.parse(localStorage.getItem('logindata'));
                let { email } = localdata;
                dataToServer = {
                  semail: email
                };
            }
            catch{
                
            }
            if(!localdata){
                navigate('/');
            }

            try {
              const response = await fetch(mainServerUrl+'/notifications', {
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
              //console.log('notigications : ',typeof message);
              //console.log('notigications : ',message);
              let resultArray = message.split(',');
              let r1 = resultArray.slice(1);
              for(let key in r1 ){
                if(r1[key].endsWith('rfwr')){
                    let sr = r1[key].slice(0,-4);
                    r1[key] = sr+' un followed you';
                    alluserids[key] = sr;
                    sharedfilepath.push(' ');
                }

                else if(r1[key].endsWith('fwr')){
                    let sr = r1[key].slice(0,-3);
                    r1[key] = sr+' followed you';
                    alluserids[key] = sr;
                    sharedfilepath.push(' ');
                }

                else if(r1[key].endsWith('liked1')){
                  let sr = r1[key].slice(0,-6);
                  r1[key] = sr+' liked your post';
                  alluserids[key] = sr;
                  sharedfilepath.push(' ');
                }

                else if(r1[key].endsWith('unliked2')){
                  let sr = r1[key].slice(0,-8);
                  r1[key] = sr+' unliked your post';
                  alluserids[key] = sr;
                  sharedfilepath.push(' ');
                }

                else if(r1[key].endsWith('cmt')){
                  let sr = r1[key].slice(0,-3);
                  r1[key] = sr+' commant to your post';
                  alluserids[key] = sr;
                  sharedfilepath.push(' ');
                }

                else if(r1[key].endsWith('sntrl')){
                  let sr = r1[key].slice(0,-5);
                  let sr1 = sr.split('|');
                  sr = sr1[0];
                  let fp = sr1[1];
                  let shuid = sr1[2];
                  r1[key] = sr+' shared a post by '+shuid;
                  alluserids[key] = sr;
                  usertorell.push(parseInt(key));
                  sharedfilepath.push(fp);
                }
              }
              setAllUserId(alluserids);
              setUserToReel(usertorell);
              setfilePath(sharedfilepath);
              if(r1.length<1){
                setNotification(['No notifications']);
              }
              else{
                setNotification(r1);
              }
            // Pass userIds to the function
            } catch (error) {
              // Handle errors during the fetch
              console.error('Fetch error:', error);
            }
          }
          getnotification();
    },[]);

    useEffect(()=>{
      let rlindx = document.querySelectorAll('.watchreelcls');
      rlindx.forEach((pp, index) => {
        if(alluserstoreel.includes(parseInt(index))){
          pp.style.display='block';
        }
      
      });
  },[notificationsdata])

    return (
        <div id='notificationbar'>
            <div id="nothead">
                <h1>Notifications</h1>
            </div>
            <div id="notdata">
                <h6 id='clntfc' onClick={()=>{clearnotdata()}}>Clrear notifications</h6>
                <ul id='allnotifications'>
                    {notificationsdata.map((notalldata, index) => (<p className='notli' key={index} onClick={(event)=>{navtoprl(index,event)}} >{notalldata} <h4 className='watchreelcls' onClick={(event)=>{navtoreels(event,index)}}>Watch reel</h4></p>))}
                </ul>
            </div>
        </div>
    )
}

export default Notifications;