var React = require('react');

var moment = require('moment');

var Item = React.createClass({
    render: function () {
        var data = this.props.data;
        var date = moment(data.date)
            .format("MMMM YYYY");
        return (
            <div className="six columns offset-by-five">
               <div className="news-ticker">
                   <p className="news-ticker-headline">{data.title}</p>
                   <p className="news-ticker-date">{date}</p>
               </div>
           </div>);
    }
})

module.exports = React.createClass({
    render: function () {
        var data = this.props.data;
        var items = data.map(function (d) {
            return (<Item data={d} />);
        });

        return (
       <div className="history">
           <section className="container">
               {items}
       
               <div className="ten columns offset-by-three">
                   <p>

                       Walking into the RISD Nature Lab is like stepping into a cabinet of curiosities, brimming with odd and interesting artifacts from the natural world. But unlike collections that age, fade and recede in relevance behind glass cases, ours is here to be touched, examined and borrowed by artists and designers interested in exploring the wonder and complexities of design in nature.</p>
                       <p> 
                       The 80,000 skeletons, shells, corals, fish, seeds, plants, rocks and microscopic specimen housed in the Nature Lab offer a hands-on learning experience that’s very different from online research. A site for many forms of inquiry and observation, the Nature Lab supports both individual and group learning about texture, color, shape, pattern, form, structure, systems and myriad other aspects of natural order with a direct bearing on the critical making that goes on in RISD studios.

                   </p>
               </div>
           </section>
       </div>);
    }
});