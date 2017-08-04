import React from 'react';

export default class main extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <dir className="row">
                    <div className="col-lg-8 col-md-9 col-sm-10 col-xs-12 content-list">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <p>
                                    <span style={{color:"black",fontSize:"25pt"}} >第一个内容</span> &emsp;
									<span style={{color:"rgba(190,190,190,1)"}}>2017/05/08</span> &emsp;
									<span style={{color:"rgba(190,190,190,1)"}}>作者:root</span>
                                </p>
                            </div>
                            <div className="panel-body">
                                <img src="/img/1.jpg" alt="" className="img-thumbnail" />
                                <div style={{marginTop:"10px"}}>
                                    dlkawjdlkwajlkdj lk
								</div>
                            </div>
                            <div className="panel-footer">
                                <button type="button" className="btn btn-info">阅读全文</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-1">

                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-2 hidden-xs content-recommend">
                        <div className="panel panel-primary">
                            <div className="panel-heading">Panel heading without title</div>
                            <div className="panel-body">
                                Panel contentcontentcontentcontentcontentcontentcontent
							</div>
                        </div>
                    </div>
                </dir>
            </div>
        );
    }
}