import React, {Component} from "react";
import "./layout.css"
import {Bar} from 'react-chartjs-2';
import "antd/dist/antd.css";
import {Card} from "antd";
import {Input} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import {Layout, Menu, Breadcrumb, Button} from 'antd';
import emailjs from "emailjs-com";
import {Carousel} from "antd";
import {Alert} from 'antd';
const {Header, Content, Footer, Sider} = Layout;
const contentStyle = {
    height: '160px',
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
                        <div style={{'margin-top':'40px', 'margin-right':'35px'}}>
                            <Carousel autoplay className={"stats-card"}>
                                <div>
                                    <h5 style={contentStyle}>Sahay, a modern fundraiser platform for the sake of all the
                                        people in need out there!</h5>
                                </div>
                                <div>
                                    <h3 style={contentStyle}>Have a great innovative idea?</h3>
                                </div>
                                <div>
                                    <h3 style={contentStyle}>Want to lend a hand in saving someone's life?</h3>
                                </div>
                                <div>
                                    <h3 style={contentStyle}>Want help in completing your studies?</h3>
                                </div>
                                <div>
                                    <h3 style={contentStyle}>Just sign up with us and see your dreams coming true in front
                                        of you with us!</h3>
                                </div>
                            </Carousel>
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
                        </div>
                        <div style={{'margin-top':'40px', 'margin-left':'50px'}}>
                            <Card className={'contact-card'} title="Contact Us" style={{textAlign: "center"}}>
                                <br/>
                                <div style={{textAlign: "center"}}>
                                    <p><h3>We know you are in urgent need of funds.</h3></p>
                                    <p>Raising funds was never this easy.</p>
                                </div>
                                <br/>
                                <Alert
                                    message="E-mail"
                                    description="fundraiserdapp@gmail.com
                                sahaydapp@gmail.com"
                                    type="info"
                                    showIcon
                                    style={{textAlign: "initial"}}
                                />
                                <br/>
                                <Alert
                                    message="Contact"
                                    description="+91 9904321981"
                                    type="info"
                                    showIcon
                                    style={{textAlign: "initial"}}
                                />

                                <br/><br/>
                            </Card>
                        </div>

                    </div>


                </Content>

            </Layout>
        );
    }
}

export default StaticLayout;