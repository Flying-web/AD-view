import React from 'react';
import { Table } from 'antd';

export default function Ntable(prop){
    return (
        <Table
            rowKey={row => row.orderId}
            style={{ width: '100%' }}
            columns={prop.columns}
            dataSource={prop.dataList}
            stripe={true}
            bordered={true}
            pagination={false}
        />
    )
}