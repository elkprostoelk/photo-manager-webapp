import './Login.css';
import {InputText} from "primereact/inputtext";
import {Password} from "primereact/password";
import {Button} from "primereact/button";
import {AxiosError} from "axios";
import {isUserLoggedIn} from "../../utils/user.ts";
import {FormEventHandler} from "react";
import httpClient from "../../utils/httpClient.ts";
import {useToast} from "../../utils/contexts/UseToast.tsx";
import {ServiceTypedResultDto} from "../../utils/dto/serviceResultDto.ts";

const Login = () => {
    if (isUserLoggedIn()) {
        window.location.href = '/';
    }

    const [,showError,] = useToast();
    const loginUser: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const loginDto: {[key: string]: string} = {userNameOrEmail: '', password: ''};
        formData.forEach((value, key) => loginDto[key] = value.toString());
        try {
            const response = await httpClient.post<ServiceTypedResultDto<string>>(
                'auth/login',
                loginDto,
                {headers: {'Content-Type': 'application/json'}}
            );
            if (response.data.isSuccess) {
                localStorage.setItem('jwt', response.data.container);
                window.location.href = '/';
            }
            else {
                showError('Login failed', 'Failed to sign in!');
            }

        } catch (error) {
            const axiosErr = error as AxiosError;
            showError(null, axiosErr?.message ?? null);
        }
    }

    return (
        <div className={'login-form-container'}>
            <h1>Sign in</h1>
            <form className={'login-form'} onSubmit={loginUser}>
                <div className="form-group">
                    <label htmlFor={'userNameOrEmail'}>User name or email:</label>
                    <InputText
                        id={'userNameOrEmail'}
                        name={'userNameOrEmail'}
                        placeholder={'User name or e-mail'}
                        maxLength={256}
                        required/>
                </div>
                <div className={'form-group'}>
                    <label htmlFor={'password'}>Password:</label>
                    <Password
                        id={'password'}
                        name={'password'}
                        placeholder={'Password'}
                        feedback={false}
                        minLength={8}
                        toggleMask
                        required/>
                </div>
                <div className={'form-group'}>
                    <Button label={'Sign in'} type={'submit'}/>
                </div>
            </form>
        </div>
    );
}

export default Login;