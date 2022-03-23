import React, { useState, useEffect } from "react";
import Card from "../src/components/Card/Card";

const cardImages = [
    { "src": "/images/harry-potter.png", matched: false },
    { "src": "/images/voldermort.png", matched: false },
    { "src": "/images/ron.png", matched: false },
    { "src": "/images/wizard.png", matched: false },
    { "src": "/images/hermonie.png", matched: false },
    { "src": "/images/dobby.png", matched: false },
    { "src": "/images/mcgonogal.png", matched: false },
    { "src": "/images/magic-wand.png", matched: false },
    { "src": "/images/wizard-hat.png", matched: false },
]

function HomePage() {
    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0)
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)
    const [disabled, setDisabled] = useState(false)

    const shuffleCards = () => {
        const shuffleCards = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({ ...card, id: Math.random() }))

        setCards(shuffleCards)
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(0)
    }

    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    }

    useEffect(() => {
        if (choiceOne && choiceTwo) {
            setDisabled(true)
            if (choiceOne.src === choiceTwo.src) {
                setCards(prevCards => {
                    return prevCards.map(card => {
                        if (card.src === choiceOne.src) {
                            return { ...card, matched: true }
                        } else return card
                    })
                })
                resetTurn()
            } else {
                setTimeout(() => resetTurn(), 1000)
            }
        }
    }, [choiceOne, choiceTwo])

    useEffect(() => {
        shuffleCards()
    }, [])

    const resetTurn = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(prevTurns => prevTurns + 1)
        setDisabled(false)
    }

    return (
        <div className="my-10 mx-auto max-w-4xl">
            <button
                className="border-solid border-2 border-white font-bold py-3 px-2 rounded-lg hover:bg-amber-500"
                onClick={() => shuffleCards()}
            >
                Shuffle the cards
            </button>
            <div className="grid grid-rows-3 grid-flow-col gap-3 mt-10">
                {cards.map((card) => (
                    <Card
                        key={card.id}
                        card={card}
                        handleChoice={handleChoice}
                        flipped={card === choiceOne || card === choiceTwo || card.matched}
                        disabled={disabled}
                    />
                ))}
            </div>
            <p>Turns :{turns}</p>
        </div>
    )
}
export default HomePage;