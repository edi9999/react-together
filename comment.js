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
            <div class="comment">
              <b>{this.props.author}</b> wrote &nbsp;
              <Timer start={this.props.createDate}/>
              <p>{this.props.text}</p>
            </div>
        );
    }
});

var CommentList = React.createClass({
    render:function(){
        var commentNodes = this.props.comments.map(function (comment) {
          return (
            <Comment
                author={comment.author}
                text={comment.text}
                createDate={comment.createDate}
            />
          );
        });

        return (
          <div className="commentList">
            {commentNodes}
          </div>
        );
    }
 });

var CommentForm = React.createClass({
    render:function(){
        return (
          <input type="submit" value="Envoyer" onClick={this.props.addComment}/>
        );
    }
 });

var comments_list = [{
  author: "John Doe", text:"Hello Mary, how are you ?", createDate: moment().subtract(15, 'minutes')
},{
  author: "Mary ", text:"I'm fine thank you, and you ?", createDate: moment().subtract(8, 'minutes')
},{
  author: "John Doe ", text:"I'm fine too. See you later", createDate: moment().subtract(2, 'minutes')
},{
  author: "Mary", text:"See you :-)", createDate: moment().subtract(43, 'seconds')
}
]

var cl = function () {
  alert('Youpiii');
}

ReactDOM.render(
  <div>
  <CommentList comments={comments_list}/>
  <CommentForm addComment={cl} />
  </div>,
  document.getElementById('container')
);
