import logo from '../assets/logo.png';
import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBell,
  faHouse, 
  faGear, 
  faCaretLeft,
  faCaretRight,
  faCommenting,
  faDisplay
} from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import "./Dashboard.css"
import AnimateHeight from "react-animate-height";
import { ToastContainer, Slide } from 'react-toastify';
import routes from '../common/routes'



export const Dashboard = () => {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate();
  const location = useLocation();
  const [ showProfile, setShowProfile ] = useState(false)
  const [ showSidebar, setShowSidebar ] = useState(true)
  const [ whoami, setWhoami ] = useState({first_name: '', last_name: '', email: '', password: '', retype_password: ''})
  const [ showConfiguration, setShowConfiguration ] = useState(false)
  const [ showOperation, setShowOperation ] = useState(false)
  

  const onChangeLanguage = (e) => {
    i18n.changeLanguage( e.target.value )
    localStorage.setItem('language', e.target.value)
  }


  const onLogout = () => {
    localStorage.removeItem('token_access')
    navigate('/')    
  }

  // useEffect( () => {
  //   ( async() => {
  //     try{
  //       let response = await axios.get(`${window.API_URL}/api/whoami/`,{headers: getHeader()})
  //       setWhoami({...whoami, ...response.data})
  //     }catch(e){
  //       console.log("failed ", e)
  //       // navigate('/')
  //     }

  //   })();
  // }, [navigate])

  const isActive = ( section ) => {
    if( section === 'devices' && location.pathname === '/dashboard') return true
    if( section === 'elements' && location.pathname.includes('elements') ) return true
    return false
  }

  const getTitle = () => {
    if( location.pathname === '/dashboard') return t('devices')
    if( location.pathname.includes('elements') ) return t('elements')
    if( location.pathname.includes('configuration') ) return t('configuration')
    return false
  }

  return <main className="d-flex"  style={{ height: '100vh', overflow: 'hidden', position: 'relative' }} 
          onClick={() => setShowProfile(false)}>

          <div className={showSidebar?"sidebar d-flex flex-column":"sidebar hide"}>
            <div className="sidebar-control" 
              style={{ zIndex: '2999', position: 'absolute'}}
              onClick={() => {
              const status = !showSidebar;
              setShowSidebar(status);
            }}>
              <FontAwesomeIcon icon={showSidebar?faCaretLeft:faCaretRight} />
            </div>
            <div className="logo-img text-center" style={{ background: 'white', padding: '1em 0.5em'}}>
              <img id="logo" src={logo} alt="logo" style={{ height: '80px'}} />
            </div>
            <div className="ms-2 me-2 pt-3 ps-1 pe-1">              
              <div className='menu-option'>
              
                <div onClick={() => setShowOperation(!showOperation)}>
                  <FontAwesomeIcon className="me-2" icon={faHouse} />
                  <span>{t('operation')}</span>
                </div>

                <AnimateHeight
                  duration={500}
                  height={showOperation?'auto':0}>
                  <div style={{ paddingLeft: '1em'}}>
                  
                    <div className={isActive('operation')?`menu-option active d-flex align-items-center`:`menu-option d-flex align-items-center`}>
                      <Link to={routes.operation_overview.url} className="w-100">
                        <div className="d-flex justify-content-between">
                          <span>{t(routes.operation_overview.title)}</span> 
                        </div>
                      </Link>
                    </div>

                    <div className={isActive('operation')?`menu-option active d-flex align-items-center`:`menu-option d-flex align-items-center`}>
                      <Link to={routes.meter_list.url} className="w-100">
                        <div className="d-flex justify-content-between">
                          <span>{t(routes.meter_list.title)}</span> 
                        </div>
                      </Link>
                    </div>

                    <div className={isActive('operation')?`menu-option active d-flex align-items-center`:`menu-option d-flex align-items-center`}>
                      <Link to={routes.topology.url} className="w-100">
                        <div className="d-flex justify-content-between">
                          <span>{t(routes.topology.title)}</span> 
                        </div>
                      </Link>
                    </div>

                    <div className={isActive('operation')?`menu-option active d-flex align-items-center`:`menu-option d-flex align-items-center`}>
                      <Link to={routes.task_status.url} className="w-100">
                        <div className="d-flex justify-content-between">
                          <span>{t(routes.task_status.title)}</span> 
                        </div>
                      </Link>
                    </div>

                    <div className={isActive('operation')?`menu-option active d-flex align-items-center`:`menu-option d-flex align-items-center`}>
                      <Link to={routes.reports.url} className="w-100">
                        <div className="d-flex justify-content-between">
                          <span>{t(routes.reports.title)}</span> 
                        </div>
                      </Link>
                    </div>

                  </div>
                </AnimateHeight>

              </div>
              <div className={isActive('configuration')?`menu-option active`:`menu-option`} 
                onClick={() => setShowConfiguration(!showConfiguration)}>
                <FontAwesomeIcon className="me-2" icon={faGear} />
                <Link to='/dashboard/configuration' >{t('configuration')}</Link> 
              </div>
              <div className={isActive('tools_monitoring')?`menu-option active`:`menu-option`} 
                onClick={() => setShowConfiguration(!showConfiguration)}>
                <FontAwesomeIcon className="me-2" icon={faDisplay} />
                <Link to='/dashboard/configuration' >{t('tools_monitoring')}</Link> 
              </div>


              {/* <div className={isActive('device_models')?`menu-option active d-flex align-items-center`:`menu-option d-flex align-items-center`} >
                <FontAwesomeIcon className="me-2" icon={faHouse} />
                <Link to='/dashboard/devicemodels' className="w-100">
                  <div className="d-flex justify-content-between">
                    <span>{t('device_models')}</span> 
                  </div>
                </Link>
              </div>
              <div className={isActive('devices')?`menu-option active d-flex align-items-center`:`menu-option d-flex align-items-center`}>
                <FontAwesomeIcon className="me-2" icon={faHouse} />
                <Link to='/dashboard' className="w-100">
                  <div className="d-flex justify-content-between">
                    <span>{t('devices')}</span> 
                  </div>
                </Link>
              </div>
              <div className={isActive('services')?`menu-option active d-flex align-items-center`:`menu-option d-flex align-items-center`}>
                <FontAwesomeIcon className="me-2" icon={faHouse} />
                <Link to='/dashboard/services' className="w-100">
                  <div className="d-flex justify-content-between">
                    <span>{t('services')}</span> 
                  </div>
                </Link>
              </div> */}
              

 


            </div>
          </div>
          
          <div className={showSidebar?"content d-flex flex-column":"content full"}>
            
            <nav className="w-100 d-flex justify-content-between" style={{ background: '#606060', height: '50px'}}>
              <div className='d-flex justity-content-center align-items-center ms-3 fw-bold'>
                <h5 style={{ margin: 0, color: '#AAA'}}>{getTitle()}</h5>
              </div>
              <div className='d-flex align-items-center justify-content-end'>
                <div className='ps-3'>
                  <FontAwesomeIcon className="me-3 cursor-pointer" icon={faCommenting} />
                  <FontAwesomeIcon className="me-3 cursor-pointer" icon={faBell} />
                </div>
                <div className="h-100 pt-2 pb-2 me-3 cursor-pointer d-flex align-items-center" onClick={(e) => {e.stopPropagation(); setShowProfile(true)}}>
                  <div style={{ color: '#DDD'}}>{whoami.first_name} {whoami.last_name}Manu Sharma</div> 
                </div>
              </div>
            </nav>
            <div className="main-content flex-grow-1" style={{ height: '0px', overflow: 'auto', minHeight: 'calc(100% - 50px)', padding: '2em'}}>
              <Outlet />
            </div>
          </div>


          <div className={`${showProfile?"user-profile":"user-profile show"}`} onClick={(e) => e.stopPropagation()}>
            <h2>{t('user_profile_title')}</h2>
            <div className="mb-3">
              <label className="form-label">{t('first_name')}</label>
              <input type="text" className="form-control" 
                value={whoami.first_name} onChange={(e) => setWhoami({...whoami, first_name: e.target.value}) } />
            </div>
            <div className="mb-3">
              <label className="form-label">{t('last_name')}</label>
              <input type="text" className="form-control" 
                value={whoami.last_name} onChange={(e) => setWhoami({...whoami, last_name: e.target.value}) } />
            </div>
            <div className="mb-3">
              <label className="form-label">{t('email_address')}</label>
              <input type="email" className="form-control" aria-describedby="emailHelp" 
                value={whoami.email}  onChange={(e) => setWhoami({...whoami, email: e.target.value}) }/>
            </div>
            <div className="mb-3">
              <label className="form-label">{t('password')}</label>
              <input type="password" className="form-control" aria-describedby="passwordHelp" 
                value={whoami.password}  onChange={(e) => setWhoami({...whoami, password: e.target.value}) }/>
            </div>
            <div className="mb-3">
              <label className="form-label">{t('retype_password')}</label>
              <input type="password" className="form-control" aria-describedby="emailHelp" 
                value={whoami.retype_password}  onChange={(e) => setWhoami({...whoami, retype_password: e.target.value}) }/>
            </div>
            <div className="d-flex justify-content-end mt-3">
              <button className="btn btn-primary" onClick={(e) => console.log("saving user")}>{t('save')}</button>
            </div>

            <div className="mb-3 mt-3 pt-3" style={{ borderTop: '1px solid darkgrey'}}>
              <label className="form-label">Language</label>
              <select className="form-select" onChange={(e) => onChangeLanguage(e)}>
                <option value="en">English</option>
              </select>
            </div>
            <div className="d-flex justify-content-end mt-3">
              <button className="btn btn-secondary" onClick={(e) => onLogout()}>{t('logout')}</button>
            </div>
          </div>
          <ToastContainer 
                position="bottom-right"
                transition={Slide} 
                autoClose={1000}
                closeButton={false}
                theme="colored"
                rtl 
                className={'continuity-toast-message'}/>
        </main>
}