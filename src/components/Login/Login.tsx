import './Login.css';
import {InputText} from "primereact/inputtext";
import {Password} from "primereact/password";
import {Button} from "primereact/button";
import {AxiosError} from "axios";
import {isUserLoggedIn} from "../../utils/user.ts";
import {Toast} from "primereact/toast";
import {FormEventHandler, useRef} from "react";
import httpClient from "../../utils/httpClient.ts";

const Login = () => {
    if (isUserLoggedIn()) {
        window.location.href = '/';
    }

    const loginToast = useRef<Toast>(null);
    const showError = (message: string | null | undefined) =>
        loginToast.current?.show({
            severity: 'error',
            summary: 'Login failed',
            detail: message ?? 'Failed to sign in!'
        });
    const loginUser: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const loginDto: {[key: string]: string} = {userNameOrEmail: '', password: ''};
        formData.forEach((value, key) => loginDto[key] = value.toString());
        try {
            const responseData = await httpClient.post(
                import.meta.env.VITE_API_URL + 'auth/login',
                loginDto,
                {headers: {'Content-Type': 'application/json'}}
            );
            localStorage.setItem('jwt', responseData.data.container);
            window.location.href = '/';
        } catch (error) {
            const axiosErr = error as AxiosError;
            showError(axiosErr?.message ?? null);
        }
    }

    return (
        <div className={'login-form-container'}>
            <Toast ref={loginToast} />
            <h1>Sign in</h1>
            <form className={'login-form'} onSubmit={loginUser}>
                <div className="form-group">
                    <label htmlFor={'userNameOrEmail'}>User name or email:</label>
                    <InputText
                        id={'userNameOrEmail'}
                        name={'userNameOrEmail'}
                        placeholder={'User name or e-mail'}
                        maxLength={256}/>
                </div>
                <div className={'form-group'}>
                    <label htmlFor={'password'}>Password:</label>
                    <Password
                        id={'password'}
                        name={'password'}
                        placeholder={'Password'}
                        feedback={false}
                        minLength={8}
                        toggleMask/>
                </div>
                <div className={'form-group'}>
                    <Button label={'Sign in'} type={'submit'}/>
                </div>
            </form>
        </div>
    );
}

export default Login;