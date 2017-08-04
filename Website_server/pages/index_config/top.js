import React from 'react';

export default class index_top extends React.Component {
	render() {
		return (
			<div id="carousel-example-generic" className="carousel slide" data-ride="carousel">
				<ol className="carousel-indicators">
					<li data-target="#carousel-example-generic" data-slide-to="0" className="active"></li>
					<li data-target="#carousel-example-generic" data-slide-to="1"></li>
					<li data-target="#carousel-example-generic" data-slide-to="2"></li>
				</ol>

				<div className="carousel-inner" role="listbox">
					<div className="item active">
						<img src="/img/1.jpg" alt="1" />
						<div className="carousel-caption">
							这是第一张
					</div>
					</div>
					<div className="item">
						<img src="/img/2.jpg" alt="2" />
						<div className="carousel-caption">
							这是第二张
					</div>
					</div>
					<div className="item">
						<img src="/img/3.jpg" alt="3" />
						<div className="carousel-caption">
							.这是第三张
					</div>
					</div>
				</div>
				<a className="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
					<span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
					<span className="sr-only">Previous</span>
				</a>
				<a className="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
					<span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
					<span className="sr-only">Next</span>
				</a>
			</div>
		);
	}
};