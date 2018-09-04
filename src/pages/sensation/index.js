import React from 'react';
import { baseUrl, imgUrl } from '../../utils/config';
import './index.scss';
import fetch from 'node-fetch';
import RankTable from '../../component/table';
import { Tabs } from 'antd-mobile';
import classnames from 'classnames';
import Categorys from '../../component/categroys';
import ReactDOM from 'react-dom'

const TabPane = Tabs.Pane;
class Sensation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewdata: {
                categorys: [],
                kolPlatformList: [],
                times: {}
            },
            platform: '998'
        }
    }
    componentDidMount() {
        //调用红人榜数据
        fetch(`${baseUrl}/rank`)
            .then(
                response => response.json()
            )
            .then(
                json => {
                    const { data: { date: { categorys, kolPlatformList, times } } } = json;
                    this.setState({
                        ...this.state,
                        viewdata: {
                            categorys,
                            kolPlatformList,
                            times
                        },
                        platform: kolPlatformList[0].id
                    })
                }
            );

        const parent = ReactDOM.findDOMNode(this);
        const child = parent.querySelector('.categroysNav');
        parent.addEventListener('click', this.parentDOMscroll, false);
    }

    parentDOMscroll = (event) => {
        let path = event.path || (event.composedPath && event.composedPath());
        let id = '';
        path.map((item, index) => {
            if (item['localName'] === 'dl') {
                id = path[index].dataset.id;
            }
        });
        if (id) {//如果id存在就是抖音这种大的导航栏切换，下面导航栏就要初始化为:全部
            path.map((item, index) => {
                if (item['className'] === 'rank_kol_channels') {
                    console.log(path, path[index].nextSibling.scrollLeft, '单曲');
                    path[index].nextSibling.firstChild.scrollLeft = 0;
                }
            })
        } else {
            return false;

        }
        console.log(this.state.platform, 'id' + id, '1111');
    }
    handlerNav = (item) => {
        this.setState({
            ...this.state,
            platform: item.id
        })
    }
    render() {
        return <div style={{ overflowY: 'hidden' }}>
            <div className="rank_kol_channels">
                <ul>
                    {
                        this.state.viewdata.kolPlatformList.map(item => <li onClick={() => this.handlerNav(item)} key={item.id}>
                            <dl data-id={item.id}>
                                <dt><img src={imgUrl + '/' + item.icon_square} /></dt>
                                <dd className={classnames({ ddActive: item.id === this.state.platform })}>{item.title.replace(/视频|小视频/ig, '')}</dd>
                            </dl>
                        </li>)
                    }
                </ul>

            </div>
            <Categorys platform={this.state.platform} />
            <RankTable platform={this.state.platform} />
        </div>
    }
}
export default Sensation;