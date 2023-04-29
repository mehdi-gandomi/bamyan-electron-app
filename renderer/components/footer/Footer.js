import React from 'react'

const Footer = () => {
  return (
    <footer className="h-[auto] bg-black p-5 text-center text-white sm:text-xl">
      <ul className="flex flex-wrap gap-10">
        <li>
          {' '}
          &copy; Copyright April 2022,{' '}
          <a href="https://www.ingootag.com/">Ingootag Software Group</a>
        </li>
      </ul>
    </footer>
  )
}
export default Footer
