import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { Welcome, Login } from './pages/Login'
import { Dashboard } from './pages/Dashboard'

import { Devices } from './components/Devices'
import { Services } from './components/Services'
import { Configuration } from './components/Configuration'
import routes from './common/routes'

window.matchMedia = false  // Removes read for 'prefers-reduced-motion'

let lng = localStorage.getItem('language')
if( lng == null )
  lng = navigator.language || navigator.userLanguage
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        translation: {
          user: 'User',
          services: 'Services',
          configuration: 'Configuration',

          user_profile_title: 'User Profile',
          first_name: 'First Name',
          last_name: 'Last Name',
          email_address: 'Email',
          username: 'Username',
          password: 'Password',
          retype_password: 'Retype password',
          forgot_password: 'Forgot password',
          remember_me: 'Remember me',
          wrong_credentials: 'Wrong Credentials',
          login: 'Login',

          operation: 'Operation',
          operation_overview: 'Operation Overview',
          meter_list: 'Meter List',
          topology: 'Topology',
          task_status: 'Task Status',
          reports: 'Reports',
          tools_monitoring: 'Tools Monitoring'
        }
      },
    },
    lng: lng, // if you're using a language detector, do not define the lng option
    fallbackLng: "en",

    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  });

const App = () => {

  
  return (<Router>
            <Routes>
              <Route path={routes.welcome.url} element={<Welcome />}>
                <Route index element={<Login />} />
              </Route>
              <Route path={routes.dashboard.url} element={<Dashboard/>} >
                <Route path={routes.operation_overview.url} element={<Devices />} /> 
                <Route path={routes.meter_list.url}  element={<Devices />} /> 
                <Route path={routes.task_status.url}  element={<Devices />} /> 
                <Route path={routes.reports.url}  element={<Devices />} /> 

                <Route path="/dashboard/services" element={<Services />} /> 
                <Route path="/dashboard/configuration" element={<Configuration />} /> 
              </Route>
            </Routes>
          </Router>)
}


export default App;
