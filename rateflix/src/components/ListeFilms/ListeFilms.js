import React, { useEffect, useState } from 'react'; 
import { motion } from 'framer-motion'; 
import { Link } from 'react-router-dom';
import TuileFilm from '../TuileFilm/TuileFilm';
import Filtres from '../Filtres/Filtres';
import './ListeFilms.css';

function ListeFilms() {

  // Déclaration des états et de l'effet de chargement initial
  const urlListeFilms = 'https://api-films-di6p.onrender.com/films',
        [urlFiltres, setUrlFiltres] = useState(urlListeFilms),
        [listeFilms, setListeFilms] = useState([]),
        [estCharge, setEstCharge] = useState(false),
        [filtreActif, setFiltreActif] = useState();

  // Effet pour charger les données initiales
  useEffect(() => {

    fetch(urlFiltres)
      .then((reponse) => reponse.json())
      .then((data) => { 
        setListeFilms(data); 
        setEstCharge(true); 
      });

  }, [urlFiltres]);
  
  // Création des tuiles de films à partir des données chargées
  const tuilesFilm = listeFilms.map((film)=> {
    return <Link key={film.id} to={`/film/${film.id}`}><TuileFilm data={film} filtreActif={filtreActif} /></Link>
  });
  
  // Fonction pour appliquer les filtres aux données
  function filtres(url){

    const orderBy = new URL(url).searchParams.get('orderBy'),
          orderDirection = new URL(url).searchParams.get('orderDirection'),
          filtreActif = `${orderBy}-${orderDirection}`;

    setUrlFiltres(url); // Met à jour l'URL des filtres
    setFiltreActif(filtreActif); // Met à jour le filtre actif
  
  }

  // Configuration des transitions animées
  const transition = { duration: 0.5, ease: 'easeInOut' },
        variant = {
          hidden: { opacity: 0, y: 25 },
          visible: { opacity: 1, y: 0, transition },
          exit: { opacity: 0, y: 25, transition }
        }

  // Rendu de la liste de films avec des animations
  return (

    <main>
      <motion.div key='filtres' initial={{ opacity: 0, x: -25 }} animate={{ opacity: 1, x: 0, transition }} exit={{ opacity: 0, x: -25, transition }} variants={variant} className='filtres'>
        <Filtres handleFiltres={filtres} filtreActif={filtreActif} />
      </motion.div>
      {estCharge ? (
        <motion.div key='liste-film' initial='hidden' animate='visible' exit='exit' variants={variant} className='liste-films'>
          { tuilesFilm }
        </motion.div>
      ) : ( '' )}
    </main>

  );

}

export default ListeFilms;