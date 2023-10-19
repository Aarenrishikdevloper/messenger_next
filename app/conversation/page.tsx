'use client'
 
 
import React from 'react'
import useConversation from '../hook/useConversation';
import clsx from 'clsx';
import Emptystate from '../components/Emptystate';
import Layout from './layout';
import Sidebar from '../components/sidebar/sidebar';

const Home = () => { 
    const {isopen} = useConversation();
  return (
    
    <div className={clsx('lg:pl-80 h-full lg:block', isopen?'block':'hidden')}>
        <Emptystate/>
    </div>
    
  )
}

export default Home
