import React from "react";

interface Props {
  text: string,
  onClick?: () => void,
  className?: string,
}

const Button: React.FC<Props> = ({text, className, onClick}) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`flex items-center justify-center gap-2.5 bg-white py-4 w-full whitespace-nowrap rounded-xl hover:scale-105 hover:bg-blue-600 hover:text-white active:bg-blue-600 active:text-white active:scale-97 transition duration-300 ${className}`}
    >
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 22.9231V21.0769H21.0769V10H22.9231V21.0769H34V22.9231H22.9231V34H21.0769V22.9231H10Z" fill="#0B1F33"/>
      </svg>
      <span className={"font-lato text-32"}>
        {text}
      </span>
    </button>
  )
}

export default Button
