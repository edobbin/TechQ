import React, { Component } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import Post from './QAPost';
import QuestionCard from './QuestionCard';
import AnswerCard from './AnswerCard';

class QAPostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  handleCreatePost = () => {
    this.props.navigate('/create-post');
  };

  async componentDidMount() {
    const posts = await this.fetchPosts();
    this.setState({ posts });
  }

  fetchPosts = async () => {
    const snapshot = await getDocs(collection(db, 'qapost'));
    return snapshot.docs.map(doc => {
      const data = doc.data();
      // Assuming each document contains the necessary fields to create a Post object
      return new Post(data);
    });
  };
  render() {
    return (
      <div>
        {this.state.posts.map((post, index) => (
          <div key={index} className="post-preview">
            <QuestionCard question={post.questionStruct} />
            {this.findTopAnswer(post.submissions)}
            {/* Display the number of answers */}
            <div>Answers: {post.submissions.length}</div>
          </div>
        ))}
        <button onClick={this.handleCreatePost}>Create Post</button>
      </div>
    );
  }

}

export default QAPostList;