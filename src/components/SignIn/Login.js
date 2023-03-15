import { useEffect, useState } from 'react';
import useInput from '../hooks/useInput';
import classes from './Login.module.css';

import { IonIcon } from '@ionic/react';
import { informationCircleOutline } from 'ionicons/icons';

const Login = () => {
    const [formIsValid, setFormIsValid] = useState(false);

    const {
    value: emailInputValue,
    isValid: emailInputIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: emailInputReset
    } = useInput((value) => value.includes('@'));
    const {
    value: passwordInputValue,
    isValid: passwordInputIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: passwordInputReset
    } = useInput((value) => value.length > 5);

    useEffect(()=> {
        if(emailInputIsValid && passwordInputIsValid){
          setFormIsValid(true)
        } else {
          setFormIsValid(false)
        }
      }, [emailInputIsValid, passwordInputIsValid]);

    const emailInputClasses = emailInputHasError ? `${classes.invalid}` : '';
    const passwordInputClasses = passwordInputHasError ? `${classes.invalid}` : '';

    const formSubmitHandler = (oEvent) => {
        oEvent.preventDefault();

        if(!formIsValid) return;
        
        emailInputReset();
        passwordInputReset();
    }

    const emailErrorMessage = <div style={{display:'flex', alignItems:'center'}} className={classes['error-message']}>
                                <IonIcon icon={informationCircleOutline} size='small'/>
                                <p>You must enter an email address.</p>
                              </div>
    const passwordErrorMessage = <div style={{display:'flex', alignItems:'center'}} className={classes['error-message']}>
                                <IonIcon icon={informationCircleOutline} size='small'/>
                                <p>Your password must contain one letter.</p>
                              </div>

    return(
        <div>
            <div className={classes.title}>
                <h2>Sign In</h2>
            </div>
            <div className={classes.card}>
                <form onSubmit={formSubmitHandler}>
                    <p className={classes['card-message']}>Do you have an HBO Max Account?</p>
                    <input
                    type='email'
                    name='email'
                    placeholder='Email Address'
                    className={emailInputClasses}
                    value={emailInputValue}
                    onChange={emailChangeHandler}
                    onBlur={emailBlurHandler}/>
                    {emailInputHasError && emailErrorMessage}
                    <input
                    type='password'
                    name='password'
                    placeholder='Password'
                    className={passwordInputClasses}
                    value={passwordInputValue}
                    onChange={passwordChangeHandler}
                    onBlur={passwordBlurHandler}/>
                    {passwordInputHasError && passwordErrorMessage}
                    <div className={classes['login-action']}>
                        <button type='submit' disabled={!formIsValid}>SIGN IN</button>
                        <p>Forgot password?</p>
                    </div>
                    <div className={classes.separator}>
                        <div className={classes['separator-left-line']}></div>
                        <div className={classes['separator-text']}>OR</div>
                        <div className={classes['separator-right-line']}></div>
                    </div>
                </form>
                <p className={classes['sign-with-provider-message']}>Do you get HBO Max through another company such as a TV, mobile, or internet provider?</p>
                <button className={classes['sign-with-provider-button']}>SIGN IN WITH A PROVIDER</button>
            </div>
            <div className={classes['help-message']}>
                <p>Need help signing in?</p>
            </div>
        </div>
    )
}

export default Login;