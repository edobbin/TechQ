import React, { Component } from 'react';
import { collection, getDocs, query, where, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Q_APostComponent from './Q_APostComponent';
import QuestionCard from './QuestionCard';
import QuestionSubmitComponent from './QuestionSubmitComponent';

class Q_APostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      currentPage: 1,
      postsPerPage: 10,
      creatingNewPost: false,
      newPostData: null
    };
    this.handleCreatePost = this.handleCreatePost.bind(this);
    this.finalizePostCreation = this.finalizePostCreation.bind(this);
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

  handleCreatePost = () => {
    this.setState({ creatingNewPost: true, newPostData: null });
  };
  

  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  finalizePostCreation = (questionObject, postDuration) => {
    const uniquePostID = Math.random().toString(36).substr(2, 9); // Random ID
  
    const newPostInitialState = {
      questionStruct: [new QuestionCard(questionObject), questionObject], // Filled with user input
      submissions: [], // Initially empty submissions
      qaPostID: uniquePostID, // Random ID
      postDuration: postDuration, // User-defined post duration
      postExpirationDateTime: null // Calculate based on postDuration
    };
  }

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
              {/* <button onClick={this.handleCreatePost}>Create Post</button> */}
            </div>
          );
    }

    return currentPosts.map((post, index) => (
      <Q_APostComponent key={index} question={post.question} answers={post.answers} />
    ));
  };

  render() {
    const { currentPage, postsPerPage, posts, creatingNewPost, newPostData } = this.state;

    return (
        <div className="q-a-post-list">
        {creatingNewPost ? (
            <>
            <QuestionSubmitComponent onQuestionSubmit={(questionObject) => this.finalizePostCreation(questionObject, /* postDuration from user input */)}/>
            {/* Add post duration input field here */}
            </>
        ) : (
            <>
            {this.renderPosts()}
            {/* ... existing pagination and other UI elements ... */}
            <button onClick={this.handleCreatePost}>Create Post</button>
            </>
        )}
        </div>
     );
    }

}

export default Q_APostList;