import React, { useContext } from 'react';
import { AppContext } from '../App/App';
import './Commentaires.css';


function Commentaires({ handleCommentaires, commentaires }) {

    const context = useContext(AppContext);
    let blocAjoutCommentaire;

    if (context.estLog) {
        blocAjoutCommentaire = 
            <form onSubmit={handleCommentaires}>
                <textarea name='commentaire' placeholder='Ajouter votre commentaire'></textarea>
                <button>Soumettre</button>
            </form>;
    }

    return (

        <div className='commentaires'>
            {blocAjoutCommentaire}
            {commentaires.length === 0 ? <p>Il n'y a pas de commentaires.</p> : 
                commentaires.map((commentaire, index) => (
                    <div key={index}>
                        <p>{commentaire.usager} : {commentaire.commentaire}</p>
                    </div>
                ))
            }
        </div>
        
    );

}

export default Commentaires;