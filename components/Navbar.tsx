import Link from 'next/link'
import React from 'react'

function Navbar() {
  return (
    <nav className='max-container container flexBetween padding-container my-8'>
      <div>
        <p>Blog</p>
      </div>
      <ul className='flexCenter gap-8'>
        <Link href="/"><li>Home</li></Link>
        <Link href="/blogs"><li>Blogs</li></Link>
        <Link href="/users"><li>Users</li></Link>
        <Link href="/create-post"><li>Add Post</li></Link>
        <Link href="/admin"><li>Admin Page</li></Link>
      </ul>
      <div>
        <p>Dark</p>
      </div>
    </nav>
  )
}

export default Navbar