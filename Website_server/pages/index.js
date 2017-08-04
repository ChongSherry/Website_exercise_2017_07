import React from 'react';
import Link from 'next/link';

import ScriptImport from './index_config/ScriptImport';
import Index_top from './index_config/top.js';
import Index_heaer from './index_config/header';
import Index_main from './index_config/main';
import Index_nav from './index_config/nav';
export default class extends React.Component {
    static async getInitialProps(arg) {
        const { pathname, query, asPath, req, res, jsonPageRes, err } = arg;
        
        await console.log(pathname);

        return pathname

    }

    render() {
        return (
            <div>
                {/*头部信息  */}
                <Index_heaer />


                <Index_nav />
                <div className="content-main">
                    <Index_top />
                    <Index_main />
                </div>

                {/*引入的js  */}
                <ScriptImport />
            </div>
        );
    }
}