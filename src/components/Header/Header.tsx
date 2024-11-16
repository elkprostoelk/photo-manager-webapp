import './Header.css';
import {Avatar} from "primereact/avatar";
import {MouseEventHandler, useRef} from "react";
import {Link, NavLink} from "react-router-dom";
import {getLoggedInUser, isUserLoggedIn, logoutUser} from "../../utils/user.ts";
import {Button} from "primereact/button";
import {Menu} from "primereact/menu";
import {MenuItem} from "primereact/menuitem";

const Header = () => {
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

    return (
        <header>
            <div><h1><Link to="/" style={{textDecoration: 'none', color: 'black'}}>Photo Manager App</Link></h1></div>
            {isUserLoggedIn()
                ? (<div className="authorized-actions">
                    <Link
                        className="p-button p-button-rounded authorized-action-item"
                        to="/add-picture">Add Picture</Link>
                    <div className="user-panel">
                        <Avatar
                            label={getLoggedInUser()?.name.charAt(0).toUpperCase()}
                            size="large"
                            shape="circle" />
                        <span className="user-name">{getLoggedInUser()?.name}</span>
                        <Menu model={userMenuItems} popup ref={userMenu} />
                        <Button icon="pi pi-angle-down" rounded text onClick={toggleMenuClick} />
                    </div>
                </div>)
                : (<div className="unauthorized-actions">
                    <NavLink className={unauthorizedActionLinkClass} to="/login">Sign in</NavLink>
                    <NavLink className={unauthorizedActionLinkClass} to="/register">Sign up</NavLink>
                </div>)
            }
        </header>
    );
}

export default Header;