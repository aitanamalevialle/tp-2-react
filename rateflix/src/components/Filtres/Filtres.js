import './Filtres.css';

function Filtres({ handleFiltres, filtreActif }) {

    const urlListeFilms = 'https://api-films-di6p.onrender.com/films';

    return (
        
        <div className='filtres'>
                <button className={filtreActif === 'titre-asc' ? 'active' : ''} onClick={() => handleFiltres(`${urlListeFilms}?orderBy=titre&orderDirection=asc`)}>Titre alphabétique (A-Z)</button>
                <button className={filtreActif === 'titre-desc' ? 'active' : ''} onClick={() => handleFiltres(`${urlListeFilms}?orderBy=titre&orderDirection=desc`)}>Titre alphabétique (Z-A)</button>
                <button className={filtreActif === 'realisation-asc' ? 'active' : ''} onClick={() => handleFiltres(`${urlListeFilms}?orderBy=realisation&orderDirection=asc`)}>Réalisateur alphabétique (A-Z)</button>
                <button className={filtreActif === 'realisation-desc' ? 'active' : ''} onClick={() => handleFiltres(`${urlListeFilms}?orderBy=realisation&orderDirection=desc`)}>Réalisateur alphabétique (Z-A)</button>
                <button className={filtreActif === 'annee-asc' ? 'active' : ''} onClick={() => handleFiltres(`${urlListeFilms}?orderBy=annee&orderDirection=asc`)}>Par année (du plus ancien)</button>
                <button className={filtreActif === 'annee-desc' ? 'active' : ''} onClick={() => handleFiltres(`${urlListeFilms}?orderBy=annee&orderDirection=desc`)}>Par année (du plus récent)</button>
        </div>

    );
}

export default Filtres;