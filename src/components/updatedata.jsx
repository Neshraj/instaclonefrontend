import '../styles/createaccount.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Updatedata() {
  const navigate = useNavigate();

  function noedit() {
    alert('You cant edit this field');
  }

  function togglePasswordVisibility() {
    var passwordInput = document.getElementById("password");
    var showPasswordBtn = document.getElementById("show-password-btn2");

    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      showPasswordBtn.textContent = "Hide";
    } else {
      passwordInput.type = "password";
      showPasswordBtn.textContent = "Show";
    }
  }

  // server logic for otp
  const [id, setId] = useState('---');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('---');
  const [password, setPassword] = useState('---');
  const [cpassword, setCpassword] = useState('---');
  const mainServerUrl = 'https://instacloneserver-raj1.onrender.com';

  useEffect(() => {

    document.getElementById('mainhomebar').style.backgroundColor='';
    document.getElementById('mainsearchbar').style.backgroundColor='';
    document.getElementById('mainexplorebar').style.backgroundColor='';
    document.getElementById('mainreelsbar').style.backgroundColor='';
    document.getElementById('mainaddbar').style.backgroundColor='';
    document.getElementById('mainnotificationbar').style.backgroundColor='';
    document.getElementById('mainprofilebar').style.backgroundColor='#dbdbdb';

    async function alldet() {
      let localdata = JSON.parse(localStorage.getItem('logindata'));
      let { email } = localdata;
      let dataToServer = {
        semail: email
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
          //navigate('/');
        } else {
          let { sid, sname, spassword, semail } = message;
          setId(sid);
          setName(sname);
          setPassword(spassword);
          setCpassword(spassword);
          setEmail(semail);
        }

      } catch (error) {
        // Handle errors during the fetch
        console.log('error is ', error);
        //alert('We are facing some problem or check your internet connection')
      }
    }
    alldet();
  }, []);

  function update() {
    let lemail = document.getElementById('email').value.trim();
    let lpassword = document.getElementById('password').value.trim();
    let name = document.getElementById('name').value.trim();
    let userid = document.getElementById('userid').value.trim();
    let confirmpassword = document.getElementById('confirmpassword').value.trim();
    let check = false;
    let allfeild = false;

    if (name && userid && lemail && lpassword && confirmpassword) {
      allfeild = true;
      if (name.length < 3) {
        alert('Name length must be greater than 2');
      } else if (userid.length < 4) {
        alert('UserId length must be greater than 4');
      } else if (!lemail.endsWith("@gmail.com")) {
        alert('Invalid Email Id');
      } else if (lpassword.length < 3) {
        alert('Password length must be greater than 3');
      } else if (lpassword !== confirmpassword) {
        alert('Password not match');
      } else {
        check = true;
      }

      if (allfeild && check) {
        if (lemail && lpassword) {
          let logindata = {
            email: lemail,
            password: lpassword
          };

          // Data base calling
          // Update the user data on the server (send a request to your API)

          const sendData = async () => {
            let dataToServer = {
              sname: name,
              spassword: lpassword,
              semail : lemail
            };

            try {
              const response = await fetch(mainServerUrl+'/updatedata', {
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
              if (message === 'User data updated successfully') {
                localStorage.setItem("logindata", JSON.stringify(logindata));
                alert(message);
                navigate('/');
              } else {
                alert(message);
                navigate('/');
              }
            } catch (error) {
              // Handle errors during the fetch
              console.error('Fetch error:', error);
            }
          };

          // Call the function when needed
          sendData();
        }
      }
    } else {
      alert('Enter all fields correctly');
    }
  }

  return (
    <div id="hero">
      <div id="form">
        <div id="formlogo">
          <img id="logotext" src="/assets/images/insta.png" alt="instalaqbel" />
        </div>
        <div id="allinputs">
          <input
            className='forminputs'
            type="text"
            placeholder='Name'
            id='name'
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className='forminputs'
            type="text"
            placeholder='User Id'
            id='userid'
            value={id}
            readOnly
            onClick={noedit}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className='forminputs'
            id='email'
            type="email"
            placeholder='Email'
            value={email}
            readOnly
            onClick={noedit}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="password-container">
            <input
              type="password"
              id="password"
              className='forminputs'
              placeholder="Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <span id="show-password-btn2" onClick={togglePasswordVisibility}>Show</span>
          </div>
          <input
            className='forminputs'
            type="password"
            placeholder='Confirm Password'
            id='confirmpassword'
            value={cpassword}
            required
            onChange={(e) => setCpassword(e.target.value)}
          />
          <div id="footer">
            <button id='createbutton' onClick={update}>Update Data</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Updatedata;
