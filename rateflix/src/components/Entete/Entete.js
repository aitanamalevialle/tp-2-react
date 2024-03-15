import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../App/App';
import './Entete.css';

function Entete(props) {
  
  const context = useContext(AppContext);
  
  return (

    <header className='entete'>
      <nav>
        <NavLink to='/'>Accueil</NavLink>
        <NavLink to='/liste-films'>Liste de films</NavLink>
        {context.estLog ? <NavLink to='/admin'>Admin</NavLink> : ''}
        {!context.estLog ? 
            <form onSubmit={props.handleLogin}>
              <input type='text' name='usager'></input>
              <button className='connexion'>Connexion</button>
            </form> 
        : <button className='deconnexion' onClick={props.handleLogout}>Déconnexion</button>}
      </nav>
      {context.estLog ? <p>Bienvenue {context.usager} !</p> : ''}
    </header>
    
  );

}

export default Entete;