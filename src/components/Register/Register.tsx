import {isUserLoggedIn} from "../../utils/user.ts";
import {FormEventHandler} from "react";
import {InputText} from "primereact/inputtext";
import {Password} from "primereact/password";
import {Button} from "primereact/button";
import './Register.css';
import {RegisterDto} from "../../utils/dto/registerDto.ts";
import httpClient from "../../utils/httpClient.ts";
import {AxiosError} from "axios";
import {ServiceResultDto} from "../../utils/dto/serviceResultDto.ts";

import {useToast} from "../../utils/contexts/UseToast.tsx";

const Register = () => {
    if (isUserLoggedIn()) {
        window.location.href = '/';
    }

    const [,showError,showSuccess] = useToast();

    const registerUser: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const registerDto: RegisterDto = {
            userName: formData.get('userName')?.toString() ?? '',
            password: formData.get('password')?.toString() ?? '',
            confirmPassword: formData.get('confirmPassword')?.toString() ?? '',
            email: formData.get('email')?.toString() ?? '',
            fullName: formData.get('fullName')?.toString() ?? null,
            role: 'User'
        };

        try {
            const response = await httpClient.post<ServiceResultDto>(
                'users',
                registerDto,
                {headers: {'Content-Type': 'application/json'}}
            );

            if (response.data.isSuccess) {
                showSuccess('A new user has been created!', null);
                window.location.href = '/';
            }
            else {
                showError('Registration failed', 'Failed to sign up!');
            }
        } catch (error) {
            const axiosErr = error as AxiosError;
            showError(null, axiosErr?.message ?? null);
        }
    }

    return (
        <div className={'register-form-container'}>
            <h1>Sign up</h1>
            <form className={'register-form'} onSubmit={registerUser}>
                <div className="form-group">
                    <label htmlFor={'userName'}>User name:</label>
                    <InputText
                        id={'userName'}
                        name={'userName'}
                        required
                        placeholder={'User name'}
                        maxLength={20}/>
                </div>
                <div className="form-group">
                    <label htmlFor={'email'}>E-mail:</label>
                    <InputText
                        id={'email'}
                        name={'email'}
                        required
                        placeholder={'Email'}
                        maxLength={256}/>
                </div>
                <div className="form-group">
                    <label htmlFor={'fullName'}>Full name (optionally):</label>
                    <InputText
                        id={'fullName'}
                        name={'fullName'}
                        placeholder={'Full name'}
                        maxLength={100}/>
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
                    <label htmlFor={'confirmPassword'}>Confirm password:</label>
                    <Password
                        id={'confirmPassword'}
                        name={'confirmPassword'}
                        placeholder={'Confirm password'}
                        feedback={false}
                        minLength={8}
                        toggleMask
                        required/>
                </div>
                <div className={'form-group'}>
                    <Button label={'Sign up'} type={'submit'}/>
                </div>
            </form>
        </div>
    );
};

export default Register;