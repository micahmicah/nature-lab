var React = require('react');
var Top = require('_includes/Top.jsx');
var Script = require('_includes/Script.jsx');
var Footer = require('_includes/Footer.jsx');
var Nav = require('_includes/Nav.jsx');

var Intro = require('_includes/homepage/intro.jsx');
var NewsTicker = require('_includes/homepage/newsTicker.jsx');
var FloodMicroscope = require('_includes/homepage/imageFloodMicroscope.jsx');
var ExtendedIntro = require('_includes/homepage/extendedIntro.jsx');
var PullQuote = require('_includes/homepage/pullQuote.jsx');
var FloodTanks = require('_includes/homepage/imageFloodTanks.jsx');
var Variety = require('_includes/homepage/extendedVariety.jsx');
var Collage = require('_includes/homepage/collage.jsx');
var FloodBoneRoom = require('_includes/homepage/imageFloodBoneRoom.jsx');
var Contrary = require('_includes/homepage/extendedContrary.jsx');
var FloodMicroscopeRoom = require('_includes/homepage/imageFloodMicroscopeRoom.jsx');


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

		var newsTickerItems = data.filter(function (d) {
				return d.type === 'newsTickerItem';
			});

		return (<html>
			<Top />
			<body className="section-index">
				<Nav url={url}/>

				<Intro />
				<NewsTicker data={newsTickerItems}/>
				<FloodMicroscope />
				<ExtendedIntro />
				<PullQuote />
				<FloodTanks />
				<Variety />
				<Collage />
				<FloodBoneRoom />
				<Contrary />
				<FloodMicroscopeRoom />
				<Footer />
			</body>
			<Script />
			</html>);
	}
});