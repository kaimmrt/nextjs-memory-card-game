import React from 'react'

interface ICard {
    card: { src: string, matched: boolean },
    flipped: boolean,
    disabled: boolean,
    handleChoice: (card: { src: string, matched: boolean }) => void
}

const Card: React.FC<ICard> = ({ card, handleChoice, flipped, disabled }) => {

    const handleClick = () => {
        if (!disabled) {
            handleChoice(card)
        }
    }

    return (
        <div className="relative">
            <div className={flipped ? "flipped" : ""}>
                <img
                    className="front bg-slate-600 transition-all ease-in duration-300 absolute h-48
                     border-solid border-2 border-white rounded-lg block w-12/12"
                    src={card.src}
                />
                <img
                    className="h-48 border-solid border-2 border-white rounded-lg block w-12/12"
                    src='/images/3839.webp'
                    onClick={handleClick}
                />
            </div>
        </div>
    );
};

export default Card;