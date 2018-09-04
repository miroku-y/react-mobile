/**
 * 它是一个分类组件，接受不同的platform,来修改请求参数
 * 父组件的修改，在getDerivesStateFromProps中获取修改的platform
 */
import React from 'react';
import ReactDOM from 'react-dom';
import fetch from 'node-fetch';
import { baseUrl } from '../../utils/config';
import './index.scss';
import classnames from 'classnames';
import { Tabs, WhiteSpace } from 'antd-mobile';
import eventProxy from '../../utils/eventProxy';

class CateGroys extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            platform: props.platform,
            categroys: [],
            defaultActive: '',
            currentIdx: 0,
            width: document.body.clientWidth / 5
        };
    }

    fetchCategroy = (platform) => {
        fetch(`${baseUrl}/platforms/${platform}/categorys`).then(response => response.json()
        ).then(json => {
            const { data } = json;
            this.setState({
                ...this.state,
                categroys: data.data,
                defaultActive: data.data.length ? data.data[0].id : ''
            })
        })
    }

    componentDidMount() {
        this.fetchCategroy(this.state.platform);
        //注册滚动事件
        const parent = ReactDOM.findDOMNode(this);
        const $child = parent.querySelector('.categroysNav');

        parent.addEventListener('click', this.parentDOMscroll, false);

    }

    //获取index
    idx = (arr, text) => {
        let i = '';
        arr.map((item, index) => {
            if (item.title === text) {
                return i = index;
            }
        })
        return i;
    }
    //父原生dom
    parentDOMscroll = (event) => {
        //兼容写法安卓、苹果
        let path = event.path || (event.composedPath && event.composedPath());
        path.map((item, index) => {
            if (item['className'] === 'categroysNav') {
                path[index].scrollLeft = (this.idx(this.state.categroys, event.target.innerText) - 2) * this.state.width;
            }
        });
    }

    //静态方法，获取不到this
    static getDerivedStateFromProps(props, state) {
        if (props.platform !== state.platform) {
            //如果platform更新，那么就要对它的兄弟组件table数据请求参数进行修改
            eventProxy.trigger('platform', props.platform);
            //通过return将state.platform的值进行更新
            return {
                platform: props.platform
            }
        } else {
            return null
        }

    }
    //通过静态方法中修改类platform,再在下面方法中更新categroy请求
    //上面的静态方法先执行
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.platform !== this.state.platform) {
            this.fetchCategroy(this.state.platform)
        }

    }

    //categroy nav click
    handlerNav = (id, index) => {
        this.setState({
            ...this.state,
            defaultActive: id,
            currentIdx: index
        });
        //$('.rank_filtrate_classify_over').animate({scrollLeft:($('.rank_filtrate_classify_over li.active').index()-2)*$width},500);
        //发布订阅事件
        eventProxy.trigger('category', id)

    }

    render() {
        return <div >
            <div className="categroysNav">
                <ul style={{ width: `${this.state.categroys.length * 68}px` }}>
                    {
                        this.state.categroys.length ? this.state.categroys.map((item, index) => <li onClick={() => this.handlerNav(item.id, index)} key={item.id} className={classnames({ 'active': this.state.defaultActive == item.id })}><span>{item.title}</span></li>) : <li>暂无数据</li>
                    }
                </ul>
            </div>
        </div>
    }
}
export default CateGroys