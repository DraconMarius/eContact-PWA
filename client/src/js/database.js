// TODO: Install the following package:
import { openDB } from 'idb';

// TODO: Complete the initDb() function below:
const initdb = async () => {
    //connect to todosDB
    openDB('contactDB', 1, {
        upgrade(db) {
            if (db.objectStoreNames.contains('contactDB')) {
                console.log(`contactDB already exists`);
                return;
            }
            db.createObjectStore('contactDB', { keyPath: 'id', autoIncrement: true });
            console.log('created contactDB')
        },
    });
};


// TODO: Complete the postDb() function below:
export const postDb = async (name, home, cell, email) => {
    const contactDB = await openDB('contactDB', 1);
    const tx = contactDB.transaction('contactDB', 'readwrite');
    const store = tx.objectStore('contactDB');
    const request = store.add(
        {
            contact: {
                name: name,
                home_phone: home,
                cell_phone: cell,
                email: email,
            },
        });
    const result = await request;
    console.log(`Sucessfully added new contact`)
};

// TODO: Complete the getDb() function below:
export const getDb = async () => {
    const contactDB = await openDB('contactDB', 1);
    const tx = contactDB.transaction('contactDB', 'readonly');
    const store = tx.objectStore('contactDB');
    const request = store.getAll();
    const result = await request;
    console.log('all contact info:', result);
    return result;
};

// TODO: Complete the deleteDb() function below:
export const deleteDb = async (id) => {
    const contactDB = await openDB('contactDB', 1);
    const tx = contactDB.transaction('contactDB', 'readwrite');
    const store = tx.objectStore('contactDB');
    const request = store.delete(id);
    const result = await request;
    console.log('all contact info after delete', result);
    return result;
};

initdb();
