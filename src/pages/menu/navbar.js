import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import Web3 from 'web3'
import { useDispatch } from "react-redux"

import { connectWallet, disconnectWallet } from '../../actions/common'

import './navbar.scss'

const Navbar = () => {
    const [wallet, setWallet] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        const walletAddr = localStorage.getItem('wallet')
        if (!!walletAddr) {
            setWallet(walletAddr)
            dispatch(connectWallet(walletAddr))
        }
    }, [])
    const connect = async () => {
        if (wallet.length > 0) {
            return
        }
        const provider = Web3.givenProvider
        console.log('provider:', provider)
        const web3 = new Web3(provider)
        const accounts = await web3.eth.requestAccounts();
        setWallet(accounts[0])
        localStorage.setItem('wallet', accounts[0])
        provider.on('accountsChanged', (accounts) => {
            console.log('accounts:', accounts)
            if (accounts.length === 0) {
                setWallet('')
                dispatch(disconnectWallet())
                localStorage.removeItem('wallet')
                navigate('/')
            } else {
                setWallet(accounts[0])
                dispatch(connectWallet(accounts[0]))
                localStorage.setItem('wallet', accounts[0])
                window.location.reload()
            }
        })
    }
    return (
        <div>
            <div className='topLogo'><img src={'/assets/image/home/Asset\ 12.png'} alt='logo' /></div>
            
            <div className='menu'>
                <div className='left'></div>
                <div className='right'>
                    <Link to='/'><b className='menu_item'>NFT</b></Link>
                    <Link to='/'><div className='menu_item'>LEARN</div></Link>
                    <Link to='/stake'><div className='menu_item'>STAKE</div></Link>
                    <Link to='/swap'><div className='menu_item'>SWAP</div></Link>
                    <div className='menu_item wallet' onClick={connect}>
                        {
                            wallet ? wallet.substr(0, 6) + '...' + wallet.substr(wallet.length - 4, 4) : 'CONNECT WALLET'
                        }
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Navbar