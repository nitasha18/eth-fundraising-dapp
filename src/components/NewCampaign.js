import React, {Component} from 'react';
import './App.css';
import {Form, Input, Button, Card, InputNumber} from 'antd';
import {UserOutlined} from '@ant-design/icons';
const {TextArea} = Input;
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },

};

class NewCampaign extends Component {

    render() {
        return (
            <Card style={{marginTop: "10%"}} id="content" className="card">
                <p></p>

                <p></p>
                {/* <Form className="container"

                      {...layout}
                      style={{paddingRight: 105}}
                      onSubmit={(event) => {
                          event.preventDefault()
                          const name = this.campaignName.value
                          const description = this.campaignDescription.value
                          const cause = this.campaignCause.value
                          const fundingGoal = window.web3.utils.toWei(this.campaignFundingGoal.value.toString(), 'Ether')

                          console.log(name, description, cause, fundingGoal)
                          this.props.createCampaign(name, description, cause, fundingGoal)
                      }}>
                    <Form.Item
                        id={"campaignName"}
                        name={['Campaign Name']}
                        label="Name"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input ref={(input) => {
                            this.campaignName = input
                        }}/>
                    </Form.Item>
                    <Form.Item
                        id={"campaignDescription"}
                        name={['Campaign Description']}
                        label="Description"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input.TextArea ref={(input) => {
                            this.campaignDescription = input
                        }}/>
                    </Form.Item>

                    <Form.Item name={['Campaign Cause']} label="Cause"
                               id={"campaignCause"}
                               rules={[
                                   {
                                       required: true,
                                   },
                               ]}
                    >
                        <Input.TextArea ref={(input) => {
                            this.campaignCause = input
                        }}/>
                    </Form.Item>
                    <Form.Item name={['Campaign Goal(Amount)']} label="Goal(Amount)"
                               id={"campaignFundingGoal"}
                               rules={[
                                   {
                                       required: true
                                   },
                               ]}
                    >
                        <InputNumber min ={0} style={{width: 124}} ref={(input) => {
                            this.campaignFundingGoal = input
                        }}/>
                    </Form.Item>
                    <Form.Item wrapperCol={{...layout.wrapperCol, offset: 8}}>
                        <Button type={"submit"} value={"Submit"}>
                            Create
                        </Button>
                    </Form.Item>


                </Form> */}


            <form className="container" style={{textAlign: "center"}} onSubmit={(event) => {
                event.preventDefault()
                const name = this.campaignName.value
                const description = this.campaignDescription.value
                const cause = this.campaignCause.value
                const fundingGoal = window.web3.utils.toWei(this.campaignFundingGoal.value.toString(), 'Ether')

                console.log(name, description, cause, fundingGoal)
                this.props.createCampaign(name, description, cause, fundingGoal)
                window.location.reload();
            }}>
                <label>
                    <div className="form-group">
                        <input
                        id="campaignName"
                        type="text"
                        ref={(input) => { this.campaignName = input }}
                        className="form-control"
                        placeholder="Name"
                        required />
                    </div>
                    <div className="form-group">
                        <input
                        id="campaignDescription"
                        type="text"
                        ref={(input) => { this.campaignDescription = input }}
                        className="form-control"
                        placeholder="Description"
                        required />
                    </div>
                    <div className="form-group">
                        <input
                        id="campaignCause"
                        type="text"
                        ref={(input) => { this.campaignCause = input }}
                        className="form-control"
                        placeholder="Cause"
                        required />
                    </div>
                    <div className="form-group">
                        <input
                        id="campaignFundingGoal"
                        type="text"
                        ref={(input) => { this.campaignFundingGoal = input }}
                        className="form-control"
                        placeholder="FundingGoal"
                        required />
                    </div>

                <button type="submit" className="btn btn-primary">Create</button>
                </label>
                </form>
            </Card>
        );
    }
}

export default NewCampaign;