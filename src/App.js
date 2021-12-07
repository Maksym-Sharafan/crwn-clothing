import {Component} from 'react';
import { Route, Switch } from 'react-router';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/hearer/header.component';
import SignInAndSignUpPage from './components/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth } from './firebase/firebase.utils';


class App extends Component {

  state={
    currentUser:null
  }

  unSubscribeFromAuth = null;

  componentDidMount(){
    this.unSubscribeFromAuth = auth.onAuthStateChanged(user=>{
      this.setState({currentUser:user});

      console.log(user);
    })
  }

  componentWillUnmount(){
    this.unSubscribeFromAuth();
  }

  render(){
  return (
    <div>
      <Header currentUser={this.state.currentUser} />
      <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route path='/shop' component={ShopPage}/>
        <Route path='/signin' component={SignInAndSignUpPage} />
      </Switch>
    </div>
  )
  }
}

export default App;
