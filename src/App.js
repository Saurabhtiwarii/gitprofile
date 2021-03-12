import './App.css';
import React , {useState, useEffect} from 'react';

const url = 'https://api.github.com/users/Saurabhtiwarii';
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [user,setUser] = useState({});
  const [repository, setRepository] = useState({});

  useEffect(() => {
      fetchUser();

  }, []);

  async function fetchUser(){
    const response = await fetch(url);
    if( response.status >=200 && response.status <=299){
      const getUser = await response.json();
      setUser(getUser);
      const repo = await fetch(getUser.repos_url);
      const repoJson = await repo.json();
      setRepository(repoJson);
      setIsLoading(false);
    }
    else{
      setIsLoading(false);
      setIsError(true);
    }
  }


  if (isLoading){
    return(
    <h1>Loading...</h1>
    ) 
  }

  if (isError){
    return(
    <h1>Ooops Getting some error...</h1>
    ) 
  }

  return (
    <div className="App">
      <h1>Git Profile</h1>
      <div className="user">

        <div className="user__profile">
          <div className="user__img">
             <img src={user.avatar_url} alt="user profile"/>
          </div>
          <h2 className="username"> <span>Username</span><br/>{user.name}</h2>
        </div>

        <div className="user__bio"> <span>Github Bio :</span><br/>{user.bio}</div>
        <div className="user__repo_container">
          <h2>Git Repositories</h2>
        <ul className="user__repositories">
              {
              repository.map((repo, index) => {
                return(
                   <li className="repo" key={index}>
                  <div className="repo__name">{repo.name}</div>
                  <a href={repo.html_url}>Check</a>
                </li>
                )  
              }) 
              }
        </ul>
        </div>
         
      </div>
    </div>
  );
}

export default App;
