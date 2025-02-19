import React from 'react'

const StudentQuizzes = () => {
  return (
    <section className="p-6 h-screen">
      <div className="flex items-center justify-between gap-x-10">
        <div className="bg-slate-50 py-5 rounded-2xl">
          <h1 className="font-poppins text-2xl font-bold">Quizzes done</h1>
          <p className="text-slate-600">Think it. Build it. Change the world! 🚀</p>
        </div>
      </div>

      <div className="py-20">
        <h1 className="text-slate-600 font-bold">No quizzes found</h1>
      </div>

    </section>
  )
}

export default StudentQuizzes