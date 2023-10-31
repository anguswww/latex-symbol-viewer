'use client'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GridList from './components/gridList'
import { greek_letters, operators } from "./data/jsonData.js"

export default function Home() {
  return (
    <main className="lg:px-64 lg:py-12 p-8">

      <h3 className="text-4xl pb-2">Greek Alphabet</h3>
      <hr className="pb-7"/>
      <GridList json={ greek_letters }/>

      <h3 className="text-4xl pb-2">Operators</h3>
      <hr className="pb-7"/>
      <GridList json={ operators }/>

      <ToastContainer theme="dark" hideProgressBar={true}/>
    </main>
  )
}
