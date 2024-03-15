import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Accueil from './Accueil';
import introduction from './Accueil.json';

describe('Composant Accueil', () => {

    test('Vérifie si chaque paragraphe du contenu de l’accueil est présent dans le document', () => {
        
        render(<Accueil />);

        introduction.map((texte) => {
            expect(screen.getByText(texte)).toBeInTheDocument();
        });

    });

});