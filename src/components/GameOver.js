import './GameOver.css'

const GameOver = ({retry, score}) => {
  return (
    <div className='gameOver'>
        <h1>Fim de Jogo</h1>
        <p>Sua pontuação final: <span>{score}</span></p>
        <button onClick={retry}>Tente Novamente</button>
    </div>
  )
}

export default GameOver