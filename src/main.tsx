import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { Home } from './layout/home/home'
import { QuizScreen } from './layout/quizz/quizz'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/quizz' element={<QuizScreen/>}/>
        </Routes>
    </BrowserRouter>
  </StrictMode>
  
  
)
