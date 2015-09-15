//var Hello = React.createClass({
//    render: function () {
//        console.log(this.props);
//        return React.createElement("div", null, "Hello, " + this.props.name + "!");
//    }
//});
//$(document).ready(function () {
//    React.render(
//        React.createElement(Hello, {name: "Drew"}),
//        document.getElementById('articles')
//    );
//});

var LikeArticle = React.createClass({
    render: function () {
        if (this.state.isLiked) {
            return React.createElement("div", {onClick: this.handleClick}, "Unlike Me!");
        } else {
            return React.createElement("div", {onClick: this.handleClick}, "Like Me!");
        }
    },
    handleClick: function () {
        var method = this.state.isLiked ? "DELETE" : "POST";
        $.ajax({
            url: '/articles/' + this.props.articleID + "/likes",
            type: method,
            success: function (response) {
                this.setState({isLiked: response.liked});
            }.bind(this)
        });
    },
    getInitialState: function () {
        return {isLiked: this.props.initialIsLiked};
    }
});

$(document).ready(function () {
    $(".like-article").each(function (index, element) {
        var props = {
            initialIsLiked: $(element).data("initial-is-liked"),
            articleID: $(element).data("article-id")
    };
    React.render(
        React.createElement(LikeArticle, props),
        element
    );
});
});
