import { useEffect, useState } from "react";
import api from "./services/api";

interface Repo{
  name:string;
  description:string;
}

function App() {
  const [repos, setrepos] = useState<Repo[]>([]);
  const [search, setSearch] = useState('');
  const [filteredRepos, setFilteredRepos] = useState<Repo[]>([]);

  async function listReposGit(){
    const resp = await api.get('repos');
    setrepos(resp.data)
    
  };

  useEffect(()=>{
    listReposGit();
  },[]);


  useEffect(()=>{
      setFilteredRepos(repos.filter(repo => repo.name.includes(search)))
  },[search]);

  return (
    <div className="App">
      <input 
        type="text" 
        name='search' 
        placeholder="Buscar...."
        onChange={e=> setSearch(e.target.value)}
        value={search}  
      />
    
     { search.length > 0 ? (
          <ul>
          {filteredRepos.map(repo => {
            return(
              <li key={repo.name}>
                {repo.name}
              </li>
            );
          })}
        </ul>

     ) :(
      <ul>
          {repos.map(repo => {
            return(
              <li key={repo.name}>
                {repo.name}
              </li>
            );
          })}
        </ul>
     ) }

    </div>
  )
}

export default App
