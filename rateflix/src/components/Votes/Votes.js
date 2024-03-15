import './Votes.css';

function Votes({ handleVotes }) {

    return (

        <main className='votes'>
            <button className='star' onClick={() => handleVotes('1')}></button>
            <button className='star' onClick={() => handleVotes('2')}></button>
            <button className='star' onClick={() => handleVotes('3')}></button>
            <button className='star' onClick={() => handleVotes('4')}></button>
            <button className='star' onClick={() => handleVotes('5')}></button>
        </main>
        
    );

}

export default Votes;