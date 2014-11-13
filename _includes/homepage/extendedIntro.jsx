var React = require('react');

module.exports = React.createClass({
    render: function () {
        return (
       <section className="container">
           <div className="six columns offset-by-three">
               <p><span className="intro">expanded access to microscopes</span>  and micro-imaging systems opens new worlds of discovery for art and design students. These high-quality stereo and compound microscopes come with full-color, high-resolution cameras and the capacity to capture fluorescent images. </p>
               <p>Since microscopy is based on intense visual observation, it offers art and design students an intuitive portal for discovery. And given that the Nature Lab can’t accommodate a large living collection, our microscopes allow for ready access to entire ecosystems. 
                </p>
               <p>Come see the wondrous variety found in a single drop of pond water &mdash; from bacteria to photosynthetic algae, invertebrate larvae, predatory fish and more.</p>

           </div>
           <div className="four columns offset-by-one">
               <video autoPlay loop>
                   <source src="/static/vid/jelly-loop-2.mov" />
                   <source src="/static/vid/jelly-loop-2.webmhd.webm" />
                   Your browser does not support the video tag.
               </video>
           </div>
       </section>);
    }
});