import { getToken } from "../utils/tokenService";

const BASE_URL = "https://eventech-backend.herokuapp.com/api/events/";

const getEvents = async (name) => {
  try {
    let res = await fetch(BASE_URL + `?name=${name}`);
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const createEvent = async (event) => {
  try {
    const token = getToken();
    let res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(event),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const getSingleEvent = async (eventID) => {
  try {
    let res = await fetch(BASE_URL + eventID + "/");
    if (res.status === 404) {
      return null;
    } else {
      return res.json();
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteEvent = async (eventID) => {
  try {
    const token = getToken();
    let res = await fetch(BASE_URL + eventID + "/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + token,
      },
    });
    return res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    console.log(error);
  }
};

const updateEvent = async (event, eventID) => {
  try {
    const token = getToken();
    let res = await fetch(BASE_URL + eventID + "/", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(event),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const getUserEvent = async (userID) => {
  try {
    let res = await fetch(BASE_URL + "user/" + userID + "/");
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const addParticipant = async (eventID) => {
  try {
    const token = getToken();
    let res = await fetch(BASE_URL + eventID + "/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + token,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const getJoinedEvents = async (userID) => {
  try {
    let res = await fetch(BASE_URL + "joined/" + userID + "/");
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const cancelEventParticipation = async (eventID) => {
  try {
    const token = getToken();
    let res = await fetch(BASE_URL + "joined/" + eventID + "/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + token,
      },
    });
    return res.json({ message: "Successfully cancelled participation" });
  } catch (error) {
    console.log(error);
  }
};

export {
  getEvents,
  createEvent,
  getSingleEvent,
  deleteEvent,
  updateEvent,
  getUserEvent,
  addParticipant,
  getJoinedEvents,
  cancelEventParticipation,
};
