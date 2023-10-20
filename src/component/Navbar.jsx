import { Link } from 'react-router-dom';
import { searchMovie } from './Api';

export default function Navbar ({isLoggedIn, setIsLoggedIn, searchQuery}){

    /* define search  */
    const search = async (q) => {
        if (q.length > 3) {
            const query = await searchMovie(q);
            searchQuery(query.data);
            console.log(searchQuery)
        }
      }


    return (
        
<div className='navbar-wrapper'>
        <h4>Movielist</h4>
        <input type="search" placeholder='What do you want to watch?' onChange={({ target }) => search(target.value)}/>
        {isLoggedIn ? (
                  <div className="button-wrapper">          
                  <button className='register'
                  onClick={() => {
                    localStorage.removeItem("token");
                    setIsLoggedIn(false);
                    window.location.href = "/";
                  }}
                  >Logout</button>
                  </div>
        ) : (
          <div className="button-wrapper">          
          <Link as={Link} to={'/login'}><button className='login'>Login</button></Link>
          <Link as={Link} to={'/register'} ><button className='register'>Register</button></Link>
          </div>
        ) }
      </div>
        )
    }
