import React from 'react'
import NavBar from '../(guest)/_components/navbar'
import Footer from '../(guest)/_components/footer'

const JoinLayout = (
    { children } : Readonly<{  children: React.ReactNode }>
) => {
  return (
    <section>
        <NavBar />
        <div>
            {children}
        </div>
        <Footer />
    </section>
  )
}

export default JoinLayout