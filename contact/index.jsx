var React = require('react');
var Top = require('_includes/Top.jsx');
var Script = require('_includes/Script.jsx');
var Footer = require('_includes/Footer.jsx');
var Nav = require('_includes/Nav.jsx');

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

        return (<html>
            <Top />
            <body className="section-contact">
                <Nav url={url}/>
                
                <div className="container contact">
                    <div className="six columns offset-by-three">
                        <p>Donec hendrerit euismod nisi a sodales. Proin eleifend condimentum interdum. Etiam dolor est, eleifend sed purus vel, consequat malesuada urna.</p>
                        <p>To inquire about programming contact:<br/> <strong>Neal Overstrom</strong><br/> 
                        <a href="mailto:noverstr@risd.edu"><strong>noverstr@risd.edu</strong></a></p>
                        <p>Facilities and operating questions:<br/>
                        <strong>Betsy Ruppa</strong><br/>
                        <a href="mailto:bruppa@risd.edu"><strong>bruppa@risd.edu</strong></a></p>
                    </div>
                    <div className="five columns">
                        <h2>Location</h2>
                        <p>13 Waterman Street<br/> Providence RI 02903</p>

                        <h2>Hours</h2>
                        <p>Monday–Friday: 8am–10pm</p>
                    </div>
                </div>

                <Footer />
            </body>
            <Script />
            </html>);
    }
});