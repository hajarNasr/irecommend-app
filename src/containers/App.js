import React from 'react';
import Home from './Home';
import ResetPassword from '../components/ResetPassword';
import ReasetPasswordConfirm from '../components/ReasetPasswordConfirm';
import PasswordResetEmailSent from '../components/PasswordResetEmailSent';
import UnauthorizedAccess from '../components/UnauthorizedAccess';
import LoggedinRoutes from './LoggedinRoutes';
import { Switch, Route } from 'react-router-dom';
import '../css/index.css';

const App = ()=>(
    <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/reset/user/password/" component={ResetPassword}/>
        <Route exact path="/password-reset-email-sent/" component={PasswordResetEmailSent}/>
        <Route exact path="/reset/:uid/:token/" component={ReasetPasswordConfirm}/>
        <LoggedinRoutes/>
        <Route exact path="/unauthorized-access/" component={UnauthorizedAccess}/> 
    </Switch>
);

export default App;