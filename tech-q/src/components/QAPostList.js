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

  fetchTopAnswer = (post) => {
    return post.findTopAnswer();
  };

  async componentDidMount() {
    const posts = await this.fetchPosts();
    this.setState({ posts });
  }

  fetchPosts = async () => {
    const snapshot = await getDocs(collection(db, 'qapost'));
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return new Post(data);
    });
  };

  render() {
    return (
      <div>
        {this.state.posts.map((post, index) => {
          const topAnswer = this.fetchTopAnswer(post.submissions);

          return (
            <div key={index} className="post-preview">
              <QuestionCard question={post.questionStruct} />
              {topAnswer !== "No answers yet. Post an answer" ? (
                <>
                  <AnswerCard answer={topAnswer} />
                  <div>Answers: {post.submissions.length}</div>
                </>
              ) : (
                <div className="no-answers">
                  {topAnswer}
                </div>
              )}
            </div>
          );
        })}
        <button onClick={this.handleCreatePost}>Create Post</button>
      </div>
    );
  }

}

export default QAPostList;