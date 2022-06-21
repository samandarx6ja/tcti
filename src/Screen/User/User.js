import {useEffect, useRef, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {Alert, Button, Form, List, Spin} from "antd";
import Upload from "antd/es/upload/Upload";
import {Ariza} from "../../Components/Language";
import {jsPDF} from "jspdf";
import {toast} from "react-hot-toast";
import PDF from "../../Components/PDF/PDF";
import Excel from "../Excel/Excel";
import {Base64} from "js-base64";

const handleDownload = () => {

    const pdf = document.getElementById('PDF')

    const doc = new jsPDF("p", "pt", "a4");
    doc.html(pdf, {
        callback: function (doc) {
            doc.save('bySetApp.pdf');
        }
    });

};


function User({setUserName, language}) {


    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingBtn, setLoadingBtn] = useState(false)
    const [pdf, setPdf] = useState({})

    const history = useNavigate()

    const {
        name, lastName, fatherName, phone, birth, lang, district, education, street,
        faculty, form, gander, house, passport, passportIssued, picture, region, school, facultyName1, facultyName2,
        lang1, lang2, education1, education2, genderMale, genderWoman, send, downloadCheck,
        uploadingCheck
    } = Ariza

    useEffect(() => {
        localStorage.removeItem("active-btn")
        if (!localStorage.getItem("Token")) {
            history('/')
        }
    }, [])


    useEffect(() => {
        setLoading(true)
        axios({
            method: "GET",
            // url: "https://qoshmatalim.herokuapp.com/student",
            url: "https://qoshmatalim.herokuapp.com/student",
            headers: {"Authorization": "Bearer " + localStorage.getItem("Token")}
        }).then(res => {
            if (res.data.message.code === 0) {
                setData(res.data.data)
                setUserName(res.data.data)
                localStorage.setItem("user-data", res.data.data.teacher)
                setLoading(false)
                setPdf(res.data.data)
            } else {
                setLoading(false)
                toast.error(res.data.message)
            }

        }).catch(e => {
            setLoading(false)
            toast.error(e.message)
        })
    }, [])


    function onFinish(values) {
        setLoadingBtn(true)
        let dataForm = new FormData()
        dataForm.append("photo", values.photo.file)
        axios({
            method: 'POST',
            url: "https://qoshmatalim.herokuapp.com/student/sendimage",
            data: dataForm,
            headers: {"Authorization": "Bearer " + localStorage.getItem("Token")}
        }).then(res => {
            if (res.data.message.code === 0) {
                toast.success("")
            } else {
                toast.error('')
            }
            setLoadingBtn(false)

        }).catch(e => {
            toast.error("")
            setLoadingBtn(false)
        })

    }


    // PDF

    return (
        <>
            {loading ? <Spin className={'small-spin'}/> :

                <div>
                    <div className={'user-page'} style={{marginTop: 100}}>
                        <div className="user-1">
                            <Form
                                labelCol={{span: 4,}}
                                wrapperCol={{span: 14,}}
                                layout="horizontal"
                                initialValues={{size: '',}}
                                onFinish={onFinish}
                                size={''}>
                                <div style={{display: 'flex'}}>
                                    <Form.Item
                                        name="photo"
                                    >
                                        <Upload multiple accept={'.pdf'} beforeUpload={(file) => {
                                            return false
                                        }}
                                                name="logo" action="http://localhost:3000" listType="picture">
                                            <Button>{uploadingCheck[language]}</Button>
                                        </Upload>
                                    </Form.Item>

                                    <Button loading={loadingBtn} className={'form-btn'} type="primary" htmlType="submit">
                                        {send[language]}
                                    </Button>
                                </div>

                            </Form>
                        </div>
                        <div className="user-2">
                            <Button onClick={handleDownload} htmlType={"button"} type={'primary'}>{downloadCheck[language]}</Button>

                            {
                                !pdf?.teacher &&
                                <div className={'payment-alert'}>
                                    {!pdf?.pay ? <Alert message="To'lov yoq" type="error"/> :
                                        <Alert message="To'lov qilingan" type="success"/>}
                                </div>
                            }
                        </div>
                    </div>

                    <div style={{display: "flex", justifyContent: "center"}}>
                        <div style={{width: "80%"}}>
                            <PDF pdf={pdf} type={false} language={language}/>
                        </div>
                    </div>
                    <PDF pdf={pdf} type={true} language={language}/>

                </div>
            }


        </>
    )
}

export default User