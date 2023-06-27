import './StartScreen.css'

const StartScreen = ({startGame}) => {
  return (
    <div className='startContainer'>
        <h2>
            secret 
            <div>
                Wo<span>r</span>d
            </div>
        </h2>
        <p>Clique no botão abaixo para começar a jogar</p>
        <button onClick={startGame}>Começar o Jogo</button>
    </div>
  )
}

export default StartScreen