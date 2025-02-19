import React from 'react'
import NavBar from './_components/navbar'
import Footer from './_components/footer'

const GuestLayout = ({
  children
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <section>
      <NavBar />
        <div className="w-full">
          {children}
        </div>
      <Footer />
    </section>
  )
}

export default GuestLayout