import React, { useState } from 'react';
import { Layout, Typography, Row, Col, Input, Button, Select, notification } from 'antd';
import axios from 'axios';
import ImageUploader from './imageUploader';
import { Link } from 'react-router-dom'

const { Header, Footer, Sider, Content } = Layout;


const { Title } = Typography;
const { TextArea } = Input;

const NewsUpload = () => {
    const [image, setimage] = useState('');
    const [heading, setheading] = useState('');
    const [source, setsource] = useState('');
    const [preference_id, setpreference_id] = useState(4);
    const [body, setbody] = useState('');


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
    const handleAddNews = () => {

        var data = new FormData();
        data.append("image", image);
        data.append("heading", heading);
        data.append("source", source);
        data.append("content", body);
        data.append("preferences", preference_id);

        axios({
            method: 'post',
            url: 'http://localhost:8383/admin/newsUpload',
            data: data,
        })
            .then(function () {
                //handle success
                notification.success({
                    message: 'Success',
                    description:
                        'News Uploaded Successfully',
                });
            })
            .catch(function (error) {
                //handle error
                notification.error({
                    message: 'ERROR',
                    description:
                        'News Uploaded Failed',
                });
            });
    }

    return (
        <>
            <Layout>
                <Header><Title className='header' level={4}>NEWS UPLOAD</Title></Header>
                <Content style={{ padding: '0 50px' }}>
                    <div className='mainContainer'>
                        <div className='uploadform'>
                            <Row>
                                <Col span={24}>
                                    <span>Heading</span>
                                    <Input
                                        placeholder="Heading"
                                        value={heading}
                                        name="heading"
                                        onChange={e => setheading(e.target.value)}
                                    />
                                    <span>Summary</span>
                                    <TextArea rows={4} onChange={e => setbody(e.target.value)} />
                                    <span>Source</span>
                                    <Input
                                        placeholder="Source"
                                        value={source}
                                        name="source"
                                        onChange={e => setsource(e.target.value)}
                                    />
                                    <span>Preference_id</span>
                                    <br></br>
                                    <Select
                                        style={{ width: '100%' }}
                                        placeholder="Please select category"
                                        value={preference_id}
                                        onChange={value => setpreference_id(value)}>
                                        {children}
                                    </Select>

                                    <Col span={4} offset={20}>
                                        <br></br>
                                        <Button
                                            type="primary"
                                            onClick={handleAddNews}
                                            size="large"
                                        >
                                            + Add News
                                        </Button>
                                    </Col>
                                </Col>
                            </Row>
                        </div>

                        <div className='uploadpreview'>
                            <br></br>
                            <br></br>
                            <span>Image Uploader</span>
                            <Col span={16}>
                                {/* <ImageUploader onUpload={file => setimage(file)}/> */}
                                <label for="img">Select image:</label>
                                <input type="file" id="img" name="img" accept="image/*" onChange={e => setimage(e.target.files[0])}></input>
                                <br></br>
                                <br></br>
                                <Link to="/">
                                    <Button size="large">
                                        Goto NewsList
                                            </Button>
                                </Link>
                            </Col>
                        </div>
                    </div>
                </Content>
            </Layout>
        </>
    )
}

export default NewsUpload;