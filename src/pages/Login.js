import logo from '../assets/logo.png';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Outlet } from "react-router-dom";
import "./Login.css"
import { useTranslation } from "react-i18next";
import axios from 'axios';
import { Link } from "react-router-dom";

export const ForgotRegeneratePassword = () => {
  const { t } = useTranslation();
  const [ password, setPassword ] = useState('')
  const [ rePassword, setRePassword ] = useState('');
  const [ sucessMsg, setSucessMsg ] = useState(null);
  const [ errorMsg, setErrorMsg ] = useState(null);
  const [ token, setToken ] = useState(null);

  const onRegeneratePassword = async () => {
    try{
      // Clean Msg's
      setSucessMsg( null )
      setErrorMsg( null )

      // Check if passwords are the same
      if( password !== rePassword && password.length > 0 ){
        setErrorMsg( t('regenerate_do_not_match') )
        return  
      }
      const body = {
        password, forgot_token: token
      }
      await axios.post(`${window.API_URL}/api/forgot/regenerate/`, body)

      // Show msg
      setSucessMsg( t('regenerate_success') )
    }catch(e){
      console.log("failed ", e)
      if( e.response.data.reason !== null &&  e.response.data.reason === 'password_constraints'){
        setErrorMsg( t('regenerate_password_constraints') )
        return
      }      
      setErrorMsg( t('regenerate_token_invalid') )
    }
  }

  useEffect( () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    setToken( urlParams.get('token') )
  }, [])


  return (<>
          <div className="mt-3 text-center">
            <input type="password" className="neuron-input-top input-username w-75" 
              placeholder={t('password')} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="text-center mt-3">
            <input type="password" className="neuron-input-top input-username w-75" 
              placeholder={t('retype_password')} onChange={(e) => setRePassword(e.target.value)}/>
          </div>
          <div className="text-center cursor-pointer  btn-forgot-toggle">
            <Link className='ms-2' to='/'  style={{ color: 'black'}}>{t('back')}</Link>
          </div>
          {sucessMsg?
          <div className="mt-3 text-center">
            <div className="alert alert-success w-75" role="alert" style={{ margin: "0 auto" }}>
              {sucessMsg}
            </div>
          </div>
          :null}
          {errorMsg?
          <div className="mt-3 text-center">
            <div className="alert alert-danger  w-75" role="alert" style={{ margin: "0 auto" }}>
              {errorMsg}
            </div>
          </div>
          :null}
          <div className="mt-3 text-justify">
            <div className="w-75" style={{ margin: "0 auto" }}>
              <div><span className="tr_forgot_password_constraints"></span></div>
              <ul style={{ paddingLeft: "1em"}}>
                <li><span>{t('regenerate_password_upper_lower')}</span></li>
                <li><span>{t('regenerate_password_special_characters')}</span></li>
                <li><span>{t('regenerate_password_number')}</span></li>
                <li><span>{t('regenerate_password_length')}</span></li>                
              </ul>
            </div>
          </div>
          <div className="mt-3 text-center">
            <button className="neuron-btn w-75" onClick={() => onRegeneratePassword()}>OK</button>
          </div>
          </>)
}

export const ForgotPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [ email, setEmail ] = useState('')
  const [ showSuccess, setShowSuccess ] = useState(false);

  const onClick = async () => {
    if( showSuccess ){
      navigate('/')
      return
    } 
    try{
      const body = { email }
      await axios.post(`${window.API_URL}/api/forgot/`, body)
      setShowSuccess(true)
    }catch(e){
      console.log("failed", e)
    }
  }

  return (<div className="dialog-forgot">
    <div className="mt-3 text-center">
      <input className="neuron-input input-forgot w-75" placeholder="Email" 
        onChange={(e) => setEmail(e.target.value)}/>
    </div>
    {showSuccess?
    <div className="mt-3 text-center">
      <div className="alert alert-success alert-success-forgot w-75" 
        role="alert" style={{ margin: '0 auto'}}>
          {t('forgot_success')}
      </div>
    </div>
    :null}
    <div className="mt-3 text-center">
      <button className="neuron-btn btn-forgot w-75" onClick={() => onClick()}>
        {showSuccess?t('back'):'OK'}
      </button>
    </div>
  </div>)
}

export const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({email: '', password: ''});
  const [showError, setShowError] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false)
  const onLogin = async() => {
    try{
      setShowSpinner(true)
      setShowError(false)
      const body = { ...credentials}
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/token/`, body)

      // Store in local storage
      localStorage.setItem('token_access', response.data.access)

      // Move to dashboard
      setShowSpinner(false)
      navigate('/dashboard/')
    }catch(e){
      console.log("failed", e)
      setShowError(true)
    }
  }

  const isSubmit = (e) => {
    if( e.keyCode === 13 ) return onLogin()    
  }

  return(
    <div className="dialog-login mt-3">
    <div className="text-center">
      <input className="neuron-input-top input-username w-75" placeholder={t('username')} 
        onKeyDown={(e) => isSubmit(e)} onChange={e => setCredentials({...credentials, email: e.target.value})} />
    </div>
    <div className="text-center">
      <input type="password" 
        className="neuron-input-bottom input-password w-75" placeholder={t('password')} 
        onKeyDown={(e) => isSubmit(e)} onChange={e => setCredentials({...credentials, password: e.target.value})} />
    </div>
    {/* <div className="text-center mt-3">
      <Link className='ms-2' to='/forgot'  style={{ color: 'black'}}>{t('forgot_password')}</Link>
    </div> */}
    {showError?
    <div className="mt-3 text-center">
      <div className="alert alert-danger alert-danger-credentials w-75" 
        role="alert" style={{ margin: '0 auto'}}>
          {t('wrong_credentials')}
      </div>
    </div>
    :null}

    <div className="mt-3 text-center">
      <button className="neuron-btn btn-login w-75" 
        onClick={() => onLogin()}>
        {t('login')} 
        {showSpinner?<i className="fa-solid fa-spinner fa-spin ms-3"></i>:null}
      </button>
    </div>
    <div className="mt-3 text-center">
      <input className="btn-remember-me" type="checkbox"></input>
      <span className="ms-2">{t('remember_me')}</span>
    </div>
  </div>)

}

export const Welcome = () => {
  return  ( <div style={{height: '100vh', background: '#FFFFFF'}}>    
              <div className="h-100 d-flex justify-content-center align-items-center flex-column">
                <div className="col-md-4" style={{ maxWidth: '400px'}}>
                    <div className="d-flex justify-content-center">
                      <div className='w-75 d-flex justify-content-center'>
                        <img src={logo} alt="logo" style={{ maxWidth: "100%"}} />
                      </div>
                    </div>
                    <Outlet />
                    <div className="mt-3 text-center">
                      Neuron GmbH &copy;	2023
                    </div>                  
                </div>
              </div>
            </div>)
}

