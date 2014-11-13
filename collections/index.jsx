var React = require('react');
var Top = require('_includes/Top.jsx');
var Script = require('_includes/Script.jsx');
var Footer = require('_includes/Footer.jsx');
var Nav = require('_includes/Nav.jsx');

var IntroPullQuote = React.createClass({
	render: function () {
		return (<div className="pull-quote">
			<div className="container">
				<div className="fourteen columns offset-by-one">
			 		<h3>Nature, the best mentor for design</h3>
		 		</div>
			</div>
		</div>);
	}
});

var Collage = React.createClass({
	render: function () {
		return (<div className="container">
	<div className="collections fourteen columns offset-by-one">
		<div className="collection row">
			<img className="six columns" src="/static/img/collections/preserved/common-redpoll.jpg" />
			<div className="six columns offset-by-one">
				<h3>Preserved Specimens</h3>
				<p>Donec hendrerit euismod nisi a sodales. Proin eleifend condimentum interdum. Etiam dolor est, eleifend sed purus vel, consequat malesuada urna. Proin elementum auctor erat, fringilla lacinia tortor. Quisque pellentesque arcu tortor, sit amet luctus diam semper vel. Donec non tortor sed libero imperdiet facilisis sed id nibh. Donec ullamcorper augue non felis hendrerit tincidunt. Donec sed mauris dolor. </p>
			</div>
		</div>


		<div className="collection row">
			<div className="js-isotope packery-container">
				<div className="item" >
					<a href="/static/img/collections/preserved/falcon-01.jpg"
					   data-lightbox="image-1">
						<img src="/static/img/collections/preserved/falcon-01.jpg" />
					</a>
				</div>

				<div className="item">
					<a href="/static/img/collections/preserved/jay-01.jpg"
					   data-lightbox="image-2">
						<img src="/static/img/collections/preserved/jay-01.jpg" />
					</a>
				</div>

				<div className="item">
					<a href="/static/img/collections/preserved/beetle-01.jpg"
					   data-lightbox="image-3">
						<img src="/static/img/collections/preserved/beetle-01.jpg" />
					</a>
				</div>


				<div className="item w2">
					<a href="/static/img/collections/preserved/geode.jpg"
					   data-lightbox="image-4">
						<img src="/static/img/collections/preserved/geode.jpg" />
					</a>
				</div>
				

				<div className="item">
					<a href="/static/img/collections/preserved/gopher-05.jpg"
					   data-lightbox="image-5">
						<img src="/static/img/collections/preserved/gopher-05.jpg" />
					</a>
				</div>
				
				<div className="item">
					<a href="/static/img/collections/preserved/rock.jpg"
					   data-lightbox="image-6">
						<img src="/static/img/collections/preserved/rock.jpg" className="large-specimen" />
					</a>
				</div>

				<div className="item w2">
					<a href="/static/img/collections/preserved/shell-case-01.jpg"
					   data-lightbox="image-7">
						<img src="/static/img/collections/preserved/shell-case-01.jpg" />
					</a>
				</div>

				<div className="item w4">
					<a href="/static/img/collections/preserved/gator-04.jpg"
					   data-lightbox="image-8">
						<img src="/static/img/collections/preserved/gator-04.jpg" className="large-specimen" />
					</a>
				</div>

				<div className="item">
					<a href="/static/img/collections/preserved/flourite-01.jpg"
					   data-lightbox="image-9">
						<img src="/static/img/collections/preserved/flourite-01.jpg" className="large-specimen" />
					</a>
				</div>

				<div className="item">
					<a href="/static/img/collections/preserved/beetle-02.jpg"
					   data-lightbox="image-10">
					   <img src="/static/img/collections/preserved/beetle-02.jpg" />
					</a>
				</div>

				<div className="item w2">
					<a href="/static/img/collections/preserved/vertabrae-01.jpg"
					   data-lightbox="image-11">
					   <img src="/static/img/collections/preserved/vertabrae-01.jpg" />
					</a>
				</div>
				
				<div className="item">
					<a href="/static/img/collections/preserved/vanadinite-01.jpg"
					   data-lightbox="image-12">
						<img src="/static/img/collections/preserved/vanadinite-01.jpg" className="large-specimen" />
					</a>
				</div>

				<div className="item">
					<a href="/static/img/collections/preserved/rock.jpg"
					   data-lightbox="image-13">
						<img src="/static/img/collections/preserved/rock.jpg" className="large-specimen" />
					</a>
				</div>

				<div className="item w2">
					<a href="/static/img/collections/preserved/fox.jpg"
					   data-lightbox="image-14">
						<img src="/static/img/collections/preserved/fox.jpg" className="large-specimen" />
					</a>
				</div>
			</div>
		</div>
	</div>
</div>);
	}
})

var AquaticLife = React.createClass({
	render: function () {
		return (<section className="dark">
		<div className="container">
			<div className="fourteen columns offset-by-one collection row">
				<img className="six columns" src="/static/img/collections/aquatic-life/jellies-02.jpg" />
				<div className="six columns offset-by-one">
					<h3>Aquatic Life</h3>
					<p>Donec hendrerit euismod nisi a sodales. Proin eleifend condimentum interdum. Etiam dolor est, eleifend sed purus vel, consequat malesuada urna. Proin elementum auctor erat, fringilla lacinia tortor. Quisque pellentesque arcu tortor, sit amet luctus diam semper vel. Donec non tortor sed libero imperdiet facilisis sed id nibh. Donec ullamcorper augue non felis hendrerit tincidunt. Donec sed mauris dolor. </p>
				</div>
			</div>
		</div>
		<video className="moving-specimen" autoplay loop>
		 	<source src="/static/vid/mummichogs-3.mp4" type="video/mp4" />
	 		<source src="/static/vid/mummichogs-3.webmhd.webm" />
		 	Your browser does not support the video tag.
		</video>
	</section>);
	}
});

var TinyTown = React.createClass({
	render: function () {
		return (<div className="container">
		<div className="fourteen columns offset-by-one collection row">
			<img className="six columns" src="/static/img/tiny-town.jpg" />
			<div className="six columns offset-by-one">
				<h3>Tiny Town</h3>
					<p>Donec hendrerit euismod nisi a sodales. Proin eleifend condimentum interdum. Etiam dolor est, eleifend sed purus vel, consequat malesuada urna. Proin elementum auctor erat, fringilla lacinia tortor. Quisque pellentesque arcu tortor, sit amet luctus diam semper vel. Donec non tortor sed libero imperdiet facilisis sed id nibh. Donec ullamcorper augue non felis hendrerit tincidunt. Donec sed mauris dolor. </p>
			</div>
			<div className="fourteen columns flexslider">
				<ul className="slides">
					<li>
						<img src="/static/img/collections/tiny-town/seahorse.jpg" className="large-specimen" />
					</li>

					<li>
						<img src="/static/img/collections/tiny-town/fern.jpg" className="large-specimen" />
					</li>
				</ul>					
			</div>
		</div>
	</div>);
	}
})

var Microscopy = React.createClass({
	render: function () {
		return (<div className="container">
	<div className="fourteen columns offset-by-one collection row">
		<img className="six columns" src="/static/img/collections/microscopy/starfish.jpg" />
		<div className="six columns offset-by-one">
			<h3>Microscopy</h3>
			<p>Donec hendrerit euismod nisi a sodales. Proin eleifend condimentum interdum. Etiam dolor est, eleifend sed purus vel, consequat malesuada urna. Proin elementum auctor erat, fringilla lacinia tortor. Quisque pellentesque arcu tortor, sit amet luctus diam semper vel. Donec non tortor sed libero imperdiet facilisis sed id nibh. Donec ullamcorper augue non felis hendrerit tincidunt. Donec sed mauris dolor. </p>
		</div>
		<img src="/static/img/collections/microscopy/starfish.jpg" className="large-specimen" />
	</div>
</div>);
	}
});

var Bio = React.createClass({
	render: function () {
		return (<div className="container">
	<div className="collection fourteen columns offset-by-one row">
		<img className="six columns" src="#"/>
		<div className="six columns offset-by-one">
			<h3>Arthur Loeb Design Science Collection</h3>
				<p>Donec hendrerit euismod nisi a sodales. Proin eleifend condimentum interdum. Etiam dolor est, eleifend sed purus vel, consequat malesuada urna. Proin elementum auctor erat, fringilla lacinia tortor. Quisque pellentesque arcu tortor, sit amet luctus diam semper vel. Donec non tortor sed libero imperdiet facilisis sed id nibh. Donec ullamcorper augue non felis hendrerit tincidunt. Donec sed mauris dolor. </p>
		</div>
		<img src="#" className="flood" />
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

		return (<html>
			<Top />
			<body>
				<Nav url={url}/>
				<IntroPullQuote />

				<section className="container">
					<div className="intro ten columns offset-by-three">
						<p>Donec hendrerit euismod nisi a sodales. Proin eleifend condimentum interdum. Etiam dolor est, eleifend sed purus vel, consequat malesuada urna. Proin elementum auctor erat, fringilla lacinia tortor. Quisque pellentesque arcu tortor, sit amet luctus diam semper vel. Donec non tortor sed libero imperdiet facilisis sed id nibh. Donec ullamcorper augue non felis hendrerit tincidunt. Donec sed mauris dolor. </p>
					</div>
				</section>

				<Collage />
				<AquaticLife />
				<TinyTown />
				<Microscopy />
				<Bio />

				<Footer />
			</body>
			<Script />
			</html>);
	}
});