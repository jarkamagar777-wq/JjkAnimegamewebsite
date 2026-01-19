import React from 'react'

const Button = ({ id, title, rightIcon: RightIcon, leftIcon: LeftIcon, containerClass }) => {
  return (
    <button id={id} className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet
    px-7 py-3 text-black ${containerClass}`}>
      {LeftIcon && <LeftIcon className="size-4" />}
      {title}
      {RightIcon && <RightIcon className="size-4" />}
      <span className='relative inline-flex overflow-hidden font-general text-xs uppercase'></span>
    </button>
  )
}

export default Button;