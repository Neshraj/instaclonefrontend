import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/common.css';
import '../styles/search.css';

function Search(){

    const navigate = useNavigate();

    let usernames = [];
    let userIds = [];
    let useremails = [];
    let glid = [];
    let [resid, setResId] = useState();
    let [searchdisplay , setSearchDisplay] = useState(false);
    let [errordisplay , setErrorDisplay] = useState(false);
    let [resultdisplay , setResultDisplay] = useState(false);

    async function getaccount() {
      setSearchDisplay(true);
      setErrorDisplay(false);
      setResultDisplay(false);
      try {
        const response = await fetch('https://instacloneserver-00mi.onrender.com/allusers', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const { message } = await response.json();
      //   console.log('allus',response);
      //   console.log('ms',message);


        message.forEach((element) => {
          const { sname, sid, semail } = element;
          usernames.push(sname);
          userIds.push(sid);
          useremails.push(semail);
        });
        glid = userIds;
         
         // Pass userIds to the function
      } catch (error) {
        // Handle errors during the fetch
        console.error('Fetch error:', error);
      }
      finally{
          console.log(usernames);
          console.log(userIds);
          console.log(useremails);
      }
      let sentuserid = document.getElementById('searchbox').value;

      if(userIds.includes(sentuserid)){
        setResId(sentuserid);
        setSearchDisplay(false);
        setErrorDisplay(false);
        setResultDisplay(true);
      }
      else{
        setSearchDisplay(false);
        setErrorDisplay(true);
        setResultDisplay(false);
      }
    }

    useEffect(()=>{


        document.getElementById('mainhomebar').style.backgroundColor='';
        document.getElementById('mainsearchbar').style.backgroundColor='#dbdbdb';
        document.getElementById('mainexplorebar').style.backgroundColor='';
        document.getElementById('mainreelsbar').style.backgroundColor='';
        document.getElementById('mainaddbar').style.backgroundColor='';
        document.getElementById('mainnotificationbar').style.backgroundColor='';
        document.getElementById('mainprofilebar').style.backgroundColor='';

        const handleKeyPress = (event) => {
          if (event.key === 'Enter') {
            getaccount();
          }
        };

        document.addEventListener('keydown', handleKeyPress);



        let localdata = JSON.parse(localStorage.getItem('logindata'));
        if(!localdata){
            navigate('/');
        }

        return () => {
          document.removeEventListener('keydown', handleKeyPress);
        };

    },[])





    function navtoprofile(idtoprofile) {
      let userid = idtoprofile;
      //alert('nav id : '+userid);
      navigate('/userprofile', {
        state: {
          userid,
        },
      });
    }




    return (
        <div id='search'>
            <div id="head">
              <h1>Search</h1>
            </div>

            <div id="searchbar">
              <div id="searchboxdiv">
                <input type="text" placeholder='search' 
                id='searchbox'/>

                <img src="/assets/icons/search.png" alt="searchicon" id='searchicon' onClick={()=>getaccount()} />
              </div>
              
            </div>

            <div id="result">
              <h3 id='afterresult' style={{display:resultdisplay?'block':'none' }} onClick={(e)=>navtoprofile(resid)}>
                {resid}
              </h3>

              <h3 id='noresult' style={{display:errordisplay?'block':'none' }}>
                No account found with this id
              </h3>

              <h3 id='searching' style={{display:searchdisplay?'block':'none' }}>Searching</h3>
            </div>




        </div>

    )
}

export default Search;