import React, { useReducer, useContext } from 'react';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import axios from 'axios';
import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  SET_ALERT,
  REMOVE_ALERT,
  SET_LOADING,
  CONTACT_ERROR,
  CLEAR_CONTACTS
} from '../types';

const ContactState = props => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null,
    loading: false
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // GET CONTACTS
  const getContacts = async () => {
    try {
      setLoading();
      const res = await axios.get('/api/contacts/');
      dispatch({
        type: GET_CONTACTS,
        payload: res.data
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.data
      });
    }
  };

  // ADD CONTACT
  const addContact = async contact => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      setLoading();
      const res = await axios.post('/api/contacts/', contact, config);
      dispatch({ type: ADD_CONTACT, payload: res.data });
    } catch (err) {
      console.log(err);
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.data
      });
    }
  };

  // DELETE CONTACT
  const deleteContact = async id => {
    try {
      setLoading();
      const res = await axios.delete(`/api/contacts/${id}/`);
      console.log(res);
      dispatch({ type: DELETE_CONTACT, payload: id });
    } catch (err) {
      console.log(err);
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.data
      });
    }
  };
  // UPDATE CURRENT CONTACT
  const updateContact = async contact => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      setLoading();
      const res = await axios.put(
        `/api/contacts/${contact.id}/`,
        contact,
        config
      );
      dispatch({ type: UPDATE_CONTACT, payload: contact });
    } catch (err) {
      console.log(err);
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.data
      });
    }
  };
  // SET CURRENT CONTACT
  const setCurrent = contact => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };
  // CLEAR CONTACTS
  const clearContacts = () => {
    dispatch({ type: CLEAR_CONTACTS });
  };
  // CLEAR CURRENT CONTACT
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // FILTER CONTACTS
  const filterContacts = text => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };
  // CLEAR FILTER
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };
  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });
  // RETURN
  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        loading: state.loading,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
        getContacts,
        clearContacts
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
