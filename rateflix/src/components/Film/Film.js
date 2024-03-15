import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../App/App';
import Votes from '../Votes/Votes';
import Commentaires from '../Commentaires/Commentaires';
import './Film.css';

function Film() {
  // Obtention du contexte de l'application et des paramètres de l'URL
  const context = useContext(AppContext),
        { id } = useParams(),
        // Construction de l'URL de l'API pour obtenir les détails du film
        urlFilm = `https://api-films-di6p.onrender.com/films/${id}`,
        // État pour stocker les détails du film récupérés de l'API
        [film, setFilm] = useState({}),
        // Options pour la requête PUT utilisée pour soumettre les votes et les commentaires
        oOptions = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          }
        };

  // Effet pour charger les détails du film lors du chargement du composant ou lorsqu'un nouveau ID est passé
  useEffect(() => {
    fetch(urlFilm)
      .then((reponse) => reponse.json())
      .then((data) => {
        setFilm(data);
      });
  }, [id, urlFilm]);

  // Fonction asynchrone pour soumettre un vote
  async function soumettreVote(vote) {
    let aVotes;
    if (!film.votes) {
      aVotes = [vote];
    } else {
      aVotes = [...film.votes, vote]
    }
    oOptions.body = JSON.stringify({ votes: aVotes })
    let putVote = await fetch(urlFilm, oOptions),
        getFilm = await fetch(urlFilm);
    Promise.all([putVote, getFilm])
      .then((reponse) => reponse[1].json())
      .then((data) => {
        setFilm(data);
      });
  }

  // Fonction asynchrone pour soumettre un commentaire
  async function soumettreCommentaire(e) {
    e.preventDefault();
    const commentaire = e.target.commentaire.value,
          aCommentaires = [...(film.commentaires || []), { commentaire: commentaire, usager: context.usager }];
    oOptions.body = JSON.stringify({ commentaires: aCommentaires })
    let putCommentaire = await fetch(urlFilm, oOptions),
        getFilm = await fetch(urlFilm);
    Promise.all([putCommentaire, getFilm])
      .then((reponse) => reponse[1].json())
      .then((data) => {
        setFilm(data);
      });
  }

  // Fonction pour calculer la moyenne et le nombre de votes
  function setVotes() {
    if (!film.votes || film.votes.length === 0) {
      return { moyenne: 'N/A', nombre: 'Aucun vote enregistré' };
    }
    const totalVotes = film.votes.reduce((acc, cur) => acc + parseInt(cur), 0),
          moyenne = (totalVotes / film.votes.length).toFixed(2),
          nombre = film.votes.length;
    return { moyenne, nombre };
  }  

  // Appel de la fonction pour obtenir la moyenne et le nombre de votes
  const { moyenne, nombre } = setVotes();

  // Rendu du composant Film avec les détails du film et les composants Votes et Commentaires
  return (
    <main className='film'>
        <div>
          <img src={`/img/${film.titreVignette}`} alt={film.titre} />
          <h2>{film.titre}</h2>
        </div>
        <div>
          <p>Année : {film.annee}</p>
          <p>Réalisation : {film.realisation}</p>
          <p>Description : {film.description}</p>
          <p>Genres : {film.genres && film.genres.join(', ')}</p>
          <Votes handleVotes={soumettreVote} />
          <p>Moyenne des votes : {moyenne}</p>
          <p>Nombre de {nombre === 1 ? 'vote' : 'votes'} : {nombre}</p>
          <Commentaires handleCommentaires={soumettreCommentaire} commentaires={film.commentaires || []} />
        </div>
    </main>
  );
}

export default Film;