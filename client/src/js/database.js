import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

  // hn
// : Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // Create a connection to the database database and version we want to use.
const jateDb = await openDB('jate', 1);

// Create a new transaction and specify the database and data privileges.
const tx = jateDb.transaction('jate', 'readwrite');

// Open up the desired object store.
const store = tx.objectStore('jate');

// Use the .add() method on the store and pass in the content.
 const request = store.add({ id:1, value: content});

// Get confirmation of the request.
const result = await request;
console.log(' Wahoo! The Data has been saved', result);
}


// hn

// : Add logic for a method that gets all the content from the database
export const getDb = async () => { 
  // Create a connection to the database database and version we want to use.
  const jateDB = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = jateDB.transaction('jate', 'readonly');

  // Open up the desired object store.
  const store = tx.objectStore('jate');

  // Use the .getAll() method to get all data in the database.
  const request = store.getAll();

  // Get confirmation of the request.
  const result = await request;

  console.log('You typed:', result);
  if (result.length < 1) {return}
console.log("its working")
  return result.content
};



initdb();
