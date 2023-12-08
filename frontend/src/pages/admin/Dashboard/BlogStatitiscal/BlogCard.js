import React, {useEffect, useState} from "react";
import {Col, Row} from "react-bootstrap";
import CardInfo from "~/pages/admin/Dashboard/Card/CardInfo";
import {useDispatch , useSelector} from "react-redux";
import {getCountBlog} from "~/redux/statitiscalApi";

export default function BlogCard() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const [countBlog,setCountBlog] =  useState({});
    useEffect(() =>{
        getCountBlogMethod();
    },[])
    const getCountBlogMethod = async () =>{
        const response = await getCountBlog(user?.jwt,dispatch,'');
        const responseActive = await getCountBlog(user?.jwt,dispatch,'ACTIVE');
        const responseDelete = await getCountBlog(user?.jwt,dispatch,'DELETE');
        setCountBlog({
            all: response[0]?.count,
            active : responseActive[0]?.count,
            delete : responseDelete[0]?.count
        })
    }
    return (
        <div>
            <Row>
                <Col md={4}>
                    <CardInfo value={countBlog.all} color={'green'}  title={'Blog all'}></CardInfo>
                </Col>
                <Col md={4}>
                    <CardInfo value={countBlog.active} color={'blue'} title={'Blog active'}></CardInfo>
                </Col>
                <Col md={4}>
                    <CardInfo value={countBlog.delete} color={'red'} title={'Blog delete'}></CardInfo>
                </Col>
            </Row>
        </div>
    );
}