var React = require('react');
var Top = require('_includes/Top.jsx');
var Script = require('_includes/Script.jsx');
var Footer = require('_includes/Footer.jsx');
var Nav = require('_includes/Nav.jsx');

var moment = require('moment');

var Pagination = React.createClass({
    render: function () {
        var data = this.props.data;
        
        var prevClass = data.prev ? '' : 'hidden';
        var prevLink = "/news/page/" + data.prevPage;

        var nextClass = data.next ? '' : 'hidden';
        var nextLink = "/news/page/" + data.nextPage;

        return (
            <div className="news-pagination ten columns offset-by-three">
                <p><a href={prevLink}
                       className={prevClass}
                       >Previous</a></p>
                <p><a href={nextLink}
                      className={nextClass}>Next</a></p>
            </div>);
    }
});

var NewsEntry = React.createClass({
    render: function () {
        var data = this.props.data;
        var date = moment(data.date)
            .format("MMMM D YYYY");
        var author = data.post_author
            .split('-')
            .map(function (d) {
                return d.substring(0, 1).toUpperCase() +
                       d.substring(1, d.length);
            })
            .join(' ');
        var tags = data.tags.map(function (d) {
            return (<span><a href="meta-link">{d}</a> </span>);
        });
        var avatar = 'http://api.tumblr.com/v2/blog/' +
            data.post_author + '.tumblr.com/avatar';

        var link = '/news/post/' + data.slug + '/' + data.id;

        return (<div className="news-entry ten columns offset-by-three">
                <h2 className="news-headline"><a href={link}>{data.title}</a></h2>
                <article className="news-story"
                    dangerouslySetInnerHTML={{__html: data.body}}>
                    
                </article>

                <div className="news-meta-data">
                    <img className="news-author-portrait two columns" src={avatar} />
                    <ul>
                        <li>posted by: <a className="meta-link" href="#">{author}</a></li>
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

        var pagination = data.filter(function (d) {
                return d.type === 'pagination';
            })
            .map(function (d) {
                return (<Pagination data={d} />);
            });

        return (<html>
            <Top />
            <body className="section-news">
                <Nav url={url}/>
                
                <div className="container">
                	<div className="ten columns offset-by-three">
                		<input type="search" name="blog-search" />
                		<input type="submit" name="search" />
                	</div>

                	{news}
                    {pagination}
                </div>

                <Footer />
            </body>
            <Script />
            </html>);
    }
});