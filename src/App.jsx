// react firebase blogpost app (crud demo)
//----------------------------------------------------------------------------------
// 4/0AeaYSHDfyRWcp5ESj62SgnRJNqAJhhmq-PujzwCHE-IGVX2Lf_O2OIPvmO730Ce9r25NUQ
import "./styles.css";
import { auth, provider, db } from "../src/firebasebkend";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom"; //
import { signInWithPopup } from "firebase/auth"; // for login pg2
import { signOut } from "firebase/auth"; // for logout navbar
import {
  addDoc, // to add data in firebase cloud pg3
  collection, // access the collection created in firebase db
  getDocs, // get the data frm the collection n display in homepage
  deleteDoc, //  delete using deleteDoc,
  doc, //  doc used to access n delete indivisual data(id) frm the collection
} from "firebase/firestore";
import { useState, useEffect } from "react";
export default function App() {
  // const [isAuth, setIsAuth] = useState(false); // passing setisauth as prop to login page
  const [isAuth, setIsAuth] = useState(localStorage.getItem("user"));
  // now even when u refresh, it will be logged in means if user doesntexist in memory/not loggrfin/ logged out{ in navbar-> localStorage.removeItem("user");}, it will return false on "" empty str
  //-----------------------------------------------------------------------------------------------------
  // console.log("auth is : ", auth);
  /*   o/p-->>
  auth is :  
Object { app: {…}, heartbeatServiceProvider: {…}, appCheckServiceProvider: {…}, config: {…}, currentUser: null, emulatorConfig: null, operations: Promise { "pending" }, authStateSubscription: {…}, idTokenSubscription: {…}, beforeStateQueue: {…}, … }
  */
  return (
    <div className="App">
      <Router>
        <div>
          <Navbar isAuth={isAuth} setIsAuth={setIsAuth} />
          <hr />
          <Routes>
            <Route path="/" element={<Page1 isAuth={isAuth} />} />
            <Route path="/Page2" element={<Page2 setIsAuth={setIsAuth} />} />
            <Route path="/Page3" element={<Page3 isAuth={isAuth} />} />
            <Route path="/Page4" element={<Page4 />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}
//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------

//------components(create indivisual modules for each and import in app.js instead of doing like this all in one page)---------------------------------------------------------------------------------
function Navbar(props) {
  let navigate = useNavigate();
  function logoutt() {
    signOut(auth)
      .then(() => {
        props.setIsAuth(false);
        localStorage.removeItem("user");
        console.log("logout success");
        navigate("/Page2"); // redirect to login page after logout
      })
      .catch((error) => {
        alert("logout error: ", error);
      });
  }
  return (
    <nav>
      <NavLink to="/">⚛Home</NavLink>
      {!props.isAuth ? (
        <NavLink to="/Page2">⚛Login</NavLink>
      ) : (
        <button id="lgotbtn" onClick={logoutt}>
          ⚛Log Out
        </button>
      )}
      {props.isAuth && <NavLink to="/Page3">⚛CreatePost</NavLink>}
      <NavLink to="/Page4">⚛About</NavLink>
    </nav>
  );
}
// //--------------------------------------------------------------------------
function Page1({ isAuth }) {
  // homepage
  const [dta, setDta] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(10);

  useEffect(() => {
    // this useEffect will immidiatly run once on page load(empty [] dependency array) and load data frm database collection posts and set the state setDta with data
    async function getPosts() {
      const postcollectiondb = collection(db, "posts");
      const data = await getDocs(postcollectiondb);
      // console.log(
      //   "data: ",
      //   data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      // );
      setDta(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))); // using spread operator to take all the prev data in array obj and add id
      setLoading(false);
    }
    getPosts();
  }, []);

  //   // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = dta.slice(indexOfFirstPost, indexOfLastPost);
  // console.log(currentPosts);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  async function delpost(id) {
    // delete using deleteDoc, "doc" specifies which doc u wanna delete
    // doc takes 3 args- db, collection name and doc id u want to delete
    const doctodel = doc(db, "posts", id); // we recieve id frm dta obj, each post has a post id as a key in dta.map((post) that we can pass via button onClick={()=>delpost(post.id)}
    await deleteDoc(doctodel);
    alert("post deleted");
    //---------------------------------------------------------------------------------------------------------
    async function getPostsafterdel() {
      // re-render the page after post deleted so updated list visible
      const postcollectiondb = collection(db, "posts");
      const data = await getDocs(postcollectiondb);
      setDta(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))); // using spread operator to take all the prev data in array obj and add id
    }
    getPostsafterdel();
    //---------------------------------------------------------------------------------------------------------------------------------------
    // also, we only wants logged in users to be able to delete any post, and person can only delete post created by them not other users so we apply condition on delete btn(like we did in navbar)
    // in pg3, createpost, we updated posts in db with various parameters like title, post, author(name, email, uid), so we use uid (pg3-> id: auth.currentUser.uid) to check if if user logged in(isAuth=true) and post user id = current user then only show the delete button
    // so->> {isAuth && post.author.id===auth.currentUser.uid && <btn>}
  }
  return (
    <div>
      <h1>🥸 BlogPost Home ☺</h1>
      <hr />
      <b id="pppip2">Total Posts: {dta.length}</b>
      <br />
      <label id="pppip">PostPerPage :</label>
      <input
        id="pppip"
        value={postsPerPage}
        onChange={(e) => setPostPerPage(e.target.value)}
      />
      <hr />
      {loading && (
        <>
          <h1 id="ld">Loading...</h1>
          <hr />
        </>
      )}

      <div id="otdv">
        {/* {dta.map((post) => ( // this will display all the posts without pagination logic instead we use currentpost slice that will display 10 posts per page */}
        {currentPosts.map((post) => (
          <div id="indv" key={post.id}>
            <h2 id="ttl">{post.title} </h2>
            <p id="pst">
              {post.post}
              <br />
              {post.dttm}
            </p>
            <b id="ath">{post.author?.name}</b>
            <br />
            <i id="ml">
              {isAuth && post.author?.id === auth.currentUser.uid && (
                <button id="dlbtn" onClick={() => delpost(post.id)}>
                  &#128465;
                </button>
              )}
              {post.author?.mail}
            </i>
          </div>
        ))}
        <hr />
        {/* ------pagination-------------------------------------------------------------------- */}
        <button
          id="pgnt"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>{`Page ${currentPage} of ${Math.ceil(
          dta.length / postsPerPage,
        )}`}</span>
        <button
          id="pgnt"
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastPost >= dta.length}
        >
          Next
        </button>
      </div>
      <hr />
    </div>
  );
}
// //--------------------------------------------------------------------------
function Page2({ setIsAuth }) {
  // login page
  let navigate = useNavigate();
  function signInWithGoogle() {
    signInWithPopup(auth, provider) // can use other methods like  redirect, whatever may seem convinient to u
      .then((result) => {
        const user = result.user;
        // console.log("user is : ", user);
        console.log("login success");
        // alert("login success");
        // creating an instance in local storage
        localStorage.setItem("user", JSON.stringify(user));
        // creating an instance in local storage so if user refreshes the page or closes browser n opens back they are still logged in
        setIsAuth(true);
        navigate("/"); // redirect to home after login
      })
      .catch((error) => {
        console.log("error login: ", error);
        // alert("login error: ", error);
      });
  }
  return (
    <div>
      <h1>•ᴗ• Login Page</h1>
      <hr />
      <button id="lgnbtn" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
      <hr />
    </div>
  );
}
//--------------------------------------------------------------------------
function Page3({ isAuth }) {
  // create post page
  let navigate = useNavigate();
  // whenever this page renders, we dont want unauthanticated user to access this page even though they enter address in url for this page "https://twpx9r.csb.app/Page3"
  // so we apply a useEffect that will run once when component mounts {[] empty dependency array} and will check isAuth is true
  useEffect(() => {
    if (!isAuth) {
      navigate("/Page2"); // redirect to login if not auth frm creatpost page
    }
  }, []);

  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");
  // can use try catch to catch error in post creation

  async function submittpost() {
    let dttm = new Date().toLocaleString();
    // start a collection in firebase database
    // goto firestore database
    // start a collection(+), collection popup will open, give it a name "xxxx/posts" and click next, new panel opens n it asks for id, just click on auto and clk save btn n ur collection is created
    // it will automatically create a document in that collection xxxx, a document is the entry to ur table
    // now u have a table in the db that u can add some info to it
    // the function addDoc imorted frm firebase can add that data to this table created
    // make the function async
    // also, in ur firestore dtabse, goto rules and change permission or it wont allow any update to the collection-->> {allow read, write: if false;} false to true
    //-------------------------------
    // adddocs take firestore collection db reference and dta obj
    // now creating the data obj that we will pass in the collection
    try {
      if (!title || !post) {
        alert("enter title and post");
        return;
      } else {
        const postcollectiondb = collection(db, "posts"); // creating a collection in database and passing in the db(getFirestore) and collection name ("posts"/xxxx as we created in firebase database)
        await addDoc(postcollectiondb, {
          title, // title : title
          post, // post : post   // in js when key value pairs of same name, it can be directly written like this
          dttm: dttm,
          author: {
            name: auth.currentUser.displayName,
            id: auth.currentUser.uid,
            mail: auth.currentUser.email,
          },
        });
        //-------------------------------
        // clear the input
        setTitle("");
        setPost("");
        // console.log("post created");
        alert("post created");
        navigate("/Page3");
      }
    } catch (error) {
      alert("error : ", error);
    }
  }
  return (
    <div>
      <h1>📝 Create Post</h1>
      <hr />
      <div id="crpst">
        <label className="crpslb">
          <b>Title</b>
        </label>
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          id="ipar"
          placeholder="title..."
        />
        <br />
        <label className="crpslb">
          <b>Post</b>
        </label>
        <textarea
          onChange={(e) => setPost(e.target.value)}
          value={post}
          id="txar"
          placeholder="post contents..."
        />
        <br />
        <button onClick={submittpost} id="pstbtn">
          Submit Post
        </button>
      </div>
      <hr />
    </div>
  );
}
//--------------------------------------------------------------------------
const Error = () => <h1>ERROR_404_PAGE_NOT_FOUND</h1>;
//------------------------------------------------------------------------------------------------
const Page4 = () => {
  return (
    <div>
      <h1>🧐 About the project</h1>
      <hr />
      <ul>
        <li>This is a Firebase and React blog app (crud demo) project</li>
        <li>
          Cloud Firestore is a NoSQL document database that lets you easily
          store, sync, and query data for your mobile and web apps - at global
          scale.
        </li>
        <li>
          React ⚛️ is the library for web and native user interfaces. Build user
          interfaces out of individual pieces called components written in
          JavaScript.
        </li>

        <li>This project has 3 pages:</li>
        <li>
          Home Page (Page1) - displays a list of blog posts fetched from the
          Firestore database and allows deletion of posts.
        </li>
        <li>Login Page (Page2) - allows users to sign in with Google.</li>
        <li>
          Create Post Page (Page3) - allows authenticated users to create new
          blog posts.
        </li>
        <li>Homepage will render the posts by accessing the firestore db</li>
        <li>User must be logged in to create new post</li>
        <li>
          When user logs in, login option disappears from the navbar and instead
          a log out button appears along with a create post page, user will
          remain logged in unless manually logged out as well, login data stored
          in the device memory itself
        </li>
        <li>
          Create post page can't be accessed unless user logged in even by
          manually entring the address
        </li>
        <li>
          Each new created post stores title, post, date and
          author(name,mail,uid) in the firestore db
        </li>
        <li>
          Logged in user has option to delete a post but only those post which
          they have created otherwise the delete button option disappears from
          the post created by other users, no delete option for non logged in
          user, they can only read the posts
        </li>
        <li>
          All the clickable links and button in navbar, delete post [🗑️], log
          in/log out, pagination(prev/next) and create post buttons will change
          color to red when hovered over
        </li>
        <li>
          There is also pagination logic with default 10 post per page, user can
          set post per page via input box
        </li>
        <li>
          All the code for this project available at <br />
          <a id="ghlink" href="https://github.com/tfml1" target="_blank">
            <b>https://github.com/tfml1</b>
          </a>
          <br />
          <i>(click to open in new window)</i>
          <br />
          If you find this project useful, consider giving it a star ⭐️
        </li>
        <li>
          P.S. : All the posts will have user's username and gmail id so please
          post with caution
        </li>
      </ul>
      <hr />
      <br />
      <span className="sml">⚛⚛⚛⚛⚛</span>
      <br />
      <br />
      <hr />
    </div>
  );
};
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------
//----------------------------------------------------------------------------------------
//
// check out following resource  for following error
// Uncaught (in promise) FirebaseError: Firebase: Error (auth/unauthorized-domain).
// https://dev.to/icyybee/firebase-error-unauthorized-domain-in-deployed-site-50ed
// https://res.cloudinary.com/practicaldev/image/fetch/s--cqClitA4--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/equvjxvo16f00s9nuaot.PNG
// when you want to deploy your website to a custom domain, you need to add that domain to the list of authorized domains in the Firebase Console. By white-listing your custom domain, you can ensure that your website is accessible only through authorized domains and improve the security of your data.
/*
https://support.google.com/firebase/answer/6400741
Set a web app's OAuth redirect domains
To use Firebase Authentication in a web app, you must whitelist the domains that the Firebase Authentication servers can redirect to after signing in a user.
By default, localhost and your Firebase project's hosting domain are whitelisted. You must whitelist the full domain names of any other of your web app's hosts. Note: whitelisting a domain allows for requests from any URL and port of that domain.
*/
//-------------------------------------------------------------------------------------------------
// https://emojidb.org -> for emojis
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------

/*
Set up a new React project using create-react-app.
Install necessary dependencies: Firebase, React Router DOM, and Firebase tools.
Create a Firebase project in the Firebase console and enable Google authentication.
Initialize Firestore database in the Firebase console.
Configure Firebase in your project by creating a firebase.js or firebaseBackend.js file.
Set up routing using BrowserRouter, Routes, and Route components in App.js.
Create a state variable isAuth and initialize it with the user data from local storage.
Create a Navbar component and pass isAuth and setIsAuth as props.
Implement navigation links and conditional rendering based on user authentication status.
Add login and logout functionality using Firebase signInWithPopup and signOut methods.
Create a Page1 component (Home Page) to display a list of blog posts fetched from Firestore.
Use useEffect hook to fetch data from Firestore when the component mounts.
Use getDocs method to retrieve all documents from the posts collection in Firestore.
Map through the fetched data and display each post with its title, content, and author details.
Implement pagination logic to display a limited number of posts per page.
Add delete functionality for posts using Firebase deleteDoc method and show an alert for confirmation.
Create a Page3 component (Create Post Page) to add new blog posts.
Use useEffect hook to check user authentication and redirect to the Login Page if the user is not authenticated.
Add input fields for title and post content, and handle form submission to create a new post.
Use Firebase addDoc method to add a new document to the posts collection in Firestore.
Add error handling for all Firebase operations using try-catch blocks.
// Implement a loading state to show a loading indicator while data is being fetched from Firestore.
Add navigation links to other pages (e.g., About Page) in the Navbar component.
Use CSS to style the application and improve the user interface.
 */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//-------------//
//  give a ⭐️  //
//-------------//
//
