import './App.css'
import React from 'react'
import { useState } from 'react'
import ProductCard from './components/ProductCard'
import Product from './model/Product'
import Button from './components/Button';

function App() {
  const [count, setCount] = useState(0)
  const apple = new Product(
    "Green apple",
    3.5,
    "This is a jucy fresh apple with sour-sweet taste",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.4qbcI2OWgQ6rVkNQScKn_QAAAA%26pid%3DApi&f=1&ipt=6ef1c91835b5d3423bbba11b354e7e5bc75a8acf8a989447f6ee52d0f487fd5f&ipo=images"
  )
  const peach = new Product(
    "Peach",
    5.52,
    "Freshy peach with a sweet taste",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.hGGz_WSV6bgvuZxUrH_APQAAAA%26pid%3DApi&f=1&ipt=30f8dc3610e2effdf286c20a98c2f4f6608e9da63ff516d158fee1f401c1c39e&ipo=images"
  )

  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col col-lg-3'>
            <ProductCard product={apple} />
          </div>
          <div className='col col-lg-3'>
            <ProductCard product={peach} />
          </div>
          <div className='col col-lg-3'>
            <Button color='prominent'>Test </Button>
            <Button color='warning'>Test </Button>
          </div>
          <div className='col col-lg-3'>
            <Button color='prominent' outline='1'>Test outlined</Button>
            <Button color='info' outline='1'>Test outlined</Button>
            <Button color='danger' outline='1'>Test outlined</Button>
            <Button color='success' outline='1'>Test outlined</Button>
          </div>
        </div>

      </div>
    </>
  )
}

export default App
