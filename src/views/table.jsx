import React,{Component} from 'react';
import { Button, Table } from 'antd';
import { setPersonalToken,getPersonalToken, getDetailInfo, setDetailInfo } from '../utils/auth'
import { getAdvOrderList } from '../api/personalCenter'
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    filters: [
      {
        text: 'Joe',
        value: 'Joe',
      },
      {
        text: 'Jim',
        value: 'Jim',
      },
      {
        text: 'Submenu',
        value: 'Submenu',
        children: [
          {
            text: 'Green',
            value: 'Green',
          },
          {
            text: 'Black',
            value: 'Black',
          },
        ],
      },
    ],
    
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ['descend'],
  },
  {
    title: 'Age',
    dataIndex: 'age',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    filters: [
      {
        text: 'London',
        value: 'London',
      },
      {
        text: 'New York',
        value: 'New York',
      },
    ],
    filterMultiple: false,
    onFilter: (value, record) => record.address.indexOf(value) === 0,
    sorter: (a, b) => a.address.length - b.address.length,
    sortDirections: ['descend', 'ascend'],
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
  },
];

function onChange(pagination, filters, sorter) {
  console.log('params', pagination, filters, sorter);
}

class Nable extends Component{
    constructor(props){
        super(props)
        
        this.state ={
            columns: [
                {
                    title: "序号",
                    dataIndex: "index",
                    key:'index',
                    align: 'center',
                    width: 80,
                    render: (data, column, index) => {
                        return <span>{index + 1}</span>
                    }
                },
                {
                    title: "项目名称",
                    dataIndex: "name",
                    key:'name',
                    minWidth: 220
                },
                {
                    title: "广告时间",
                    dataIndex: "advDate",
                    key:'advDate',
                    align: 'center',
                    minWidth: 200
                },
                {
                    title: "订单状态",
                    dataIndex: "orderStatus",
                    key:'orderStatus',
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
                    prop: "orderDate",
                    key:'orderDate',
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
            queryForm: {
                total:10,
                pageSize: 10,
                pageNum: 1,
                account: '',

            },
        }
    };
    componentDidMount() {

     
        const  token  =  getPersonalToken()
     
        if (!token) {
            return
        }
        setPersonalToken(token)
        getAdvOrderList(this.state.queryForm).then((response) => {
            if (response.status === "ok") {
                const queryForm = Object.assign({}, this.state.queryForm, { total: response.resultData.total })
                this.setState({
                    queryForm: queryForm,
                    dataList: response.resultData.list || []
                })
                window.UpdatePersonalUserInfo && window.UpdatePersonalUserInfo(response.resultData2)

            } else if (response.status === "error") {
                console.log('error')

            }

        })
    }
    lookRow(){
        
    }
  render() {
    return (
        <Table columns={this.state.columns} dataSource={this.state.dataList} onChange={onChange} />

    )
    

  }

}

export default Nable;
