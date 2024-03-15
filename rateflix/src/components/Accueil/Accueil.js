import { motion } from 'framer-motion';
import introduction from './Accueil.json';
import './Accueil.css';

function Accueil() {

  const transition = { duration: 0.5, ease: 'easeInOut' },
        variant = {
          hidden: { opacity: 0, y: 25 },
          visible: { opacity: 1, y: 0, transition },
          exit: { opacity: 0, y: 25, transition }
        };

  return (

    <motion.main key='accueil' initial='hidden' animate='visible' exit='exit' variants={variant} className='accueil'>
      <div className='accueil'> 
        <div className='container'>
          <img src='/img/banniere.jpg' alt='banniere dvd films' />
        </div>
        {introduction.map((texte, index) => (
          <p key={index}>{texte}</p>
        ))}
      </div>
    </motion.main>
    
  );

}

export default Accueil;