import '../styles/createaccount.css'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


function Createaccount(){

    useEffect(()=>{
        document.getElementById('mainhomebar').style.backgroundColor='#dbdbdb';
        document.getElementById('mainsearchbar').style.backgroundColor='';
        document.getElementById('mainexplorebar').style.backgroundColor='';
        document.getElementById('mainreelsbar').style.backgroundColor='';
        document.getElementById('mainaddbar').style.backgroundColor='';
        document.getElementById('mainnotificationbar').style.backgroundColor='';
        document.getElementById('mainprofilebar').style.backgroundColor='';
    })

    const navigate = useNavigate();
    const mainServerUrl = 'https://instacloneserver-00mi.onrender.com';
    // server logic for otp
    const sendOTP = async ()=>{
        let oemail = document.getElementById('email').value.trim()
        if(!oemail){
            alert('Enter email id to receive OTP');
        }
        else if(!oemail.endsWith('@gmail.com')){
            alert('Enter valid email');
        }
        else{

            let dataToServer = {
                semail : oemail
            }

            try {
                const response = await fetch(mainServerUrl+'/sendotp', {
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
            alert(message);
            // Handle the data returned from the server
            } catch (error) {
            // Handle errors during the fetch
            console.error('Fetch error:', error);
            }

        }
    }

    //Function starts hear

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


      function signup(){
        let lemail=document.getElementById('email').value.trim();
        let lpassword=document.getElementById('password').value.trim();
        let confirmpassword=document.getElementById('confirmpassword').value.trim()
        let otp=document.getElementById('otp').value.trim()
        let check=false;
        let allfeild=false
        if(lemail && lpassword && confirmpassword && otp){
            allfeild=true;
            if(!lemail.endsWith("@gmail.com")){
                alert('Invalid Email Id')
            }
            else if(lpassword.length<3){
                alert('Password length must be greater then 3')
            }
            else if(lpassword!==confirmpassword){
                alert('Password not match')
            }
            else if(otp.length<3){
                alert('Enter valied otp')
            }
    
            else{
                check=true;
            }
    
            if(allfeild && check){
                if(lemail && lpassword){
                    let logindata = {
                        email : lemail,
                        password : lpassword
                    }

                    //Data base starts hear

                    const sendData = async () => {
                        let dataToServer={
                            semail : lemail,
                            spassword : lpassword,
                            cpassword : confirmpassword,
                            sotp : otp
                        }
                
                        try {
                            const response = await fetch(mainServerUrl+'/forgotpassword', {
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
                        alert(message);
                        navigate('/');
                        // Handle the data returned from the server
                        } catch (error) {
                        // Handle errors during the fetch
                        console.error('Fetch error:', error);
                        }
                    };
                
                    //Data base ends hear

                    // Data base calling

  
                    // Call the function when needed
                    sendData(); 
  

                    
                }
            }
        }

        
        else{
            alert('Enter all feilds correctly')
        }

        


    }

      //Function ends hear

    return (
        <div id="hero">

        <div id="form">

                <div id="formlogo">
                    <img id="logotext" src="/assets/images/insta.png" alt="instalaqbel"/> 
                 </div>

                 <div id="allinputs">
                    <input className='forminputs' id='email' type="email" placeholder='Email' required />

                    <div className="password-container">
                        <input type="password" id="password" className='forminputs' placeholder="New password" required />
                        <span id="show-password-btn2" onClick={togglePasswordVisibility}>Show</span>
                    </div>

                    <input className='forminputs' type="password" placeholder='Confirm Password' id='confirmpassword' required /> 
                    <div id="verification">
                        <input type="text" id="otp" placeholder='Enter OTP' className='forminputs' required />
                        <button id='getotp' onClick={sendOTP}>Get OTP</button>
                    </div>

                    <div id="footer">
                        <button id='createbutton' onClick={signup}>Change password</button>
                    </div>
                 </div>
        </div>
        
    

    </div>
    )
}


export default Createaccount;