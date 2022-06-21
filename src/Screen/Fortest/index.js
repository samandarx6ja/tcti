import {Button, Form, Spin} from "antd";
import Input from "antd/es/input/Input";
import {Ariza} from '../../Components/Language'
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {toast} from "react-hot-toast";
import {useEffect, useState} from "react";
import ParticlesBg from 'particles-bg'

const ForTest = ({language, setUserName}) => {

    const [loading,setLoading] = useState(false)

    const history =  useNavigate()
    const {send, phone, name} = Ariza;

    useEffect(()=>{
        localStorage.removeItem('Token')
        localStorage.removeItem("user-data")
        setUserName(null)
    }, [])

    const onFinish = (values) => {

        setLoading(true)
        axios({
            method: "POST",
            url: "https://qoshmatalim.herokuapp.com/student/login",
            data: values
        }).then(res=>{
            if(res.data.code === 0) {
                localStorage.setItem("Token", res.data.token)
                history('/user')
            } else {
                toast.error(res.message)
            }
            setLoading(false)
        }).catch(e=>{
            console.log(e)
            setLoading(false)
            toast.error('Iltimos oldin ariza to\'ldiring')
        })
    };


    return <div>
        <ParticlesBg color="#0d3b66" type="cobweb" num={40} bg={true} />
        <div className={'login-box'}>
            <div className={'login-item'}>

                <Form
                    name="basic"
                    labelCol={{span: 8,}}
                    wrapperCol={{span: 16,}}
                    initialValues={{remember: true,}}
                    onFinish={onFinish}
                    autoComplete="off">

                    <Form.Item label={name[language]} name="name">
                        <Input required/>
                    </Form.Item>

                    <Form.Item label={phone[language]} name="phone">
                        <Input required/>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{offset: 8, span: 16,}}>
                        <Button className={'form-btn2'} type="primary" htmlType="submit" loading={loading} >
                            {send[language]}
                        </Button>
                    </Form.Item>
                </Form>
            </div>

        </div>


    </div>
}

export default ForTest
