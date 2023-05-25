// import { initializeApp } from 'firebase/app'
// import { getDatabase } from 'firebase/database'
// // import {database} from 'firebase/compat/database'

import "firebase/database";
import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";

const apiKey = process.env.REACT_APP_API_KEY;
const databaseURL = process.env.REACT_APP_DATABASE_URL;

const firebaseApp = initializeApp({
  apiKey: apiKey,
  authDomain: 'catch-of-the-day-85dbc.firebaseapp.com',
  databaseURL: databaseURL,
})

const base = getDatabase(firebaseApp)

export default firebaseApp
export { base }
