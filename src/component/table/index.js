/**
 * 一个公共的table 数据展示组件
 * 它的header显示如果调用改组件是不传，就使用默认的，否则替换
 * 它有自己的状态来处理一些行为事件
 * 在该组件加载完成后，请求数据，完成渲染
 */
import React from 'react';
import fetch from 'node-fetch';
import { baseUrl } from '../../utils/config';
import { defaultHeader } from './default';
import classNames from 'classnames';
import './index.scss';
import eventProxy from '../../utils/eventProxy'

class RankTable extends React.Component {
    constructor(props) {
        // console.log(props, '44444')
        super(props);
        this.state = {
            header: defaultHeader,
            rankList: [],
            platform: props.platform,
            category: 0,
        }
    }
    fetchRank = (platform) => {
        fetch(`${baseUrl}/rank/lists?time=${new Date().getTime()}&dataType=kol&category=${this.state.category}&timeType=week&platform=${platform}&count=100&page=1&timer=0`)
            .then(response => response.json())
            .then(json => {
                json.data.data.map(item => item.show = false);
                this.setState({
                    rankList: json.data.data
                })
            })
    }
    componentDidMount() {
        if (this.props.platform) {
            this.setState({
                ...this.state,
                platform: this.props.platform
            })
            this.fetchRank(this.props.platform);
        }
        //监听category订阅事件，疑点componentDidMount只加载一次，但为什么它里面的监听事件在被触发时又可以触发
        eventProxy.on('category', (category) => {
            this.setState({
                ...this.state,
                category: category
            }, () => {
                this.fetchRank(this.state.platform);
            })
        })

        //监听platfrom订阅事件
        eventProxy.on('platform', (platform) => {
            if (platform !== this.state.platform) {
                this.setState({
                    ...this.state,
                    platform: platform,
                    category: 0
                }, () => {
                    this.fetchRank(this.state.platform)
                })
            }
        })

    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.platform != prevProps.platform) {
            this.fetchRank(this.state.platform)
        }
    }
    static getDerivedStateFromProps(props, state) {
        // fetchRank(props.platform)
        return {
            platform: props.platform
        }
    }

    //查看详情
    arrow = (e, i) => {
        let arr = this.state.rankList;
        arr[i].show = !this.state.rankList[i].show;
        this.setState({
            ...this.state,
            rankList: arr
        })
    }
    //转化为图片
    transformImg = (img) => {
        switch (img) {
            case '1':
                return <img className="ranking" src={`https://m.caasdata.com/assets/img/top_newb${img}.png`} />;
            case '2':
                return <img className="ranking" src={`https://m.caasdata.com/assets/img/top_newb${img}.png`} />;
            case '3':
                return <img className="ranking" src={`https://m.caasdata.com/assets/img/top_newb${img}.png`} />;
            default:
                return img;
        }
    }
    render() {
        return <div className="rank">
            <div className="thead">
                {this.state.header.map(item => <span key={item.value} style={{ 'width': `${item.width}%` }}>{item.name}</span>)}
            </div>
            <div className='tbody'>
                {
                    this.state.rankList.map((item, index) => <div className="tr" key={item.id}>
                        <div className="trLine">
                            {/* <a href="www.baidu.com"> */}
                            <span style={{ width: "17%", marginLeft: "2%" }}>{this.transformImg(item.ranking)}</span>
                            <span style={{ width: "36%" }}>{item.title}</span>
                            <span style={{ width: "23%" }}>{item.fan_count}</span>
                            <span style={{ width: "10%" }}>{item.huox_index}</span>
                            {/* </a> */}
                            <span className="arrow" onClick={() => this.arrow(item, index)}>
                                <img className={classNames({ 'rotateImg': item.show })} src={require('../../images/rank_more_new.png')} />
                            </span>
                        </div>
                        <div className={classNames({ 'trDetail': true, 'showDetail': item.show })}>
                            <table className="counts">
                                <thead>
                                    <tr>
                                        <td>集均评论数</td>
                                        <td>集均点赞数</td>
                                        <td>集均分享数</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{item.comment_average}</td>
                                        <td>{item.up_average}</td>
                                        <td>{item.ad_share}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>)
                }
            </div>
        </div>
    }
}
export default RankTable;