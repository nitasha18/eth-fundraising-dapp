import React, {Component} from "react";
import "./layout.css"
import {Bar} from 'react-chartjs-2';
import "antd/dist/antd.css";
import {Card} from "antd";
import {Input} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import {Layout, Menu, Breadcrumb, Button} from 'antd';

import {Carousel} from "antd";

const {Header, Content, Footer, Sider} = Layout;
const contentStyle = {
    height: '200px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};


class StaticLayout extends Component {
    state = {
        collapsed: false,

    };
    graphdata = {
        labels: ['January', 'February', 'March',
            'April', 'May'],
        datasets: [{
            label: 'Applications',
            backgroundColor: [
                'rgba(255,0,255,0.2)',
                'rgba(0,0,255,0.2)',
                'rgba(0,255,0,0.2)',
                'rgba(255,255,0,0.2)',
                'rgba(0,255,255,0.2)'
            ],
            borderColor: [
                'rgba(255,0,255,1)',
                'rgba(0,0,255,1)',
                'rgba(0,255,0,1)',
                'rgba(255,255,0,1)',
                'rgba(0,255,255,1)'
            ],

            borderWidth: 2,
            data: [65, 59, 80, 81, 56]
        }]
    };


    render() {
        return (
            <Layout>

                <Content className="site-layout">


                    <div className="site-layout-background" style={{
                        paddingRight: 500,
                        paddingLeft: 0,
                        paddingBottom: 100,
                        paddingTop: 200,

                        minHeight: 300
                    }}>
                        {/*<Carousel className={'stats-card'}>*/}
                        {/*    <div>*/}
                        {/*        <h3 style={contentStyle}>1</h3>*/}
                        {/*    </div>*/}
                        {/*    <div>*/}
                        {/*        <h3 style={contentStyle}>2</h3>*/}
                        {/*    </div>*/}
                        {/*    <div>*/}
                        {/*        <h3 style={contentStyle}>3</h3>*/}
                        {/*    </div>*/}
                        {/*    <div>*/}
                        {/*        <h3 style={contentStyle}>4</h3>*/}
                        {/*    </div>*/}
                        {/*</Carousel>*/}
                        <Card className={"stats-card"} style={{width: 810}}>
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                        </Card>
                        <Bar

                            data={this.graphdata}
                            options={{
                                title: {
                                    display: true,
                                    text: '',
                                    fontSize: 20
                                },
                                legend: {
                                    display: true,
                                    position: 'bottom'
                                }
                            }}
                        />
                        <Card className={'contact-card'} title="Contact Us" style={{textAlign: "center"}}>
                            <br/>
                            <p><h3>We know you are in urgent need of funds.</h3></p>
                            <p>Raising funds was never this easy.</p>
                            <br/><br/>
                            <Input size="large" placeholder="Email" prefix={<UserOutlined/>}/>
                            <br/><br/><br/>
                            <Input size="large" placeholder="Phone Number" prefix={<UserOutlined/>}/>
                            <br/><br/><br/>
                            <Button>Contact</Button>
                            <br/><br/><br/><br/><br/>

                        </Card>

                    </div>


                </Content>

            </Layout>
        );
    }
}

export default StaticLayout;