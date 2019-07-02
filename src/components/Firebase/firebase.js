import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import algoliasearch from 'algoliasearch';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);

    /* Helper */

    this.serverValue = app.database.ServerValue;
    this.emailAuthProvider = app.auth.EmailAuthProvider;

    /* Firebase APIs */

    this.auth = app.auth();
    this.db = app.database();

    /* Social Sign In Method Provider */

    this.googleProvider = new app.auth.GoogleAuthProvider();

    // configure algolia
    const algolia = algoliasearch(
      process.env.REACT_APP_ALGOLIA_APP_ID,
      process.env.REACT_APP_ALGOLIA_API_KEY,
    );
    const index = algolia.initIndex(
      process.env.REACT_APP_ALGOLIA_INDEX_NAME,
    );

    index.setSettings(
      {
        searchableAttributes: [
          'firstName',
          'lastName',
          'company',
          'jobTitle',
          'phoneNumber',
          'email',
          'url',
        ],
      },
      (err, content) => {
        console.log(content);
      },
    );

    const contactsRef = this.db.ref('/contacts');

    const addOrUpdateIndexRecord = contact => {
      // Get Firebase object
      const record = contact.val();
      // Specify Algolia's objectID using the Firebase object key
      record.objectID = contact.key;
      // Add or update object
      index
        .saveObject(record)
        .then(() => {
          console.log(
            'Firebase object indexed in Algolia',
            record.objectID,
          );
        })
        .catch(error => {
          console.error(
            'Error when indexing contact into Algolia',
            error,
          );
          process.exit(1);
        });
    };

    const deleteIndexRecord = ({ key }) => {
      // Get Algolia's objectID from the Firebase object key
      const objectID = key;
      // Remove the object from Algolia
      index
        .deleteObject(objectID)
        .then(() => {
          console.log(
            'Firebase object deleted from Algolia',
            objectID,
          );
        })
        .catch(error => {
          console.error(
            'Error when deleting contact from Algolia',
            error,
          );
          process.exit(1);
        });
    };

    contactsRef.on('child_added', addOrUpdateIndexRecord);
    contactsRef.on('child_changed', addOrUpdateIndexRecord);
    contactsRef.on('child_removed', deleteIndexRecord);
  }

  // *** Auth API ***

  doSignInWithGoogle = () =>
    this.auth.signInWithPopup(this.googleProvider);

  doSignOut = () => this.auth.signOut();

  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
    });

  // *** Merge Auth and DB User API *** //

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val();

            // // default empty roles
            // if (!dbUser.roles) {
            //   dbUser.roles = {};
            // }

            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser,
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });

  // *** User API ***

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');

  // *** Message API ***

  contact = uid => this.db.ref(`contacts/${uid}`);

  contacts = () => this.db.ref('contacts');
}

export default Firebase;
