import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/common.css';
import Sidebar from "./components/sidebar";
import Home from "./components/home";
import Search from "./components/search";
import Explore from './components/explore';
import Reels from "./components/reels";
import Addreel from "./components/addreel";
import Notifications from './components/notifications';
import Profile from "./components/profile";
import PageNotFound from './components/pagenotfound';
import Forgotpassword from './components/forgotpassword';
import Createaccount from './components/createaccount';
import Users from './components/users';
import Userprofile from './components/usersprofile';
import Updatedata from './components/updatedata';
import SharedReel from './components/sharedreel';
import UserPosts from './components/userposts';

function App() {
  return (
    <div className="App">
      <Router>
        <Sidebar />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/reels" element={<Reels />} />
        <Route path="/addreel" element={<Addreel />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/userprofile" element={<Userprofile />} />
        <Route path="/createaccount" element={<Createaccount/>} />
        <Route path="/users" element={<Users/>} />
        <Route path="/forgotpassword" element={<Forgotpassword/>} />
        <Route path="/updatedata" element={<Updatedata/>} />
        <Route path="/sharedreel" element={<SharedReel/>} />
        <Route path="/userposts" element={<UserPosts/>} />
        <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
