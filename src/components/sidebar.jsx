import '../styles/sidebar.css'
import '../styles/common.css'
import { BrowserRouter as Router, Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function Sidebar(){
    const navigate = useNavigate()
    function navtosidetopro(){
        navigate('/profile', {
            state: {
              userid : 'null',
              username : 'null',
              useremail : 'null'
            }
          });
    }

    function changebackground(e) {
        // Remove background color from all links
        document.querySelectorAll('.navitems').forEach(function(link) {
            link.style.backgroundColor = ""; // Set it to an empty string or your default color
        });
        document.querySelectorAll('.navlabs').forEach(function(link) {
            link.style.backgroundColor = ""; // Set it to an empty string or your default color
        });
        document.querySelectorAll('.navicons').forEach(function(link) {
            link.style.backgroundColor = ""; // Set it to an empty string or your default color
        });
 
    }

    return (
        <div id='herobox'>
            
                <img src="/assets/images/insta.png" alt="instaimage" id='instalogo' />

                <Link onClick={changebackground} style={{ textDecoration: 'none' }} to="/"><div id='mainhomebar' className="navitems"><img className='navicons' src="/assets/icons/home.png" alt="homeicon" /> <h4 className='navlabs'>Home</h4></div></Link>

                <Link onClick={changebackground}  style={{ textDecoration: 'none' }} to="/search"><div id='mainsearchbar' className="navitems"><img className='navicons' src="/assets/icons/search.png" alt="homeicon" /> <h4 className='navlabs'>Search</h4></div></Link>

                <Link onClick={changebackground} style={{ textDecoration: 'none' }} to="/explore"><div id='mainexplorebar' className="navitems"><img className='navicons' src="/assets/icons/compass.png" alt="compassicon" /> <h4 className='navlabs'>Explore</h4></div></Link>

                <Link onClick={changebackground} style={{ textDecoration: 'none' }} to="/reels"><div id='mainreelsbar' className="navitems"><img className='navicons' src="/assets/icons/video.png" alt="homeicon" /> <h4 className='navlabs'>Reels</h4></div></Link>
                
                <Link onClick={changebackground} style={{ textDecoration: 'none' }} to="/addreel"><div id='mainaddbar' className="navitems"><img className='navicons' src="/assets/icons/add.png" alt="homeicon" /> <h4 className='navlabs'>Add</h4></div></Link>

                <Link onClick={changebackground} style={{ textDecoration: 'none' }} to="/notifications"><div id='mainnotificationbar' className="navitems"><img className='navicons' src="/assets/icons/like.png" alt="homeicon" /> <h4 className='navlabs'>Notifications</h4></div></Link>

                <Link onClick={()=>navtosidetopro} style={{ textDecoration: 'none' }} to="/profile" ><div id='mainprofilebar' className="navitems"><img className='navicons' src="/assets/icons/user.png" alt="homeicon" /> <h4 className='navlabs'>Profile</h4></div></Link>
        </div>
    )
}

export default Sidebar;