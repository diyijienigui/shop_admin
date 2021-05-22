import React,{useEffect,useState} from 'react';
import {Statistic, Card, Row, Col} from 'antd';
import {ArrowUpOutlined,ArrowDownOutlined} from '@ant-design/icons'
import { fetchDashboard } from '@/services/dashboard';

const DashBoard = () => {
    // 定义组件状态，状态改变，会引起组件重新渲染
    const [datas, setData] = useState({})

    // 从usestate中获取data
    useEffect(async () => {
        // 发送请求，获取统计数据  
        const a = await fetchDashboard()
        // 得到数据之后，更新组件状态
        setData(a)
        // console.log(data)
    },[])

    return (
        <div>
            <Row gutter={16}>
                <Col span={8}>
                    <Card>
                    <Statistic
                        title="用户数量"
                        value={datas.users_count}
                        precision={0}
                        valueStyle={{ color: '#3f8600' }}
                        prefix={<ArrowUpOutlined />}
                    />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                    <Statistic
                        title="商品数量"
                        value={datas.goods_count}
                        precision={0}
                        valueStyle={{ color: '#234abc' }}
                        prefix={<ArrowDownOutlined />}
                    />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                    <Statistic
                        title="订单数据"
                        value={datas.orders_count}
                        precision={0}
                        valueStyle={{ color: '#cf1322' }}
                        prefix={<ArrowDownOutlined />}
                    />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default DashBoard;