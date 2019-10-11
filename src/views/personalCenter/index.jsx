import React, { Component } from 'react';
// import ReactDOM from 'react-dom'
import { Table, Button } from 'antd';
import './index.scss'
import Info from './info'
import { getQueryObject } from '../../utils'
import { getAdvOrderList } from '../../api/personalCenter'
import { setPersonalToken, getPersonalToken, setDetailInfo } from '../../utils/auth'

class personalCenter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            columns: [
                {
                    title: "序号",
                    dataIndex: "index",
                    key: 'index',
                    align: 'center',
                    width: 80,
                    render: (data, column, index) => {
                        return <span>{index + 1}</span>
                    }
                },
                {
                    title: "项目名称",
                    dataIndex: "name",
                    key: 'name',
                    minWidth: 220
                },
                {
                    title: "广告时间",
                    dataIndex: "advDate",
                    key: 'advDate',
                    align: 'center',
                    minWidth: 200
                },
                {
                    title: "订单状态",
                    dataIndex: "orderStatus",
                    key: 'orderStatus',
                    align: 'center',
                    minWidth: 100,
                    render: (data) => {

                        if (data === '1') {
                            return <span>已完成</span>
                        } else {
                            return <span>进行中</span>
                        }
                    }
                },
                {
                    title: "订单时间",
                    dataIndex: "orderDate",
                    key: 'orderDate',
                    minWidth: 180
                },
                {
                    title: "操作",
                    key: "action",
                    align: 'center',
                    fixed: 'right',
                    width: 100,
                    render: (data, column, index) => {
                        if (column.orderStatus === '1') {
                            return <span><Button type="link" size="small" onClick={this.lookRow.bind(this, column)}>查看</Button></span>
                        } else {
                            return <span>-</span>
                        }
                    }
                }
            ],
            dataList: [],
            activeName: '1',
            queryForm: {
                total: 10,
                pageSize: 10,
                pageNum: 1,
                account: '',

            },
            detail: {

            },
            pagination: {
                showQuickJumper: true,
                showSizeChanger: true,
                onChange: this.pageChange,
                onShowSizeChange: this.onShowSizeChange,
                current: 1,
                pageSize: 10,
                total: 0,
                showTotal: (total, range) => `${range[0]}-${range[1]} 共 ${total} 条`,
                pageSizeOptions: ['10', '20', '50']
            }
        }
    }
    lookRow(row) {
        this.setState(() => ({ detail: row }))
        setDetailInfo(row)
        this.props.history.push('/personalCenter/' + row.orderId)
    }
    
    componentDidMount() {
        this.getAdvOrderList()

    }
    getAdvOrderList() {
        

        const token = getQueryObject(this.props.location.search).token || getPersonalToken()

        if (!token) {
            return
        }
        setPersonalToken(token)
        this.setState({
            loading: true
        })

        const queryForm = {
            pageSize:this.state.pagination.pageSize,
            pageNum:this.state.pagination.current
        }
      
        
        getAdvOrderList(queryForm).then((response) => {
            if (response.status === "ok") {
                const pagination = { ...this.state.pagination }
                pagination.total = response.resultData.total
                this.setState({
                    loading: false,
                    dataList: response.resultData.list || [],
                    pagination
                })
                window.UpdatePersonalUserInfo && window.UpdatePersonalUserInfo(response.resultData2)

            } else if (response.status === "error") {
                console.log('error')

            }

        })

    }
    onShowSizeChange= (current, pageSize)=> {
     
        const pagination = {...this.state.pagination,current,pageSize}
        this.setState({
            pagination
        },()=>  this.getAdvOrderList())
        // setTimeout(()=>{
        //     this.getAdvOrderList()
        // })
        
    }

    pageChange(pageNumber) {
    
        const pagination = {...this.state.pagination,current:pageNumber}
        this.setState({
            pagination
        },()=>  this.getAdvOrderList())
    }

    render() {
        const id = this.props.match.params.id
        if (id) {
            return (
                <div className="personalCenter">
                    <div className='preson-table-listBox'>
                        <Info detail={this.state.detail} />
                    </div>
                </div>
            )
        } else {
            return (
                <div className="personalCenter">
                    <div className='preson-table-listBox'>
                        <div className="tableTitle">
                            <div className="title">订单列表</div>
                            <div className="time"></div>
                        </div>
                        <Table
                            rowKey={row => row.orderId}
                            columns={this.state.columns}
                            dataSource={this.state.dataList}
                            bordered={true}
                            loading={this.state.loading}
                            pagination={this.state.pagination}
                        />
                        {/* <div>
                            <Pagination onShowSizeChange={this.onShowSizeChange} showSizeChanger showQuickJumper total={this.state.queryForm.total} pageSizeOptions={['100', '200', '300', '400']} pageSize={this.state.queryForm.pageSize} current={this.state.queryForm.pageNum} />
                        </div> */}
                          {/* <Pagination showQuickJumper total={20}  /> */}

                    </div>
                </div>
            )
        }
    }
}

export default personalCenter;