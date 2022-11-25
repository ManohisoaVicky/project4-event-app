import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { updateProfile, myUserProfile } from '../../utils/userService'
import useUser from "../../hooks/userUser"

import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import Button from '../../components/FormElements/Button/Button'
import Input from '../../components/FormElements/Input/Input'
import "./ProfileEditPage.css"

function ProfileEditPage({state, setState}) {

  const { user } = useUser()

  let userID = useParams().userID

  let navigate = useNavigate()

  useEffect(() => {
    if (user) {
    async function getUserInfo() {
      const currentUser = await myUserProfile(user.id)
      setState(currentUser)
    }
    getUserInfo()
  }
  }, [userID, setState, user])

  const handleChange = (e) => {
    setState((oldState) => ({
      ...oldState,
      [e.target.name]: e.target.value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await updateProfile(state, state.id)
      navigate(`/profile/${state.id}`)
    } catch(error) {
      alert(error.message)
    }
  }

  return (
    <div>
      { user ?
      user.id === parseInt(userID) ?
      (state) && 
      <form onSubmit={handleSubmit}>
        <Input
        type="text"
        label="First Name"
        name="first_name"
        value={state.first_name}
        handleChange={handleChange}
        placeholder="First Name"
        />
        <Input
        type="text"
        label="Last Name"
        name="last_name"
        value={state.last_name}
        handleChange={handleChange}
        placeholder="Last Name"
        />
        <Input
        type="text"
        label="Username"
        name="username"
        value={state.username || ""}
        handleChange={handleChange}
        placeholder="Username"
        />
        <Input 
        name="bio"
        value={state.bio || ""}
        handleChange={handleChange}
        label="Bio"
        />
        <Button text="SUBMIT" />
      </form>
      : <ErrorMessage error="authorization-error" text="UNAUTHORIZED ACTION"/>
      : <ErrorMessage error="authorization-error" text="YOU ARE NOT LOGGED IN" />
      }
    </div>
  )
}

export default ProfileEditPage