import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { AiOutlineArrowDown, AiOutlinePlus } from "react-icons/ai"
import { useSelector, useDispatch } from "react-redux"
import Web3 from 'web3'
import BigNumber from 'bignumber.js'
import axios from 'axios'
import Promise from 'bluebird'

import Navbar from '../menu/navbar'
import Success from '../../components/Success'
import NftBoostModal from '../../components/NftSameModal'

import './stake.scss'

import {
    lhrcStakingContractAddr,
    stakeTokenAddr,
    barncatAddr,
    ponyAddr,
    horseAddr,
    skyboxAddr,
    lpAddr
} from '../../constants'
import nftABI from '../../constants/abi/nft'
import lhrcABI from '../../constants/abi/stakeToken'
import stakingABI from '../../constants/abi/staking'
import lpABI from '../../constants/abi/lp'

import { startAction, endAction, showToast } from '../../actions/common'

let web3 = new Web3(Web3.givenProvider)
let lhrcContract, stakingContract, lpContract

const nftContracts = [barncatAddr, ponyAddr, horseAddr, skyboxAddr]
const nftCollections = [
    {
        image: '/assets/image/home/Asset 10.png',
        name: 'BARNCAT',
        boost: 2
    },
    {
        image: '/assets/image/home/Asset 9.png',
        name: 'PONY',
        boost: 3
    },
    {
        image: '/assets/image/home/Asset 11.png',
        name: 'HORSE',
        boost: 4
    },
    {
        image: '/assets/image/home/Asset 8.png',
        name: 'SKYBOX',
        boost: 10
    },
]

const Stake = () => {
    const [tokenSwitch, setTokenSwitch] = useState('lhrc')
    const [stakeNum, setStakeNum] = useState('0.0')
    const [stakedTokensFlag, setStakedTokensFlag] = useState(false)
    const [stakedLpFlag, setStakedLpFlag] = useState(false)
    const [successModalFlag, setSuccessModalFlag] = useState('none')
    const [lhrcBalance, setLhrcBalance] = useState('')
    const [lhrcDecimals, setLhrcDecimals] = useState(0)
    const [nftBalances, setNftBalances] = useState([0, 0, 0, 0])
    const [tokens, setTokens] = useState([])
    const [amplify, setAmplify] = useState(1)
    const [pendingRewards, setPendingRewards] = useState('')
    const [totalAmount, setTotalAmount] = useState('')
    const [totalLPAmount, setTotalLPAmount] = useState('')
    const [lpStaked, setLpStaked] = useState('')
    const [lpReward, setLpReward] = useState('')
    const [lpBalance, setLpBalance] = useState('')
    const [lpDecimals, setLpDecimals] = useState('')
    const [harvestingReward, setHarvestingReward] = useState('')
    const [nftBoostModal, setNftBoostModal] = useState(-1)
    const [showList, setShowList] = useState(true)
    const [staked, setStaked] = useState([0, 0, 0, 0])
    const [unstaked, setUnstaked] = useState('')
    const [stakedImg, setStakedImg] = useState(['', '', '', ''])
    // modal type : stake, unstake, harvest, 
    const [modalType, setModalType] = useState('')
    // Box type: add to stake
    const [boxType, setBoxType] = useState('')
    const { wallet } = useSelector(state => state.common);

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        const init = async () => {
            console.log('wallet changed:', wallet)
            const curWallet = localStorage.getItem('wallet')
            if (!curWallet) {
                localStorage.removeItem('wallet')
                navigate('/')
            }
            if (!!wallet) {
                dispatch(startAction())
                lhrcContract = new web3.eth.Contract(lhrcABI, stakeTokenAddr)
                const decimals = await lhrcContract.methods.decimals().call()
                console.log('decimals:', decimals)
                setLhrcDecimals(decimals)
                const lhrcblnc = await lhrcContract.methods.balanceOf(wallet).call()
                console.log('lhrc balance:', lhrcblnc)
                setLhrcBalance(BigNumber(lhrcblnc).dividedBy(BigNumber('10').exponentiatedBy(decimals)).toFixed(2))
                stakingContract = new web3.eth.Contract(stakingABI, lhrcStakingContractAddr)
                const amp = await stakingContract.methods.calculateAmplify(wallet).call()
                setAmplify(Number(amp))
                const stakednfts = await stakingContract.methods.getStakedNFTs(wallet).call()
                let newStaked = [0, 0, 0, 0]
                let newStakedImg = ['', '', '', '']
                await Promise.all(nftContracts.map(async (contractAddr, index) => {
                    const stkIndex = stakednfts.findIndex(stk => stk.nft === contractAddr)
                    if (stkIndex >= 0) {
                        const nftContract = new web3.eth.Contract(nftABI, contractAddr)
                        newStaked[index] = stakednfts[stkIndex].id
                        const tokenURI = await nftContract.methods.tokenURI(stakednfts[stkIndex].id).call()
                        const meta = (await axios.get(tokenURI.replace('ipfs://', 'https://ipfs.io/ipfs/'))).data
                        console.log('meta:', meta)
                        newStakedImg[index] = meta.image.replace('ipfs://', 'https://ipfs.io/ipfs/')
                    }
                }))
                console.log('staked images:', newStakedImg)
                setStaked([...newStaked])
                setStakedImg([...newStakedImg])
                const userinfo = await stakingContract.methods.getUserInfo(wallet).call()
                console.log('userinfo:', userinfo)
                setPendingRewards(userinfo.pendingRewards)
                setTotalAmount(userinfo.totalAmount)
                setTotalLPAmount(userinfo.totalLPAmount)
                if (tokenSwitch === 'lhrc' && !!userinfo.totalAmount && userinfo.totalAmount !== '0') {
                    setStakedTokensFlag(true)
                }
                if (tokenSwitch === 'lp' && !!userinfo.totalLPAmount && userinfo.totalLPAmount !== '0') {
                    setStakedTokensFlag(true)
                }
                lpContract = new web3.eth.Contract(lpABI, lpAddr)
                const lpDcml = await lpContract.methods.decimals().call()
                setLpDecimals(lpDcml)
                const lpblnc = await lpContract.methods.balanceOf(wallet).call()
                setLpBalance(lpblnc)
                console.log('LP Balance:', lpblnc)
                let i, curTokens = [[], [], [], []], nftblncs = [0, 0, 0, 0]
                await Promise.all(nftContracts.map(async (contractAddr, index) => {
                    let indexes = []
                    const nftContract = new web3.eth.Contract(nftABI, contractAddr)
                    let blnc = await nftContract.methods.balanceOf(wallet).call()
                    console.log('current balance:', blnc)
                    nftblncs[index] = Number(blnc)
                    for (i = 0; i < Number(blnc); ++i) {
                        indexes.push(i)
                    }
                    await Promise.all(indexes.map(async idx => {
                        const tokenId = await nftContract.methods.tokenOfOwnerByIndex(wallet, idx).call()
                        const tokenURI = await nftContract.methods.tokenURI(tokenId).call()
                        console.log('tokenUrI:', tokenURI)
                        const metadata = (await axios.get(tokenURI.replace('ipfs://', 'https://ipfs.io/ipfs/'))).data
                        curTokens[index].push({ ...metadata, tokenId })
                    }))
                }))
                setNftBalances([...nftblncs])
                for (i = 0; i < 4; ++i) {
                    curTokens[i].sort((a, b) => Number(a.tokenId) - Number(b.tokenId))
                }
                setTokens([...curTokens])
                console.log('tokens:', curTokens)
                dispatch(endAction())
            }
        }
        init()
    }, [wallet])

    // Click Stake Btn : show success modal
    const onClickStake = async () => {
        if (Number(stakeNum) === 0) {
            console.log('staking 0')
            return
        }
        const decimals = await lhrcContract.methods.decimals().call()
        const amount = BigNumber(stakeNum).multipliedBy(BigNumber(10).exponentiatedBy(decimals))
        console.log('decimals:', amount.toString())
        dispatch(startAction())
        try {
            if (tokenSwitch === 'lhrc') {
                lhrcContract.methods.approve(lhrcStakingContractAddr, amount).send({ from: wallet }).on('confirmation', async (confirmationNumber, receipt) => {
                    if (confirmationNumber === 1) {
                        stakingContract.methods.stake(stakeTokenAddr, amount.toString()).send({ from: wallet }).on('confirmation', async (confirmationNumber, receipt) => {
                            if (confirmationNumber === 1) {
                                const userinfo = await stakingContract.methods.getUserInfo(wallet).call()
                                console.log('userinfo:', userinfo)
                                setPendingRewards(userinfo.pendingRewards)
                                setTotalAmount(userinfo.totalAmount)
                                const lhrcblnc = await lhrcContract.methods.balanceOf(wallet).call()
                                console.log('lhrc balance:', lhrcblnc)
                                setLhrcBalance(BigNumber(lhrcblnc).dividedBy(BigNumber('10').exponentiatedBy(18)).toFixed(2))
                                setModalType('stake')
                                setSuccessModalFlag('block')
                                dispatch(endAction())
                            }
                        })
                    }
                })
            } else {
                console.log('staking LP', amount.toString(), amount)
                lpContract.methods.approve(lhrcStakingContractAddr, amount).send({ from: wallet }).on('confirmation', async (confirmationNumber, receipt) => {
                    if (confirmationNumber === 1) {
                        stakingContract.methods.stake(lpAddr, amount.toString()).send({ from: wallet }).on('confirmation', async (confirmationNumber, receipt) => {
                            if (confirmationNumber === 1) {
                                const userinfo = await stakingContract.methods.getUserInfo(wallet).call()
                                console.log('userinfo:', userinfo)
                                setPendingRewards(userinfo.pendingRewards)
                                setTotalLPAmount(userinfo.totalLPAmount)
                                const lpblnc = await lpContract.methods.balanceOf(wallet).call()
                                setLpBalance(lpblnc)
                                setModalType('stake')
                                setSuccessModalFlag('block')
                                dispatch(endAction())
                            }
                        })
                    }
                })
            }
        } catch (err) {
            console.log('error:', err)
            dispatch(endAction())
        }
    }

    // Click Harvest Btn: show harvest success modal
    const onClickHarvest = async () => {
        const currentReward = await stakingContract.methods.getCurrentRewards(wallet).call()
        console.log('current reward:', currentReward)
        const rewardAmount = BigNumber(currentReward).dividedBy(BigNumber(10).exponentiatedBy(lhrcDecimals)).toString()
        setHarvestingReward(rewardAmount)
        dispatch(startAction())
        console.log('reward amount:', rewardAmount)
        try {
            await stakingContract.methods.harvest().call({ from: wallet })
            await stakingContract.methods.harvest().send({ from: wallet }).on('confirmation', async (confirmationNumber, receipt) => {
                if (confirmationNumber === 1) {
                    const lhrcblnc = await lhrcContract.methods.balanceOf(wallet).call()
                    console.log('lhrc balance:', lhrcblnc)
                    setLhrcBalance(BigNumber(lhrcblnc).dividedBy(BigNumber('10').exponentiatedBy(18)).toFixed(2))
                    setModalType('harvest')
                    setSuccessModalFlag('block')
                }
            })
            dispatch(endAction())
        } catch (err) {
            dispatch(endAction())
            let errMsg = err.message
            if (errMsg.indexOf('\n') >= 0) {
                errMsg = errMsg.substr(err.message, errMsg.indexOf('\n'))
                errMsg = errMsg.substr(20, errMsg.length - 20)
                if (errMsg.includes('already harvested')) {
                    return dispatch(showToast('Already harvested. Please harvest 2 days after previous harvesting'))
                }
                dispatch(showToast(errMsg[0].toUpperCase() + errMsg.slice(1)))
            }
            console.log('error:', { curentError: err.message[0].toUpperCase() + err.message.slice(1) })

        }
    }

    // click Unstake Btn: show unstake success modal
    const onClickUnstake = async () => {
        let userinfo = await stakingContract.methods.getUserInfo(wallet).call()
        console.log('current staked:', userinfo)
        dispatch(startAction())
        console.log('unstaking:', userinfo.totalAmount)
        try {
            if (tokenSwitch === 'lhrc') {
                stakingContract.methods.unstake(stakeTokenAddr, userinfo.totalAmount).send({ from: wallet }).on('confirmation', async (confirmNumber, receipt) => {
                    if (confirmNumber === 1) {
                        await Promise.all(nftContracts.map(async (contractAddr, index) => {
                            if (staked[index] > 0) {
                                await stakingContract.methods.unstakeNFT(contractAddr, staked[index]).send({ from: wallet })
                            }
                        }))
                        const lhrcblnc = await lhrcContract.methods.balanceOf(wallet).call()
                        console.log('lhrc balance:', lhrcblnc)
                        setUnstaked(userinfo.totalAmount)
                        setHarvestingReward(userinfo.pendingRewards)
                        setModalType('unstake')
                        setSuccessModalFlag('block')
                        setLhrcBalance(BigNumber(lhrcblnc).dividedBy(BigNumber('10').exponentiatedBy(18)).toFixed(2))
                        const amp = await stakingContract.methods.calculateAmplify(wallet).call()
                        setAmplify(Number(amp))
                        userinfo = await stakingContract.methods.getUserInfo(wallet).call()
                        console.log('userinfo:', userinfo)
                        setPendingRewards(userinfo.pendingRewards)
                        setTotalAmount(userinfo.totalAmount)
                        dispatch(endAction())
                    }
                })
            } else {
                stakingContract.methods.unstake(lpAddr, userinfo.totalLPAmount).send({ from: wallet }).on('confirmation', async (confirmNumber, receipt) => {
                    if (confirmNumber === 1) {
                        await Promise.all(nftContracts.map(async (contractAddr, index) => {
                            if (staked[index] > 0) {
                                await stakingContract.methods.unstakeNFT(contractAddr, staked[index]).send({ from: wallet })
                            }
                        }))
                        const lpblnc = await lpContract.methods.balanceOf(wallet).call()
                        setLpBalance(lpblnc)
                        setUnstaked(userinfo.totalLPAmount)
                        setHarvestingReward(userinfo.pendingRewards)
                        setModalType('unstake')
                        setSuccessModalFlag('block')
                        const amp = await stakingContract.methods.calculateAmplify(wallet).call()
                        setAmplify(Number(amp))
                        userinfo = await stakingContract.methods.getUserInfo(wallet).call()
                        console.log('userinfo:', userinfo)
                        setPendingRewards(userinfo.pendingRewards)
                        setTotalLPAmount(userinfo.totalLPAmount)
                        dispatch(endAction())
                    }
                })
            }
        } catch (err) {
            dispatch(endAction())
        }
    }

    // close modal
    const closeModal = () => {
        setSuccessModalFlag('none')
        // setNftDifferentModal('none')
        setNftBoostModal(-1)
        setShowList(true)
    }

    // On modal board
    const onClickViewStakedTokens = async () => {
        let userinfo = await stakingContract.methods.getUserInfo(wallet).call()
        const lhrcblnc = await lhrcContract.methods.balanceOf(wallet).call()
        setLhrcBalance(BigNumber(lhrcblnc).dividedBy(BigNumber('10').exponentiatedBy(18)).toFixed(2))
        const lpblnc = await lpContract.methods.balanceOf(wallet).call()
        setLpBalance(lpblnc)
        if (tokenSwitch === 'lhrc') {
            setUnstaked(userinfo.totalAmount)
            if (!!userinfo.totalAmount && userinfo.totalAmount !== '0') {
                setStakedTokensFlag(true)
            }
        } else {
            setUnstaked(userinfo.totalLPAmount)
            if (!!userinfo.totalLPAmount && userinfo.totalLPAmount !== '0') {
                setStakedTokensFlag(true)
            }
        }
        setHarvestingReward(userinfo.pendingRewards)
        setModalType('')
        setSuccessModalFlag('none')
        // setSuccessModalFlag('block')
        setPendingRewards(userinfo.pendingRewards)
        setTotalAmount(userinfo.totalAmount)
        setTotalLPAmount(userinfo.totalLPAmount)
        const amp = await stakingContract.methods.calculateAmplify(wallet).call()
        setAmplify(Number(amp))
        setStakeNum('')
    }

    const unstakeNft = () => {
        setStakedTokensFlag(false)
        setSuccessModalFlag('none')
    }

    const harvestRewards = async () => {
        setPendingRewards(0)
        setSuccessModalFlag('none')
        const lhrcblnc = await lhrcContract.methods.balanceOf(wallet).call()
        console.log('lhrc balance:', lhrcblnc)
        setLhrcBalance(BigNumber(lhrcblnc).dividedBy(BigNumber('10').exponentiatedBy(18)).toFixed(2))
    }

    const onClickNftGroup = () => {
        setShowList(false)
    }

    const onClickBack = () => {
        setShowList(true)
    }

    const stakeNft = async (collectionId, tokenId) => {
        dispatch(startAction())
        try {
            const contractAddr = nftContracts[collectionId], nftContract = new web3.eth.Contract(nftABI, contractAddr)
            await nftContract.methods.approve(lhrcStakingContractAddr, tokenId).send({ from: wallet }).on('confirmation', async (confirmationNumber, receipt) => {
                if (confirmationNumber === 1) {
                    stakingContract.methods.stakeNFT(contractAddr, tokenId).send({ from: wallet }).on('confirmation', async (confirmNumber, receipt) => {
                        if (confirmNumber === 1) {
                            let newStaked = staked
                            newStaked[collectionId] = tokenId
                            const index = tokens[collectionId].findIndex(token => token.tokenId === tokenId)
                            let newImg = stakedImg
                            newImg[collectionId] = tokens[collectionId][index].image.replace('ipfs://', 'https://ipfs.io/ipfs/')
                            setSuccessModalFlag('none')
                            setNftBoostModal(-1)
                            setShowList(true)
                            setStaked([...newStaked])
                            setStakedImg([...newImg])
                            dispatch(endAction())
                            const amp = await stakingContract.methods.calculateAmplify(wallet).call()
                            setAmplify(Number(amp))
                            let i, curTokens = [[], [], [], []], nftblncs = [0, 0, 0, 0]
                            await Promise.all(nftContracts.map(async (contractAddr, index) => {
                                let indexes = []
                                const nftContract = new web3.eth.Contract(nftABI, contractAddr)
                                let blnc = await nftContract.methods.balanceOf(wallet).call()
                                nftblncs[index] = Number(blnc)
                                for (i = 0; i < Number(blnc); ++i) {
                                    indexes.push(i)
                                }
                                await Promise.all(indexes.map(async idx => {
                                    const tokenId = await nftContract.methods.tokenOfOwnerByIndex(wallet, idx).call()
                                    const tokenURI = await nftContract.methods.tokenURI(tokenId).call()
                                    console.log('tokenUrI:', tokenURI)
                                    const metadata = (await axios.get(tokenURI.replace('ipfs://', 'https://ipfs.io/ipfs/'))).data
                                    curTokens[index].push({ ...metadata, tokenId })
                                }))
                            }))
                            setNftBalances([...nftblncs])
                            for (i = 0; i < 4; ++i) {
                                curTokens[i].sort((a, b) => Number(a.tokenId) - Number(b.tokenId))
                            }
                            setTokens([...curTokens])
                        }
                    })
                }
            })
        } catch (err) {
            dispatch(endAction())
            console.log('current error:', err)
        }
    }

    const addToStake = () => {
        setBoxType('addToStake')
        // setStakeNum(0)
    }

    const gotoBack = () => {
        setBoxType('')
    }

    const onAddNft = index => {
        console.log('stake unstake nft:', index, staked[index])
        try {
            if (staked[index] > 0) {
                console.log('unstaking:', nftContracts[index], staked[index])
                dispatch(startAction())
                stakingContract.methods.unstakeNFT(nftContracts[index], staked[index]).send({ from: wallet }).on('confirmation', async (confirmNumber, receipt) => {
                    if (confirmNumber === 1) {
                        let newStaked = staked
                        newStaked[index] = 0
                        setStaked([...newStaked])
                        let newImage = stakedImg
                        newImage[index] = ''
                        setStakedImg([...newImage])
                        const amp = await stakingContract.methods.calculateAmplify(wallet).call()
                        setAmplify(Number(amp))
                        let i, curTokens = [[], [], [], []], nftblncs = [0, 0, 0, 0]
                        await Promise.all(nftContracts.map(async (contractAddr, index) => {
                            let indexes = []
                            const nftContract = new web3.eth.Contract(nftABI, contractAddr)
                            let blnc = await nftContract.methods.balanceOf(wallet).call()
                            nftblncs[index] = Number(blnc)
                            for (i = 0; i < Number(blnc); ++i) {
                                indexes.push(i)
                            }
                            await Promise.all(indexes.map(async idx => {
                                const tokenId = await nftContract.methods.tokenOfOwnerByIndex(wallet, idx).call()
                                const tokenURI = await nftContract.methods.tokenURI(tokenId).call()
                                console.log('tokenUrI:', tokenURI)
                                const metadata = (await axios.get(tokenURI.replace('ipfs://', 'https://ipfs.io/ipfs/'))).data
                                curTokens[index].push({ ...metadata, tokenId })
                            }))
                        }))
                        setNftBalances([...nftblncs])
                        for (i = 0; i < 4; ++i) {
                            curTokens[i].sort((a, b) => Number(a.tokenId) - Number(b.tokenId))
                        }
                        setTokens([...curTokens])
                        dispatch(endAction())
                    }
                })
            } else {
                setNftBoostModal(index)
            }
        } catch (err) {
            console.log("error:", err)
        }
    }
    return (
        <div>
            <div className='bodyStake'>
                <div className='contentStake'>
                    <Navbar />
                    <div className='box' style={{ display: (successModalFlag === 'none' && nftBoostModal) < 0 ? 'block' : 'none' }}>
                        {
                            boxType === 'addToStake' &&
                            <div className='goback' onClick={gotoBack}>Back</div>
                        }
                        <div className='topSection'>
                            {
                                boxType === 'addToStake' ? (
                                    <div className='addToStake'>{tokenSwitch === 'lhrc' ? 'ADD TO STAKE' : 'ADD TO FARM'}</div>
                                ) : (
                                    <div className='switchContainer'>
                                        <div className={tokenSwitch === 'lhrc' ? 'selected stakingFont' : 'stakingFont'} style={{ color: tokenSwitch === 'lhrc' ? 'white' : '' }} onClick={() => {
                                            setTokenSwitch('lhrc')
                                            setStakeNum('0')
                                            setStakedTokensFlag(!!totalAmount && totalAmount !== '0')
                                            setBoxType('')
                                        }}>
                                            Stake LHRC Tokens
                                        </div>
                                        <div className={tokenSwitch === 'lp' ? 'selected stakingFont' : 'stakingFont'} style={{ color: tokenSwitch === 'lp' ? 'white' : '' }} onClick={() => {
                                            setTokenSwitch('lp')
                                            setStakeNum('0')
                                            setStakedTokensFlag(!!totalLPAmount && totalLPAmount !== '0')
                                            setBoxType('')
                                        }}>
                                            Stake LP Tokens
                                        </div>
                                    </div>
                                )
                            }
                            <div className='topapr'>{20 * amplify}% APR</div>
                        </div>
                        {
                            (stakedTokensFlag === false && boxType !== 'addToStake') ? (
                                <div className='displayContainer'>
                                    <div className='displayLeftItems'>
                                        <div className='circle'><img src='/assets/image/LHRC Coin PFP.png' style={{ width: '96px', height: '96px' }} alt="LHRC Coin PFP.png" /></div>
                                        <div className='statement'>
                                            <div style={{ fontSize: '20px' }}>{tokenSwitch === 'lhrc' ? 'Stake:' : 'From LP Tokens'}</div>
                                            <div className='bold-font' style={{ fontSize: '36px' }}>{tokenSwitch === 'lhrc' ? 'LHRC Token' : 'LP Token'}</div>
                                        </div>
                                    </div>
                                    <div className='displayLeftItems'>
                                        <div><input type='text' value={stakeNum} onChange={(e) => setStakeNum(e.target.value)} /></div>
                                        <div className='max' onClick={() => setStakeNum(tokenSwitch === 'lhrc' ? lhrcBalance : BigNumber(lpBalance).dividedBy(BigNumber(10).exponentiatedBy(lpDecimals)).toFixed(2))}>Max</div>
                                    </div>
                                </div>
                            ) : boxType !== 'addToStake' ? (
                                <div className='displayContainer'>
                                    <div className='displayLeftItems'>
                                        <div className='circle'><img src='/assets/image/LHRC Coin PFP.png' style={{ width: '96px', height: '96px' }} alt="LHRC Coin PFP.png" /></div>
                                        <div className='statement'>
                                            <div style={{ fontSize: '20px' }}>Stake:</div>
                                            <div className='bold-font' style={{ fontSize: '36px' }}>{tokenSwitch === 'lhrc' ? 'LHRC Token' : 'LP Token'}</div>
                                        </div>
                                    </div>
                                    <div className='statement_right'>
                                        <div style={{ fontSize: '20px' }}>Amount Staked</div>
                                        <div className='bold-font' style={{ fontSize: '36px' }}>{tokenSwitch === 'lhrc' ? BigNumber(totalAmount).dividedBy(BigNumber(10).exponentiatedBy(BigNumber(lhrcDecimals))).toFixed(2) : BigNumber(totalLPAmount).dividedBy(BigNumber(10).exponentiatedBy(BigNumber(lpDecimals))).toFixed(2)}</div>
                                    </div>
                                    <div className='statement_right'>
                                        <div style={{ fontSize: '20px' }}>Cumulative Rewards</div>
                                        <div className='bold-font' style={{ fontSize: '36px' }}>{BigNumber(pendingRewards).dividedBy(BigNumber(10).exponentiatedBy(BigNumber(lhrcDecimals))).toFixed(2)} LHRC</div>
                                    </div>
                                </div>
                            ) : boxType === 'addToStake' && (
                                <div className='displayContainer'>
                                    <div className='displayLeftItems'>
                                        <div className='circle'><img src='/assets/image/LHRC Coin PFP.png' style={{ width: '96px', height: '96px' }} alt="LHRC Coin PFP.png" /></div>
                                        <div className='statement'>
                                            <div style={{ fontSize: '20px' }}>{tokenSwitch === 'lhrc' ? 'Stake:' : 'From LP Tokens'}</div>
                                            <div className='bold-font' style={{ fontSize: '36px' }}>{tokenSwitch === 'lhrc' ? 'LHRC Token' : 'LP Token'}</div>
                                        </div>
                                    </div>
                                    <div className='displayLeftItems'>
                                        <div><input type='text' value={tokenSwitch === 'lhrc' ? BigNumber(totalAmount).dividedBy(BigNumber(10).exponentiatedBy(BigNumber(lhrcDecimals))).toFixed(2) : BigNumber(totalLPAmount).dividedBy(BigNumber(10).exponentiatedBy(BigNumber(lpDecimals))).toFixed(2)} readOnly /></div>
                                    </div>
                                </div>
                            )
                        }
                        {
                            // boxType === 'addToStake' ? <div className='swap_icon' style={{ visibility: boxType !== 'addToStake' ? 'hidden' : 'visible' }}>
                            //     <AiOutlinePlus className='arrow' style={{ display: 'flex', justifyContent: 'center' }} />
                            // </div> : <div className='swap_icon' style={{ visibility: stakedTokensFlag ? 'hidden' : 'visible' }}>
                            //     <AiOutlineArrowDown className='arrow' style={{ display: 'flex', justifyContent: 'center' }} />
                            // </div>
                            boxType === 'addToStake' ? <div className='swap_icon' style={{ visibility: boxType !== 'addToStake' ? 'hidden' : 'visible' }}>
                                <AiOutlinePlus className='arrow' style={{ display: 'flex', justifyContent: 'center' }} />
                            </div> : <div style={{ width: '100%', height: '40px' }}>
                                {/* <AiOutlineArrowDown className='arrow' style={{ display: 'flex', justifyContent: 'center' }} /> */}
                            </div>
                        }
                        {
                            boxType === 'addToStake' && (
                                <div className='displayContainer' style={{ marginTop: 0, marginBottom: '25px' }}>
                                    <div className='displayLeftItems'>
                                        <div className='circle'><img src='/assets/image/LHRC Coin PFP.png' style={{ width: '96px', height: '96px' }} alt="LHRC Coin PFP.png" /></div>
                                        <div className='statement'>
                                            <div style={{ fontSize: '20px' }}>{tokenSwitch === 'lhrc' ? 'Stake:' : 'From LP Tokens'}</div>
                                            <div className='bold-font' style={{ fontSize: '36px' }}>{tokenSwitch === 'lhrc' ? 'LHRC Token' : 'LP Token'}</div>
                                        </div>
                                    </div>
                                    <div className='displayLeftItems'>
                                        <div><input type='text' value={stakeNum} onChange={(e) => setStakeNum(e.target.value)} /></div>
                                        <div className='max' onClick={() => setStakeNum(tokenSwitch === 'lhrc' ? lhrcBalance : BigNumber(lpBalance).dividedBy(BigNumber(10).exponentiatedBy(lpDecimals)).toFixed(2))}>Max</div>
                                    </div>
                                </div>
                            )
                        }
                        <div className='stakeItems'>
                            {
                                nftCollections.map((collection, index) => <div className='stakeItem' onClick={() => onAddNft(index)} key={index}>
                                    <img src={stakedImg[index] || collection.image} alt='nft' />
                                    {
                                        staked[index] > 0 ? (
                                            <div className='boost bold-font' style={{ width: '100%', fontSize: '32px' }}>
                                                {collection.name}<br />#{staked[index]}<br />{collection.boost}X BOOST
                                            </div>
                                        ) : (
                                            <div className='boost bold-font' style={{ width: '100%', fontSize: '32px' }}>
                                                BOOST<br />{collection.boost}X
                                            </div>
                                        )
                                    }
                                </div>)
                            }
                        </div>
                        {
                            tokenSwitch === 'lhrc' && ((stakedTokensFlag === false && boxType !== 'addToStake') ? (
                                <div className='stakeContainer'>
                                    <button onClick={onClickStake}>STAKE LHRC TOKENS</button>
                                </div>
                            ) : boxType !== 'addToStake' ?
                                <div className='stakeContainer'>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <button
                                            style={{ width: '47%', backgroundColor: '#71BE2A' }}
                                            onClick={addToStake}
                                        >
                                            ADD TO STAKE
                                        </button>
                                        <button
                                            style={{ width: '47%' }}
                                            onClick={onClickUnstake}
                                        >UNSTAKE</button>
                                    </div>
                                    <button onClick={onClickHarvest}>HARVEST REWARDS</button>
                                </div>
                                : <div className='stakeContainer'>
                                    <button onClick={onClickStake}>ADD TOKENS TO INCREASE STAKE</button>
                                </div>
                            )
                        }
                        {
                            tokenSwitch === 'lp' && (
                                boxType === 'addToStake' ? (
                                    <div className='stakeContainer'>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <button
                                                style={{ width: '47%', backgroundColor: '#71BE2A' }}
                                                onClick={addToStake}
                                            >
                                                ADD TO FARM
                                            </button>
                                            <button
                                                style={{ width: '47%' }}
                                                onClick={onClickUnstake}
                                            >UNSTAKE</button>
                                        </div>
                                        <button onClick={onClickHarvest}>HARVEST REWARDS</button>
                                    </div>
                                ) : (
                                    <div className='stakeContainer'>
                                        <button onClick={onClickStake}>Farm</button>
                                    </div>
                                )
                            )
                        }
                    </div>
                    <div style={{ display: successModalFlag }}>
                        <Success
                            closeModal={closeModal}
                            onClickViewStakedTokens={onClickViewStakedTokens}
                            modalType={modalType}
                            unstakeNft={unstakeNft}
                            harvestingReward={harvestingReward}
                            harvestRewards={harvestRewards}
                            stakeAmount={stakeNum}
                            decimals={lhrcDecimals}
                            unstaked={unstaked}
                            staked={staked}
                            tokenSwitch={tokenSwitch}
                            stakedTokensFlag={stakedTokensFlag}
                        />
                    </div>

                    <div style={{ display: nftBoostModal < 0 ? 'none' : 'flex' }}>
                        <NftBoostModal
                            onClickNftGroup={onClickNftGroup}
                            closeModal={closeModal}
                            showList={showList}
                            onClickBack={onClickBack}
                            stake={stakeNft}
                            harvestRewards={harvestRewards}
                            nftBoostModal={nftBoostModal}
                            barncatBalance={nftBalances[0]}
                            ponyBalance={nftBalances[1]}
                            horseBalance={nftBalances[2]}
                            skyboxBalance={nftBalances[3]}
                            tokens={tokens}
                        />
                    </div>
                </div>
                <img src='/assets/image/stake/Hills.svg' alt='hill' style={{ position: 'relative', zIndex: '0', width: '100%', height: '100%', marginTop: '-50px' }} />
            </div>
        </div >
    )
}

export default Stake