import { Link } from 'react-router-dom';
import '../CssFiles/Burger.css'
const HamburgerMenu = () => {
    return (

<div class="hamburger-menu">
    <input id="menu__toggle" type="checkbox" />
    <label class="menu__btn" for="menu__toggle">
      <span></span>
    </label>

    <ul class="menu__box">
      <li>
        <Link to='/editLinks' class="menu__item">Edit Display</Link>
        </li>
      <li>
        <Link to='/display' class="menu__item">Display</Link>
        </li>
      <li>
        <Link to='/stats' class="menu__item">Links Stats</Link>
      </li>
      <li style={{cursor: 'pointer'}} class="menu__item" onClick={()=>{window.location.reload(false);
                            localStorage.removeItem('token')}}>
        Log Out
      </li>
      
    </ul>
  </div>
    );
  
}

export default HamburgerMenu;
