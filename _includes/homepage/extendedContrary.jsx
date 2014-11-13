var React = require('react');

module.exports = React.createClass({
    render: function () {
        return (
       <section className="container">
           <div className="six columns offset-by-three">

               <p><span className="intro">unlike natural history museums</span>,  the RISD Nature Lab is designed for active use. Its staff of work-study students and professionals with scientific training keep the doors open 80 hours a week, helping visitors to follow their interests and check out more than 7,000 specimens a year. Rather than being rigidly organized by taxonomy, the collections are more compositional, with seeds organized by size and shape rather than genesis and minerals organized by color instead of chemical or physical properties. This approach encourages visual experimentation, inviting students to make comparisons and connections that feed their studio work. 
               </p>

           </div>

           <div className="four columns offset-by-one">
               <img src="/static/img/vertabrae-main.jpg" className="texture-specimens"/>
           </div>

       </section>);
    }
});