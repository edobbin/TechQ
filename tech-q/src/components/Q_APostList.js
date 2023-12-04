import React, { Component } from 'react';
import { collection, getDocs, query, where, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Q_APostComponent from './Q_APostComponent';
import QuestionCard from './QuestionCard';

class Q_APostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      currentPage: 1,
      postsPerPage: 10,
      creatingNewPost: false
    };
    this.handleCreatePost = this.handleCreatePost.bind(this);
  }

  async componentDidMount() {
    await this.fetchPosts();
  }

  fetchPosts = async () => {
    try {
      const q = query(collection(db, "qapost")); // Querying the qapost collection
      const querySnapshot = await getDocs(q);
      let posts = [];
  
      for (const doc of querySnapshot.docs) {
        const postData = doc.data(); // Assuming postData contains question and answers
        posts.push(postData); // Pushing the entire post data
      }
  
      this.setState({ posts });
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
  };

  handleCreatePost = async () => {
    const uniquePostID = Math.random().toString(36).substr(2, 9); // Random ID
  
    // Create an initial empty structure for the new Q_APostComponent instance
    const newPostInitialState = {
        questionStruct: [new QuestionCard({}), {}], // Empty initial data
        submissions: [], // Empty submissions
        qaPostID: uniquePostID, // Random ID
        postDuration: null,
        postExpirationDateTime: null // To be set by the user
    };
  
    try {
      // Save the new post to Firebase
      const docRef = await addDoc(collection(db, "qapost"), {
        // Structure the document as needed for Firebase
        qaPostID: uniquePostID,
        question: {}, // Representing an empty question
        answers: [], // Initially no answers
        postDuration: null,
        postExpirationDateTime: null
      });
  
      // Update the local state to switch to post creation mode and pass the initial data
      this.setState({ 
        creatingNewPost: true,
        newPostData: { ...newPostInitialState, qaPostID: docRef.id } // Include the Firebase-generated ID
      });
    } catch (error) {
      console.error("Error creating new post in Firebase:", error);
    }
  };

  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  renderPosts = () => {
    const { currentPage, postsPerPage, posts } = this.state;
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    // Check if there are one or no posts
    if (posts.length <= 1) {
        return (
            <div>
              <div>No Questions Yet. Ask away.</div>
              <button onClick={this.handleCreatePost}>Create Post</button>
            </div>
          );
    }

    return currentPosts.map((post, index) => (
      <Q_APostComponent key={index} question={post.question} answers={post.answers} />
    ));
  };

  render() {
    const { currentPage, postsPerPage, posts, creatingNewPost } = this.state;
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <div className="q-a-post-list">
        {creatingNewPost ? (
          <Q_APostComponent initialData={0} />
        ) : (
          <>
            {this.renderPosts()}
            <div className="pagination">
              {pageNumbers.map(number => (
                <button key={number} onClick={() => this.handlePageChange(number)}>
                  {number}
                </button>
              ))}
            </div>
            <button onClick={this.handleCreatePost}>Create Post</button>
          </>
        )}
      </div>
    );
  }
}

export default Q_APostList;