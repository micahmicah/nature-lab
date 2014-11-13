var React = require('react');
var Top = require('_includes/Top.jsx');
var Script = require('_includes/Script.jsx');
var Footer = require('_includes/Footer.jsx');
var Nav = require('_includes/Nav.jsx');

var moment = require('moment');

var NewsEntry = React.createClass({
    render: function () {
        var data = this.props.data;
        var date = moment(data.date)
            .format("MMMM D YYYY");
        var tags = data.tags.map(function (d) {
            return (<span><a href="meta-link">{d}</a> </span>);
        });

        return (<div className="news-entry ten columns offset-by-three">
                <h2 className="news-headline">News Story</h2>
                <article className="news-story"
                    dangerouslySetInnerHTML={{__html: data.body}}>
                    
                </article>

                <div className="news-meta-data">
                    <img className="news-author-portrait two columns" src="/static/img/neal.jpg" />
                    <ul>
                        <li>posted by: <a className="meta-link" href="#">No post author exposed.</a></li>
                        <li>posted on: <a href="meta-link">{date}</a></li>
                        <li>filed under: {tags}</li>
                    </ul>
                </div>
            </div>);
    }
});

module.exports = React.createClass({
    render: function () {
        var data = this.props.data;
        var url = data.filter(function (d) {
                return d.type === 'requestUrl';
            })
            .map(function (d) {
                return d.requestUrl;
            })
            .pop();

        var news = data.filter(function (d) {
                return d.type === 'news';
            })
            .map(function (d) {
                return (<NewsEntry data={d} />);
            });

        return (<html>
            <Top />
            <body>
                <Nav url={url}/>
                
                <div className="container">
                	<div className="ten columns offset-by-three">
                		<input type="search" name="blog-search" />
                		<input type="submit" name="search" />
                	</div>

                	{news}
                </div>

                <Footer />
            </body>
            <Script />
            </html>);
    }
});