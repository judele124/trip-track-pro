import React, { useState, useEffect } from 'react'
import map from '../../assets/iilustrations/s1-map.svg'
import phone from '../../assets/iilustrations/s2-phone.svg'
import trophy from '../../assets/iilustrations/s3-trophy.svg'
import startScreen from '../../assets/iilustrations/start-screen.svg'
import Logo from '../logo/Logo'


const FirstEntry = () => {

    const [index, setIndex] = useState(1);
    const imgesEndTextArr = [
        {
            img: map,
            alt: "map img",
            text: "Managing group trips can be a hassle keep everyone *together and *engaged"

        },
        {
            img: phone,
            alt: "phone img",
            text: "Stay organized on your trips with *live *tracking and trip planning"
        },
        {
            img: trophy,
            alt: "trophy img",
            text: "Make your own *adventure Complete challenges, collect points,and compete for *rewards."
        },
    ]
    useEffect(() => {
        console.log(index);

    }, [index])

    const renderText = (text) => {
        return (
          <p className="text-center text-pretty text-2xl">
            {text
              .split(" ")
              .map((word) =>
                word[0] === "*" ? (
                  <span className="text-orange font-bold ">{word.slice(1) + " "}</span>
                ) : (
                  word + " "
                ),
              )}
          </p>
        );
      };


    return (
        <div className="min-h-screen p-0  bg-light dark:bg-purple text-purple dark:text-light flex flex-col justify-between">
            <div className="gap-8 flex flex-col p-4">
                <div className="self-center">
                    <h3 className="text-2xl font-bold">Welcome to</h3>
                    <Logo isDarkMode={false} />
                </div>
                {
                    renderText(imgesEndTextArr[index].text)
                }
                {/* <p className="text-pretty text-2xl ">{imgesEndTextArr[index].text}</p> */}
            </div>
            <img className="" src={imgesEndTextArr[index].img} alt={imgesEndTextArr[index].alt} ></img>
            <button
                onClick={() => setIndex((index + 1) % imgesEndTextArr.length)}
                className="p-4 mb-10 bg-orange  text-white self-center rounded-xl"
            >
                Toggle Dark Mode
            </button>
        </div>
    );
}

export default FirstEntry