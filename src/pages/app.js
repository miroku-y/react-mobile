/**
 * 记录一下有个问题
 * 本来我是打算将这个隐藏的标签栏做到公共的table组件中，但是由于app.js这个父组件中引用了antd-mobile的tabs组件，它也涉及到了flex定位，
 * 导致的你在它的子最终在进行fixed定位就会有问题，被迫移到了最外层，
 */
import React from 'react';
import './app.scss';
import { Tabs } from 'antd-mobile';
import { rankTop } from '../utils/enum';
import Sensation from './sensation';
import Pgc from './pgc';
import { defaultHeader } from '../component/table/default';
import classNames from 'classnames';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            header: defaultHeader,
            showNav: false
        }
    }
    componentDidMount() {
        //监听滚动条
        document.addEventListener('scroll', (e) => this.handlerScroll(e))
    }
    //滚动事件
    handlerScroll = (e) => {
        //获取scrollTop,并兼容低版本浏览器
        const sTop = e.srcElement.documentElement.scrollTop || e.srcElement.body.scrollTop;
        this.setState({
            ...this.state,
            showNav: sTop
        })
    }
    render() {
        return <div className='page'>
            {/* <div className="rank_top">
                <div className="rank_user">

                </div>
                <div className="rank_share">

                </div>
                <div className="search_btn">
                    <input placeholder='请输入节目名称/红人名称' />
                </div>
            </div> */}
            <div className="tabs">
                <div className={classNames({ 'headThead': true, 'showNav': this.state.showNav >= 163 })}>
                    {this.state.header.map(item => <span key={item.value} style={{ 'width': `${item.width}%` }}>{item.name}</span>)}
                </div>
                <Tabs tabs={rankTop} initialPage={0} swipeable={false}>
                    <Sensation />
                    <Pgc />
                    <div>3</div>
                </Tabs>

                {/* <Tabs activeKey="1">
                    <TabPane tab="红人榜" key="1"><Sensation /></TabPane>
                    <TabPane tab="PGC榜" key="2"><Pgc /></TabPane>
                    <TabPane tab="网综榜" key="3"><div>3</div></TabPane>
                </Tabs> */}
            </div>
        </div >
    }
}
export default App;