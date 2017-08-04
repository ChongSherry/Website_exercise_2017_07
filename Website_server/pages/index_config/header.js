import React, { Component } from 'react';
import Link from 'next/link';
import Head from 'next/head';

export default class extends Component {
    constructor(props) {
        super();
    }

    render() {
        return (
            <Head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
                <link rel="stylesheet" type="text/css" href="/Bootstrap/css/bootstrap.css" />
                <link rel="stylesheet" type="text/css" href="/css/index.css" />
                <title>二组练习项目-首页</title>
            </Head>
        );
    }
} 