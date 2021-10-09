import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import searchIcon from '../../../assets/navIcons/search-icon.png'
import { useSelector, useDispatch } from "react-redux";
import { login } from '../login/userSlice';

function Avatar() {
const [currSearch, setCurrSearch] = useState('')
const [displayPokemon, setDisplayPokemon] = useState('')
const [searchedPokemon, setSearchedPokemon] = useState('')
const user = useSelector((state) => state.user.user);
const dispatch = useDispatch();


  const handleChange = (value) => {
    setCurrSearch(value)
    console.log(value)
  }
  const handleClick = async() => {
    try {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${currSearch}`)
      const image = res.data.sprites.other['official-artwork'].front_default
      setDisplayPokemon(image)
      setSearchedPokemon(currSearch)
      // try {
      //   const body = {
      //     avatar: image,
      //     profileId: user.id
      //   }
      //   console.log(body)
      //   const avatarRes = await axios.put("/api/avatar", body)
      //   console.log(avatarRes)
      // } catch (err) {
      //   console.log(err)
      // }
    
  } catch (err) {
    console.log(err)
  }
}

  const setIcon = async() => {
    try {
        const body = {
          avatar: displayPokemon,
          profileId: user.id
        }
        console.log(body)
        const avatarRes = await axios.put("/api/avatar", body)
        localStorage.setItem('user', JSON.stringify(avatarRes.data))
        dispatch(login(avatarRes.data))
      } catch (err) {
        console.log(err)
      }
  }

  const showPokemon = () => {
    return (
      // <div id="div-pokemon-search">
        <div className="div-individual-product " id="div-individual-pokemon">
          <div
            className="div-product-image"
            style={{ backgroundImage: `url(${displayPokemon})` }}
          ></div>
          <h4 className="h4-product-title h4-product-title-space">{searchedPokemon}</h4>
          <button className="button-product-add" onClick={() => setIcon()}>Set Icon</button>
        </div>
      // </div>
    )
  }






  return (
      <div className="div-full-page">
      <div className="div-page-title">
          <h1 className="h1-page-title">Search for Pokemon</h1>
          <Link to="/account">
          <h3 className="h3-sub-title h3-account-order">Account</h3>
        </Link>
        <div id="div-avatar-search">

          <input
          type="text"
          className="input-text-field input-search"
          placeholder="pokemon"
          onChange={(e) => handleChange(e.target.value)}
          />
        <input id="input-search-avatar" type="image" src={searchIcon} width="30px" height="30px"alt="search icon" onClick={handleClick}/>
          </div>
      </div>
      <div className="div-all-products">

      {displayPokemon ? showPokemon() : <h3>No matching searches</h3>}
      </div>
    </div>
  )
}

export default Avatar
