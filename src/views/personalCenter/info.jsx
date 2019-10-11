import React, { Component } from 'react';
import { Table, Button, Pagination, Collapse, Spin, Modal, Carousel } from 'antd';
import { getAdvOrderDetailMcn, getOrderDetail } from '../../api/personalCenter'
import { getDetailInfo } from '../../utils/auth'
const { Panel } = Collapse;
const linkStyle = {
    color: 'rgb(64, 158, 255)',
    display: 'block',
    width: '140px',
    overflow: 'hidden',
    whiteIpace: 'nowrap',
    textOverflow: 'ellipsis',
    height: '20px',
    wordBreak: 'normal'
}
class info extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            activeName: '',
            activeKey: '',
            activeColumn:{
                screenshotUrl:[]
            },
            detail:{},
            columns: [
                {
                    title: "平台",
                    dataIndex: "platName",
                    align: 'center',
                    width: 80
                },
                {
                    title: "发布时间",
                    dataIndex: "pushDate",
                    minWidth: 167
                },
                {
                    title: "内容标题",
                    dataIndex: "title",
                    align: 'left',
                    width: 240,
                    render: (text, record) => (
                        
                        <div style={{wordWrap: 'break-word', wordBreak: 'break-word' }}>
                          {text}
                        </div>
                    )
                },
                {
                    title: "推荐量",
                    dataIndex: "recommendCnt",
                    align: 'center',
                    minWidth: 100
                },
                {
                    title: "阅读量",
                    dataIndex: "readCnt",
                    align: 'center',
                    minWidth: 100
                },
                {
                    title: "评论量",
                    dataIndex: "commentCnt",
                    align: 'center',
                    minWidth: 100
                },
                {
                    title: "转发量",
                    dataIndex: "forwardCnt",
                    align: 'center',
                    minWidth: 100
                },
                {
                    title: "内容链接",
                    dataIndex: "link",
                    minWidth: 180,
                    render: (data, column, index) => {
                        return <a target="view_window" href={data} style={linkStyle} alt=''>{data}</a>
                    }
                },
                {
                    title: "操作",
                    dataIndex: "handle",
                    align: 'center',
                    fixed: 'right',
                    width: 100,
                    render: (data, column, index) => {
                        if (column.screenshotUrl && column.screenshotUrl.length > 0) {
                            return <span><Button type="link" size="small" onClick={this.lookRow.bind(this, column)}>查看截图</Button></span>
                        } else {
                            return <span style={{ color: '#c0c4cc' }}>查看截图</span>
                        }
                    }
                }
            ],
            Collapses: [],
            CollapsesItem: {
                list: [],
                total: 0
            },
            data: [],
            formQuery: {
                orderId: "",
            },
            pagination: {
                current: 1,
                pageSize: 10,
                total: 0
            }
        }
        this.activeName = ['']
    }

    lookRow(column) {
 
        this.setState({
            visible: true,
            activeColumn:column
        });

    }
    componentDidMount(e) {
        this.getAdvOrderDetailMcn((item) => {
         
            this.setState({
                activeKey: '0'
            })
            this.orderDetail = this.state.Collapses[0]
            this.getOrderList(0)
        })

    }
    getAdvOrderDetailMcn(callback) {
        // const formQuery = Object.assign({}, this.state.pagination, {
        //     orderId: this.props.detail.orderId || getDetailInfo().orderId
        // })
        const formQuery = {
            pageSize: this.state.pagination.pageSize,
            pageNum: this.state.pagination.current,
            orderId: this.props.detail.orderId || getDetailInfo().orderId
        }
        this.setState({
            loading: true,
        })

        getAdvOrderDetailMcn(formQuery).then(response => {
            if (response.status === "ok") {
                const collapseList = response.resultData.list.map(item => {
                    item.children = []
                    item.open = false
                    item.Loading = false
                    item.total = 0
                    item.pageNum = 1
                    item.pageSize = 10
                    return item;
                });
                const pagination = Object.assign({}, this.state.pagination, {
                    total: response.resultData.total
                })
                this.setState({
                    loading: false,
                    pagination: pagination,
                    Collapses: collapseList || []
                })
                if (response.resultData.list.length > 0) {
                    callback && callback(response.resultData.list[0])
                }
                window.UpdatePersonalUserInfo && window.UpdatePersonalUserInfo(response.resultData2)
            } else if (response.status === "error") {

            }
            this.loading = false;
        }).catch(error => {
            this.setState({
                loading: false
            })
        });

    }

    getOrderList(index) {
        const collapseList = this.state.Collapses.map((item, idx) => +idx === +index ? { ...item, loading: true, } : item)

        this.setState({
            Collapses: collapseList || []
        })
        this.orderFormQuery = {}
        this.orderFormQuery.orderId = getDetailInfo().orderId;
        this.orderFormQuery.mcnId = this.orderDetail.mcnId;
        this.orderFormQuery.total = this.orderDetail.total;
        this.orderFormQuery.pageNum = this.orderDetail.pageNum;
        this.orderFormQuery.pageSize = this.orderDetail.pageSize;
        getOrderDetail(this.orderFormQuery)
            .then(response => {
                if (response.status === "ok") {
                    let orderList = response.resultData.list.map((item, index) => {
                        item.Loading = false;
                        item.key = index;
                        return item;
                    });


                    const collapseList = this.state.Collapses.map((item, idx) => +idx === +index ? { ...item, loading: false, children: orderList || [], total: response.resultData.total } : item)

                    this.setState({

                        Collapses: collapseList || []
                    })

                } else if (response.status === "error") {

                }

            })
            .catch(error => {
                console.log(error)

            });
    }
    
    componentWillMount() {
       
        const detail =this.props.detail.orderId? this.props.detail : getDetailInfo()
      
        this.setState({
            detail
        })

    }
    changeCollapse(e) {
    
        this.setState({
            activeKey: e
        })

        const index = e
        if (index) {
            this.orderDetail = this.state.Collapses[e]

            this.getOrderList(index)
        }


    }
    onShowSizeChange = (current, pageSize) => {
     
        const pagination = { ...this.state.pagination, current, pageSize }
        this.setState({
            activeKey: '',
            pagination
        }, () => this.getAdvOrderDetailMcn())
        // setTimeout(()=>{
        //     this.getAdvOrderList()
        // })

    }

    pageChange(pageNumber) {
      
        const pagination = { ...this.state.pagination, current: pageNumber }
        this.setState({
            activeKey: '',
            pagination
        }, () => this.getAdvOrderDetailMcn())
    }
    handleOk = e => {
     
        this.setState({
            visible: false,
        })
    }

    handleCancel = e => {
    
        this.setState({
            visible: false,
        })
    }
    onCarouselChange(a, b, c) {
       
    }
    panelChange(index,pageNum,pageSize){
        const collapseList = this.state.Collapses.map((item, idx) => +idx === +index ? { ...item, pageNum,pageSize} : item)
        this.setState({
            Collapses: collapseList || []
        },()=>{
         
            this.orderDetail = this.state.Collapses[index]
            this.getOrderList(index)

        })
    }
    render() {
        const Collapes = this.state.Collapses.map((item, index) => {
            return (
                <Panel header={item.mcnName} key={index + ''}>
                    <Table
                        rowKey={row => row.key}
                        columns={this.state.columns}
                        dataSource={item.children}
                        bordered={true}
                        loading={item.loading}
                        pagination={{
                            position: 'bottom',
                            size: 'small',
                            showTotal: (total) => `共 ${total} 条`,
                            total: item.total,
                            current: item.pageNum,
                            onChange:this.panelChange.bind(this,index)
                        
                        }}
                    />
                    {/* <Pagination onShowSizeChange={this.onShowSizeChange}  total={item.total}  current={item.pageNum} /> */}

                </Panel>
            )
        })
        return (
            <div>
                
                <div className="tableTitle">
                            <div className="title">{this.state.detail.name}</div>
                            <div className="time">{this.state.detail.orderDate}</div>
                        </div>
                <Spin tip="Loading..." delay={200} spinning={this.state.loading}>
                    <Collapse destroyInactivePanel defaultActiveKey={this.state.activeName} activeKey={this.state.activeKey} accordion onChange={this.changeCollapse.bind(this)}>
                        {Collapes}
                    </Collapse>
                    <div>
                        <Pagination showQuickJumper={true} showSizeChanger style={{ margin: '16px 0', float: 'right' }} showTotal={(total, range) => `${range[0]}-${range[1]} 共 ${total} 条`} onChange={this.pageChange} onShowSizeChange={this.onShowSizeChange} total={this.state.pagination.total} pageSizeOptions={['10', '20', '40', '50']} pageSize={this.state.pagination.pageSize} current={this.state.pagination.current} />
                    </div>
                </Spin>
                <Modal
                    title="截图"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    width='580px'
                    onCancel={this.handleCancel}
                >
                   <div >
                   <Carousel autoplay afterChange={this.onCarouselChange}>
                       {
                           this.state.activeColumn.screenshotUrl.map((item)=>{
                               return (
                                   <div key={item} className='CarouselCover'>
                                       <img className='CarouselImg' src={item} alt="item"/>
                                   </div>
                               )
                           })
                       }
                    </Carousel>
                   </div>
                </Modal>
            </div>
        )
    }

}

export default info;