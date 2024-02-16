import React from 'react'
import '../styles/navbar.css';

function NavBar() {
  return (
    <div>
        <ul class="navbar">
            <li class="title" id="nav-item"><a href="/">LernIt</a></li>
            <li class="nav-item" id="nav-item"><a href="/new">New</a></li>
            <li class="nav-item" id="nav-item"><a href="/contact">Contact</a></li>
            <li class="nav-item" id="nav-item"><a href="/about">About</a></li>
            <li class="nav-item" id="nav-item"><a href="/">Home</a></li>
        </ul>
    </div>
  )
}

export default NavBar