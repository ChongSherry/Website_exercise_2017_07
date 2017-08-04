import React from 'react';

export default class Nav extends React.Component {
	render() {
		return (
			<div className="nav-top">
				<nav className="navbar navbar-default">
					<div className="container-fluid">
						<div className="navbar-header">
							<a class="navbar-brand" href="#">
								<img alt="Brand" src="/img//a37d6148-0536-4e49-9d22-bd1b327923fb.png" className="Logo_img"/>
							</a>
							<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
								<span className="sr-only">Toggle navigation</span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
							</button>
						</div>

						<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
							<ul className="nav navbar-nav">
								<li>
									<a href="#">Link</a>
								</li>
								<li>
									<a href="#">Action</a>
								</li>
								<li>
									<a href="#">Action</a>
								</li>
								<li>
									<a href="#">Action</a>
								</li>
								<li>
									<a href="#">Action</a>
								</li>
							</ul>
						</div>
					</div>
				</nav>
			</div>
		);
	}
}