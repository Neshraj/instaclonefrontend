import '../styles/common.css';
import '../styles/home.css';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home(){
    const navigate = useNavigate();
    const mainServerUrl = 'https://instacloneserver-raj1.onrender.com';


    //Functions starts hear
    useEffect(() => {
        document.getElementById('mainhomebar').style.backgroundColor='#dbdbdb';
        document.getElementById('mainsearchbar').style.backgroundColor='';
        document.getElementById('mainexplorebar').style.backgroundColor='';
        document.getElementById('mainreelsbar').style.backgroundColor='';
        document.getElementById('mainaddbar').style.backgroundColor='';
        document.getElementById('mainnotificationbar').style.backgroundColor='';
        document.getElementById('mainprofilebar').style.backgroundColor='';
        
        let logindata = JSON.parse(localStorage.getItem("logindata"));
        if (logindata) {
          navigate('/users');
        }
      }, [navigate]);

    function togglePasswordVisibility() {
        var passwordInput = document.getElementById("password");
        var showPasswordBtn = document.getElementById("show-password-btn");
  
        if (passwordInput.type === "password") {
          passwordInput.type = "text";
          showPasswordBtn.textContent = "Hide";
        } else {
          passwordInput.type = "password";
          showPasswordBtn.textContent = "Show";
        }
      }
      
      

      const login = async () => {
        let lemail=document.getElementById('email').value.trim();
        let lpassword=document.getElementById('password').value.trim();
        if(!lemail){
            alert('Enter email id');
            return;
        }
        else if(!lpassword){
            alert('Enter password')
            return;
        }
        else if(!lemail.endsWith('com')){
            alert('Enter valid email id');
            return;
        }
        let logindata={
            email : lemail,
            password : lpassword
        }
        let dataToServer={
            semail : lemail,
            spassword : lpassword,
        }

        try {
            const response = await fetch(mainServerUrl+'/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',

              },
              body: JSON.stringify(dataToServer),
            });
    
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const {message} = await response.json();
        if(message===true){
            localStorage.setItem("logindata",JSON.stringify(logindata));
            navigate('/users');
        }
        else{
            alert(message);
        }
        } catch (error) {
        // Handle errors during the fetch
        console.error('Fetch error:', error);
        }
    };

      //Function ends hear

    return (
        <div id="hero">
            <div id="form">
                
                <div id="formlogos">
                    <img id="logotext" src="/assets/images/insta.png" alt="instalaqbel"/>
                </div>

                <div id="formitem">
                    <input className='formitems' type="email" id="email" placeholder="Email" />
                    
                    <div className="password-container">
                        <input type="password" id="password" className='formitems' placeholder="Password" required />
                        <span id="show-password-btn" onClick={togglePasswordVisibility}>Show</span>
                    </div>
                    <div id="forgotpassword">
                        <Link to="/forgotpassword" style={{ textDecoration: 'none', color: 'rgb(67, 67, 67)' }}><h6>forgot password</h6></Link>
                    </div>

                    <div id="footer">
                        <button className='logsign' onClick={login}>Login</button>
                        <Link to="/createaccount"><button className='logsign'>Sing Up</button></Link>
                    </div>

                </div>
            </div>
        </div>
    )

}

export default Home;

