"use strict";

var Timer = React.createClass({
    getInitialState: function(){
        return { now: moment() };
    },
    componentDidMount:function(){
        setInterval(this.tictac, 1000);
    },
    tictac: function(){
        this.setState({
           now : moment()
        });
    },
    render:function(){
        return(
          <span>
            {this.props.start.from(this.state.now)}
          </span>
        );
    }
 });

var Comment = React.createClass({
    render:function(){
        return(
            <div className="comment">
              <b>{this.props.author}</b> wrote &nbsp;
              <Timer start={this.props.createDate}/>
              <p>{this.props.text}</p>
            </div>
        );
    }
});

var CommentList = React.createClass({
  getInitialState: function(){
      return {
          comments : [
            {
              author: "John Doe", 
              text:"Hello Mary, how are you ?", 
              createDate: moment().subtract(15, 'minutes')
            },{
              author: "Mary ", 
              text:"I'm fine thank you, and you ?", 
              createDate: moment().subtract(8, 'minutes')
            },{
              author: "John Doe ", 
              text:"I'm fine too. See you later", 
              createDate: moment().subtract(2, 'minutes')
            },{
              author: "Mary", 
              text:"See you :-)", 
              createDate: moment().subtract(43, 'seconds')
            }
          ]
      }
    },
    addComment: function(text, author){
      var newComment = [{
        author: author,
        text: text,
        createDate: moment()
      }];
      this.setState({
        comments: this.state.comments.concat(newComment)})
    },
    render:function(){
        var commentNodes = this.state.comments.map(function (comment, index) {
          return (
            <Comment
                author={comment.author}
                text={comment.text}
                createDate={comment.createDate}
                key={index}
            />
          );
        });

        return (
          <div className="commentList">
            {commentNodes}
            <CommentForm onAddComment={this.addComment}/>
          </div>
        );
    }
 });

var CommentForm = React.createClass({
    getInitialState: function(){
      return {
          author : "",
          text : ""
      }
    },
    changeText: function(e){
      this.setState({
           text : e.target.value
      });
    },
    changeAuthor: function(e){
      this.setState({
           author : e.target.value
      });
    },
    addComment: function(e){
      this.props.onAddComment(this.state.text, this.state.author);
      this.setState({
           author : "",
           text: ""
      });
    },
    render:function(){
        return (
          <div>
            <input type="text" placeholder="Name" onChange={this.changeAuthor} value={this.state.author}/>
            <input id="comment" type="text" placeholder="Message" onChange={this.changeText} value={this.state.text} />
            <input type="submit" value="Envoyer" onClick={this.addComment}/>
          </div>
        );
    }
 });


ReactDOM.render(
  <div>
    <CommentList />
  </div>,
  document.getElementById('container')
);
