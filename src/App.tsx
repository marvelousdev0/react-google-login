import {googleLogout, TokenResponse, useGoogleLogin,} from '@react-oauth/google';
import './App.css';
import axios from 'axios';
import {useEffect, useState} from 'react';

type Profile = {
  email: string;
  family_name: string;
  given_name: string;
  id: string;
  name: string;
  picture: string;
  verified_email: boolean;
};

function App() {
  const [user, setUser] = useState<TokenResponse | undefined>(undefined);
  const [profile, setProfile] = useState<Profile | undefined>(undefined);
  
  useEffect(() => {
    if (user && user.access_token) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: 'application/json',
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);
  
  // function onSuccess(response: CredentialResponse) {
  //   console.log(response)
  // }
  //
  // function onError() {
  //   console.error("Login failed")
  // }
  
  const login = useGoogleLogin({
    onSuccess: (response: TokenResponse) => {
      setUser(response);
    },
    onError: (error) => {
      console.error('Login failed', error);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }) as any;
  
  function logOut() {
    googleLogout();
    setProfile(undefined);
  }
  
  return (
    <div>
      <h2>React Google Login</h2>
      {/*<GoogleLogin onSuccess={onSuccess} onError={onError}/>*/}
      {profile ? (
        <div>
          <img src={profile.picture} alt='user image'/>
          <h3>User Logged in</h3>
          <p>Name: {profile.name}</p>
          <p>Email Address: {profile.email}</p>
          <br/>
          <br/>
          <button onClick={logOut}>Log out</button>
        </div>
      ) : (
        <button onClick={login}>Sign in with Google 🚀 </button>
      )}
    </div>
  );
}

export default App;
