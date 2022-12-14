import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { myUserProfile } from '../../utils/userService'
import { getUserEvent } from '../../utils/eventService'
import { getJoinedEvents } from '../../utils/eventService'
import useUser from "../../hooks/userUser"

import ErrorMessage from "../../components/ErrorMessage/ErrorMessage"
import EventCard from "../../components/EventCard/EventCard"
import ProfileCardInfo from "../../components/ProfileInfoCard/ProfileCardInfo"
import Tab from '../../components/Tab/Tab'
import "./ProfilePage.css"

function ProfilePage() {

  const [joinedEvents, setJoinedEvents] = useState()

  const { user } = useUser()
  
  let userID = null

  const paramID = parseInt(useParams().userID)

  const [currentUser, setCurrentUser] = useState()
  const [events, setEvents] = useState()

  if (user) {
    userID = user.id
  }

  useEffect(() => {
    if (user) {
    async function getUserInfoAndEvents() {
      const theUser = await myUserProfile(paramID)
      setCurrentUser(theUser)
      const events = await getUserEvent(paramID)
      setEvents(events)
    }
    async function getAlJoinedEvents() {
      const userJoinedEvents = await getJoinedEvents(userID)
      setJoinedEvents(userJoinedEvents)
    }
    getUserInfoAndEvents()
    getAlJoinedEvents()
  }
  }, [userID, user, paramID])

  return (
    <>
    {
      user ? 
      currentUser ?
      <>
        <ProfileCardInfo user={currentUser} userID={userID} paramID={paramID} />
        {userID === parseInt(paramID) ? 
        <Tab events={events} joinedEvents={joinedEvents}/> : 
        <div className='user-events-container'>
        {
        events &&
        events.length !== 0 ? (
        events.map((event) => {
          return <EventCard 
                  key={event.id} 
                  eventID={event.id}
                  name={event.name} 
                  description={event.description}
                  date={event.date}
                  />
        }))
        :
        <div className='no-event-container'>
          <p>
            No Events
          </p>
        </div>
        }
        </div>
        }
      </>
      : <ErrorMessage error="authorization-error" text="USER DOES NOT EXIST" />
      : <ErrorMessage error="authorization-error" text="YOU ARE NOT LOGGED IN"/>
    }
    </>
  )
}

export default ProfilePage