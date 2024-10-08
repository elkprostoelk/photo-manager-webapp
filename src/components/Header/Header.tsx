import './Header.css';
import {Avatar} from "primereact/avatar";
import {MouseEventHandler, useRef, useState} from "react";
import {NavLink} from "react-router-dom";
import {getLoggedInUser, isUserLoggedIn, logoutUser} from "../../utils/user.ts";
import {Button} from "primereact/button";
import {Toast} from "primereact/toast";
import {Menu} from "primereact/menu";
import {MenuItem} from "primereact/menuitem";

const Header = () => {
    const userMenuToast = useRef<Toast>(null);
    const userMenu = useRef<Menu>(null);
    const userMenuItems: MenuItem[] = [
        {
            label: 'Sign out',
            icon: 'pi-sign-out',
            command: () => {
                logoutUser();
                window.location.href = '/';
            }
        }
    ];
    const toggleMenuClick: MouseEventHandler = (e) => userMenu.current?.toggle(e);
    const unauthorizedActionLinkClass = 'p-button p-button-text p-button-contrast unauthorized-action-link';
    const [authState,] = useState({
       isLoggedIn: isUserLoggedIn(),
       loggedInUser: getLoggedInUser()
    });

    return (
        <header>
            <div><h1>Photo Manager App</h1></div>
            {authState.isLoggedIn
                ? (<div className={'user-panel'}>
                    <Avatar label={authState.loggedInUser?.name.charAt(0).toUpperCase()} size={'large'} shape={'circle'} />
                    <span className={'user-name'}>{authState.loggedInUser?.name}</span>
                    <Toast ref={userMenuToast} />
                    <Menu model={userMenuItems} popup ref={userMenu} />
                    <Button icon={'pi pi-angle-down'} rounded text onClick={toggleMenuClick} />
                </div>)
                : (<div className={'unauthorized-actions'}>
                    <NavLink className={unauthorizedActionLinkClass} to={'/login'}>Sign in</NavLink>
                    <NavLink className={unauthorizedActionLinkClass} to={'/register'}>Sign up</NavLink>
                </div>)
            }
        </header>
    );
}

export default Header;