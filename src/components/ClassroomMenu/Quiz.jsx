import React, { useState, useEffect } from "react";
import { quizData } from "../../sampleData"
import styled from "styled-components"
// import M from "materialize-css"
// import theme from "../../theme"

// Hide scroll bar for windows users

// Eventually Replace quizData with data prop
export default ({ data, close }) => {
  const [index, setIndex] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const { question, answer, explanation } = quizData[index]

  useEffect(() => {
    setExpanded(false)
  }, [index])

  return <QuizBox>
    <CloseBtn onClick={() => close()}> x </CloseBtn>
    <Question>{question}</Question>
    {!expanded &&
      <ShowAnswer onClick={() => setExpanded(true)}>
        Show Answer
      </ShowAnswer>
    }

    {expanded &&
      <>
        <Answer>{answer}</Answer>
        <Explanation>{explanation}</Explanation>
      </>
    }
    {index < quizData.length - 1 &&
      <Next onClick={() => setIndex(index + 1)}>Next</Next>
    }
    {index > 0 &&
      <Back onClick={() => setIndex(index - 1)}>Back</Back>
    }
  </QuizBox>
}

const QuizBox = styled.div`
    display: grid;
    position: fixed;
    margin: 2em;
    width: 25em;
    height: auto;
    padding: .5em;
    font-size: 18px;
    background: #f9f8f8;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
`
const Question = styled.div`
    padding: 1em;
`
const Answer = styled.div`
    flex: 1;
    padding: .5em;
    text-align: center;
    color: #f9f8f8;
    background: #1D7305;
`
const Explanation = styled.div`
    margin-bottom: 1em;
    padding: 1em;
    max-height: 35vh;
    overflow: scroll;
`
const ShowAnswer = styled.div`
    justify-self: center;
    width: auto;
    cursor: pointer;
    padding: 9px;
    color: #f9f8f8;
    background: #1D7305;
    transition: all 0.4s cubic-bezier(0.215, 0.61, 0.355, 1);
    &:hover {
        letter-spacing: 2px;
    }
`
const Next = styled.div`
    width: 4em;
    text-align: center; 
    place-self: end end;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.215, 0.61, 0.355, 1);
    &:hover {
        letter-spacing: 4px;
    }

`
// Will Replace with Button and use styled's extension keyword "as"

const Back = styled.div`
    width: 4em;
    text-align: center;
    place-self: left end;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.215, 0.61, 0.355, 1);
    &:hover {
        letter-spacing: 4px;
    }
`
const CloseBtn = styled.div`
    position: absolute;
    top: 0;
    right: 5%;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.215, 0.61, 0.355, 1);
    color: red;
    font-size: 26px;
    height: 1em;
    width: 1em;
    transform-origin: center;

    &:hover {
        content: "Close Quiz"
    }
`