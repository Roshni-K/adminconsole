import React, { useState, useEffect, Component } from 'react';
import { Table, Tag, Space, Select, Button, notification } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom'
import headerpng from '../header.png';
import footerpng from '../header.png';
import NewsPlaceholder from '../newsCard.png';
import { render } from 'react-dom';

const { Option } = Select;
const columns = [
    {
        title: 'Heading',
        dataIndex: 'heading',
        key: 'heading',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Body',
        dataIndex: 'body',
        key: 'body',
    },
    {
        title: 'Uploaded By',
        key: 'uploaded_By',
        dataIndex: 'uploaded_By',
    },
    {
        title: 'Status',
        key: 'status',
        dataIndex: 'status',
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <Space size="middle">
                <a>Publish</a>
                <a>Delete</a>
            </Space>
        ),
    },
];

const PreferenceMapping = {
    1: 'politics',
    2: 'governance',
    3: 'covid',
    4: 'sports',
    5: 'technology',
    6: 'international',
    7: 'science',
    8: 'trending'
}

const children = [
    { key: 'politics', value: 1 },
    { key: 'sports', value: 4 },
    { key: 'technology', value: 5 },
    { key: 'science', value: 7 },
    { key: 'trending', value: 8 },
    { key: 'international', value: 6 },
    { key: 'governance', value: 2 },
    { key: 'covid', value: 3 }].map(data => {
        return <Option value={data.value}>{data.key}</Option>
    })

class NewsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCategory: 1,
            coldata: {}
        };
    }
    componentDidMount() {
        axios.get('http://localhost:8383/admin/newsList')
            .then((response) => {
                this.setState({
                    coldata: response.data.preferences
                })
            })
            .catch((error) => {
                // handle error
                notification.error({
                    message: 'ERROR',
                    description:
                        'News Load Failed',
                });
            });
    }

    handleCategoryChange = (value) => {
        console.log(value)
        this.setState({
            selectedCategory: value
        })
    }


    render() {
        console.log(this.state.coldata[PreferenceMapping[this.state.selectedCategory]], this.state.selectedCategory, this.state.coldata)
        return (
            <div>
                <div>Select Category</div>
                <Select
                    style={{ width: '30%' }}
                    placeholder="Please select"
                    value={this.state.selectedCategory}
                    onChange={this.handleCategoryChange}>
                    {children}
                </Select>

                <Link to="/newsUpload">
                    <Button>
                        Add News
                     </Button>
                </Link>

                <br></br>
                <br></br>
                <div className='listContainer'>
                    <div className='listData'>
                        <Table columns={columns} dataSource={this.state.coldata[PreferenceMapping[this.state.selectedCategory]]} />
                    </div>
                    <div className='preview'>Preview
                <div className='mobileView'>
                            <img style={{ width: 'inherit', height: 'inherit' }} src={NewsPlaceholder}></img>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default NewsList;