import { useEffect, useState } from "react";

//styles
import styles from "./App.module.css";
import "./Global.css";

// img
import logo from "./assets/Logo.png";
import { Card } from "./components/Card";

export function App() {
  const [name, setName] = useState(''); // guarda memoria
  const [role, setRole]= useState(['Professora de React']); 
  const [list, setList] = useState([]); // Função que atualiza //percorrer cada item na lista
  const [user, setUser]= useState({ name: '', avatar: ''})

  function handleAddList(){
    const newList = { // objeto
      role : role,
      name: name,
      time: new Date().toLocaleTimeString("pt-br",{
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    };
    
    setList(prevState => [...prevState, newList]); // adicionar novo item na lista
  }

  useEffect(() => {
    async  function fetchData(){
      const response = await fetch('https://api.github.com/users/lyrisnunes')
      const data = await response.json();

      setUser({
        name:data.name,
        avatar: data.avatar_url,
      });
  }
   fetchData();
}, []);
  


  return (
    <div className={styles.container}>
      <header>
        <img src={logo} alt="foto" />
        <div className={styles.profile}>
        <img className={styles.avatarr} src={user.avatar} alt="logo"/>
        <p>{user.name}</p>
        </div>
      </header>
      <div className={styles.input}>
        <input type="text" placeholder="Digite aqui..." onChange={e => setName(e.target.value)} />

        <button type="button" onClick={handleAddList}>Adicionar</button>
      </div>

      {
        //percorrer cada item da lista
        list.map(lists => <Card key={lists.time} role={lists.role} name={lists.name} time={lists.time} />)
        }
    </div>
  );
}
