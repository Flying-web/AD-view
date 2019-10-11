import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import './index.scss'
let mystyle = {
    borderBottom: '1px solid #FB3434'
}


class header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            info: {},
            showInfo: false
        }
    }
    componentDidMount() {
        window.UpdatePersonalUserInfo = (data) => {
            window.adminInfo = data
            this.setState({
                info: window.adminInfo
            })
        }
    }
    MouseEnter = (e) => {
        this.setState({
            showInfo:true
        })

    }
    MouseLeave = (e) => {
        this.setState({
            showInfo:false
        })
    }

    render() {
        const info = this.props.location.pathname.split('/')[2]
        return (
            <div style={{ background: '#fbfbfb', height: '100%' }}>
                <div className='header'>
                    <div>
                        <div style={{ background: '#ffffff' }}>
                            <div className='banner'>
                                <div className='login-logo'>
                                    <a href='http://www.121media.cn/'>
                                        <img src='http://dspimg.121weixin.com/resources/images/logo.png' alt="" />
                                    </a>
                                </div>
                                <ul className='menu-user' id='av_on' onMouseEnter={this.MouseEnter}>
                                    <li id='li-user'>
                                        <img
                                            src='http://dspimg.121weixin.com/resources/images/user_icon.png'
                                            className='img-user'
                                            alt=""
                                        />&nbsp;&nbsp;
              <span className='span-user'>{this.state.info.username}</span>&nbsp;&nbsp;
              <img
                                            src='http://dspimg.121weixin.com/resources/images/user_sel.png'
                                            className='img-user'
                                            alt=""
                                        />
                                    </li>
                                </ul>
                                {
                                    this.state.showInfo && <div className='dropdown' id='av_on2' onMouseLeave={this.MouseLeave}>
                                        <div className='dropdown-content'>
                                            <div id='div-user'>
                                                <img
                                                    src='http://dspimg.121weixin.com/resources/images/user_icon.png'
                                                    className='img-user'
                                                    alt=""
                                                />&nbsp;&nbsp;
                <span className='span-user'>{this.state.info.username}</span>&nbsp;&nbsp;
                <img
                                                    src='http://dspimg.121weixin.com/resources/images/user_sel.png'
                                                    className='img-user'
                                                    alt=""
                                                />
                                            </div>
                                            <a href='javasctipt:;' id='a-logout' >
                                                <img src='http://dspimg.121weixin.com/resources/images/logout.png' alt="" />&nbsp;&nbsp;
                <span className='span-logout'>退出登录</span>
                                            </a>
                                        </div>
                                    </div>
                                }

                            </div>
                        </div>
                    </div>
                    <div style={mystyle} ></div>
                    <div style={{ width: '1200px', margin: '0 auto', background: 'rgb(255, 255, 255)' }}>
                        <div className='header-Breadcrumb'>
                            <Breadcrumb separator='/'>
                                <Breadcrumb.Item> <a className="fistlink" href="http://www.121media.cn/">首页</a> </Breadcrumb.Item>
                                <Breadcrumb.Item> <Link className="fistlink" to='/personalCenter'>个人中心</Link></Breadcrumb.Item>
                                {info && <Breadcrumb.Item>订单详情</Breadcrumb.Item>}
                            </Breadcrumb>
                        </div>

                        <div className="tags-view-container">
                            <div className="tags-view-wrapper">
                                <div className="routerTitle">
                                    活动列表
                                   {info && <span className="warning-color" > （因各平台数据更新时间不同，数据显示也略有延迟） </span>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.children}
            </div>


        )

    }

}

export default header;