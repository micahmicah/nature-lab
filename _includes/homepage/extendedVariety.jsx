var React = require('react');

module.exports = React.createClass({
    render: function () {
        return (
       <section className="container">
           <div className="four columns offset-by-three">
               <img src="/static/img/skulls.jpg" className="texture-specimens"/>
           </div>
           <div className="six columns offset-by-two">

               <p><span className="intro">working with a wide variety</span> of fish, amphibians and other aquatic life gives students opportunities to care for and observe a range of living species. The lab’s small but ever-changing group of live inhabitants builds on a concept and collection first started in the 1930s by longtime RISD drawing instructor Edna W. Lawrence, a 1920 graduate of the Painting program. 
               </p>

               <p>Every summer &mdash; packed into a tiny coupe with her lifelong partner Bessie and their dog &mdash; Lawrence would take rambling road trips to collect natural specimens as inspiration for students in her nature drawing class. In 1937, when the new library opened in the College Building and space became available in the Waterman Building, she founded the Nature Lab with her collection of 1,286 objects. By the time she retired 38 years later, the collection had grown to 25,000 &mdash; and it has more than tripled since.</p>

           </div>
       </section>);
    }
});