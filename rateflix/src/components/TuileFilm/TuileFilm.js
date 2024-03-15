import './TuileFilm.css';

function TuileFilm(props) {

  const { data, filtreActif } = props;

  return (

    <main className='tuile-film'> 
      <article>
        <img src={`/img/${data.titreVignette}`} alt={data.titre}></img>
        <h3>{data.titre}</h3>
        {filtreActif === 'realisation' && <h3>Réalisateur: {data.realisation}</h3>}
        {filtreActif === 'annee' && <h3>Année: {data.annee}</h3>}
      </article>
    </main>
    
  );

}

export default TuileFilm;