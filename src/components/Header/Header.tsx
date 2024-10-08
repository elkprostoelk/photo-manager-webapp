import './Header.css';
import {Avatar} from "primereact/avatar";
import {Button} from "primereact/button";
import {useState} from "react";

const Header = () => {
    const [isLoggedIn,] = useState(false);

    return (
        <header>
            <div><h1>Photo Manager App</h1></div>
            {isLoggedIn
                ? (<div className={'user-panel'}>
                    <Avatar label={'U'} size={'large'} shape={'circle'}/>
                    <span className={'user-name'}>User Name</span>
                </div>)
                : (<div className={'unauthorized-actions'}>
                    <Button text severity={'contrast'} label={'Sign in'}/>
                    <Button text severity={'contrast'} label={'Sign up'}/>
                </div>)
            }
        </header>
    );
}

export default Header;