import {useEffect, useState} from "react"
import axios from "axios"
import {Breadcrumb, Button, Form, List, Menu, Pagination, Spin} from "antd"
import {Link, useNavigate} from "react-router-dom"
import Avatar from "antd/es/avatar/avatar"
import Checkbox from "antd/es/checkbox/Checkbox"
import Layout, {Content, Header} from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import Input from "antd/es/input/Input";
import {Ariza} from "../../Components/Language";
import Excel from "../Excel/Excel";
import {Base64} from "js-base64";


function Qabul({language}) {

    const history = useNavigate()

    const [form] = Form.useForm();
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [changeClass, setChangeClass] = useState(
        localStorage.getItem("active-btn") ? localStorage.getItem("active-btn") : "students"
    )
    const [itemUrl, setItemUrl] = useState(localStorage.getItem("active-btn") ? localStorage.getItem("active-btn") : localStorage.setItem("active-btn", "students"))
    const [filterName, setFilterName] = useState('')
    const [filterPhone, setFilterPhone] = useState('')
    const [filterFaculty, setFilterFaculty] = useState('')
    const [count, setCount] = useState(0);
    const [pagination, setPagination] = useState(0);
    const [teacher,setTeacher] = useState(localStorage.getItem('user-data'));

    const {send, phone, name} = Ariza;

    useEffect(() => {

        if (!Boolean(teacher)) {
            history('/user')
        }
    }, [])

    useEffect(() => {
        // debugger
        if (changeClass === "students") getStudent("students")
        else if (changeClass === "pay") getStudent("pay")
        else if (changeClass === "nopay") getStudent("nopay")
        else if (changeClass === "payimage") getStudent("payimage")
        else getStudent(itemUrl)
    }, [])

    useEffect(() => {
        if (!filterName && !filterPhone && !filterFaculty) getStudent(changeClass)
    }, [filterName, filterPhone, filterFaculty])


    function getStudent(url) {
        setLoading(true)
        axios({
            method: "GET",
            url: "https://qoshmatalim.herokuapp.com/student/" + url + "?page=" + pagination,
            headers: {Authorization: "Bearer " + localStorage.getItem("Token")},
        })
            .then(res => {
                localStorage.setItem('EXCEL', Base64.encode(JSON.stringify(res.data.data)))
                setData(res.data.data)
                setLoading(false)
                setCount(res?.data?.count ? res?.data?.count : res?.data?.data ? res?.data?.data?.length : 0)
            })
            .catch(e => {
                setLoading(false)
                console.log(e)
            })
    }

    useEffect(() => {
        getStudent(itemUrl)
    }, [pagination]);

    function changeActive(url) {
        if (url === 'students') {
            localStorage.setItem("active-btn", url)
            setChangeClass('students')
            setItemUrl("students")
            clearFilter()
        } else if (url === "pay") {
            localStorage.setItem("active-btn", url)
            setChangeClass("pay")
            setItemUrl("pay")
            clearFilter()
        } else if (url === "nopay") {
            localStorage.setItem("active-btn", url)
            setChangeClass("nopay")
            setItemUrl("nopay")
            clearFilter()
        } else if (url === "payimage") {
            localStorage.setItem("active-btn", url)
            setChangeClass("payimage")
            setItemUrl("payimage")
            clearFilter()
        }
        getStudent(url)
    }

    function payment(id) {
        axios({
            method: "PUT",
            url: "https://qoshmatalim.herokuapp.com/student/payupdate/" + id,
            headers: {Authorization: "Bearer " + localStorage.getItem("Token")},
        })
            .then(res => {
                if (res.data.message.code === 0) {
                    getStudent(itemUrl)
                }
            })
            .catch(e => console.log(e))
    }


    function onFinish() {
        setLoading(true)

        const url = (itemUrl === 'students') ?
            'student/students/filter?name' + (filterName ? `=${filterName}` : "") + "&phone" + (filterPhone ? `=${filterPhone}` : "") + "&faculty" + (filterFaculty ? `=${filterFaculty}` : "") : itemUrl === 'pay' ?
                'student/pay/filter?name' + (filterName ? `=${filterName}` : "") + "&phone" + (filterPhone ? `=${filterPhone}` : "") + "&faculty" + (filterFaculty ? `=${filterFaculty}` : "") : itemUrl === 'nopay' ?
                    'student/nopay/filter?name' + (filterName ? `=${filterName}` : "") + "&phone" + (filterPhone ? `=${filterPhone}` : "") + "&faculty" + (filterFaculty ? `=${filterFaculty}` : "") :
                    'student/payimage/filter?name' + (filterName ? `=${filterName}` : "") + "&phone" + (filterPhone ? `=${filterPhone}` : "") + "&faculty" + (filterFaculty ? `=${filterFaculty}` : "")

        axios({
            method: "GET",
            url: 'https://qoshmatalim.herokuapp.com/' + url,
            headers: {Authorization: "Bearer " + localStorage.getItem("Token")},
        }).then(res => {
            if (res.data.message.code === 0) {
                setData(res.data.data)
                setLoading(false)
            } else {
                setLoading(false)
            }
        }).catch(e => {
            setLoading(false)
            console.log(e)
        })
    }

    function clearFilter() {
        setFilterPhone('')
        setFilterName('')
        setFilterFaculty('')
    }


    const students = [
        {name: 'Barcha talabalar', url: 'students'},
        {name: 'To\'lov qilgan talabalar', url: 'pay'},
        {name: 'To\'lov qilmagan talabalar', url: 'nopay'},
        {name: 'To\'lov rasimlar', url: 'payimage'},
    ]

    const onChange = (page) => {
        setPagination(page);
    };

    return (

        <div>

            <div className={"qabul"}>
                <div className='first-box'>
                    <Layout>
                        <Layout>
                            <Sider width={200} className="site-layout-background">
                                <h3 style={{color: 'white', padding: '15px 0 10px 30px'}}>Admin panel</h3>
                                <Menu
                                    theme="dark"
                                    mode="inline"
                                    defaultSelectedKeys={['1']}
                                    defaultOpenKeys={['sub1']}
                                    items={''}
                                    style={{
                                        height: '100%',
                                        borderRight: 0,
                                    }}>

                                    {students.map((item, index) => <Menu.Item
                                        className={localStorage.getItem('active-btn') === item.url ? 'active' : ""}
                                        onClick={() => changeActive(item.url)}>
                                        {item.name}
                                    </Menu.Item>)}
                                </Menu>
                            </Sider>
                        </Layout>
                    </Layout>
                </div>
                <div className='second-box'>
                    <div style={{position: 'relative'}}>
                        <Header className="header">
                            <div className="logo"/>
                            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                                <span style={{textAlign: "center"}}>Barcha abiturientlar</span>
                            </Menu>
                        </Header>
                        <Link to={'/user'} style={{position: 'absolute', right: '3%', top: '20%'}}>
                            <Button>
                                Chiqish
                            </Button>
                        </Link>
                    </div>

                    <div className={'second'}>
                        <h3>Yangiliklar</h3>

                        <Form
                            form={form}
                            name="basic"
                            onFinish={onFinish}>

                            <div className={'filter-qabul'}>
                                <Form.Item label={'Name'}>
                                    <Input value={filterName} onChange={e => setFilterName(e.target.value)}/>
                                </Form.Item>

                                <Form.Item label={'Phone'} name="phone">
                                    <Input value={filterPhone} onChange={e => setFilterPhone(e.target.value)}/>
                                </Form.Item>

                                <Form.Item label={'Faculty'} name="faculty">
                                    <Input value={filterFaculty} onChange={e => setFilterFaculty(e.target.value)}/>
                                </Form.Item>

                                <Form.Item label={'     '} wrapperCol={{offset: 8, span: 16,}}>
                                    {!loading && <Button type="default" onClick={() => clearFilter()}
                                                         disabled={!filterName && !filterPhone && !filterFaculty}
                                                         htmlType="button" className={'filter-btn'}>
                                        {'Clear'}
                                    </Button>}
                                </Form.Item>
                                <Form.Item label={'     '} wrapperCol={{offset: 8, span: 16,}}>
                                    {!loading && <Button type="primary" htmlType="submit" className={'filter-btn'}>
                                        {send[language]}
                                    </Button>}
                                </Form.Item>


                                <Excel/>
                            </div>
                        </Form>


                        {loading ? (
                            <Spin style={{marginTop: 10}} className={"small-spin"}/>
                        ) : (
                            <>
                                <br/>
                                <h4>{`Soni: ${count}`}</h4>
                                <List
                                    className='ul-li'
                                >
                                    <>
                                        {data.map((item, index) => <li style={{display: 'flex', alignItems: 'center'}}>
                                            <img className={'avatar-img'} src={item.picture || item.photo} alt=""/>
                                            <Link style={{display: 'block'}} to={"/user_for_admin/" + item._id}>
                                                <div className={"list-item"}>
                                                    {item?.name +
                                                        " " +
                                                        item?.lastName +
                                                        " " +
                                                        (item?.fatherName || item?.phone) +
                                                        (item?.education ? " | " : " ") +
                                                        (item?.education ? item?.education : "") +
                                                        (item?.language ? " | " : " ") +
                                                        (item?.language ? item?.language : "")}
                                                </div>
                                                <p style={{
                                                    paddingLeft: '10px',
                                                    fontWeight: '500'
                                                }}>{new Date(item.createdAt).toLocaleDateString()}</p>
                                            </Link>
                                            <div className={'checkbox'}>
                                                <Checkbox
                                                    checked={item.pay}
                                                    onChange={() => payment(item._id)}
                                                />
                                            </div>
                                        </li>)}
                                    </>
                                </List>
                                <Pagination defaultCurrent={pagination + 1} total={Math.ceil(count / 50) * 10}
                                            onChange={onChange}
                                            showQuickJumper
                                            responsive={true}
                                />

                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>


    )
}

export default Qabul
