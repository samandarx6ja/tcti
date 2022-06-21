import {useEffect, useState} from "react"
import homeImg from "../../home-img.png"
import ParticlesBg from "particles-bg"
import {Ariza} from "../../Components/Language"
import {Card, Col, Row} from "antd";
import firstPhoto from '../../images/news/1.jpeg'
import secondPhoto from '../../images/news/2.jpeg'
import thirdPhoto from '../../images/news/3.jpeg'
import fourPhoto from '../../images/news/4jpeg.jpeg'
import fivePhoto from '../../images/announcement/5.jpg'
import sixPhoto from '../../images/announcement/6.jpg'
import sevenPhoto from '../../images/announcement/7.jpg'
import {EnvironmentFilled, MailFilled, PhoneFilled, YoutubeFilled} from "@ant-design/icons";
import ReactPaginate from "react-paginate";
import qabulHero from '../../images/qabulHero.png';

const Home = ({setUserName, language}) => {
    const {news, announcement, router} = Ariza

    // useEffect(() => {     localStorage.removeItem("Token")
    // localStorage.removeItem("user-data")     setUserName(null) }, [])

    const style = {
        padding: '10px'
    };

    // data 
    const [postsPaginate, setPostsPaginate] = useState(posts);
    const [pageNumber, setPageNumber] = useState(0);

    const postsPerPage = 4;
    const pagesVisited = pageNumber * postsPerPage;

    const displayPosts = postsPaginate
                            .slice(pagesVisited, pagesVisited + postsPerPage)
                            .map(post=>{
                                return(
                                    <Col className="gutter-row" span={6} key={post.id}>
                                    <div style={style}>
                                        <Card hoverable="hoverable"  style={{ height: 350, width: 250 }} cover={
                                        <img alt = "" style = {{height: 180}} src = { post.img  } />}>
                                            <div  style={{ height: 100 }}>
                                                <a href="/">{post.text}</a>
                                            </div>
                                            <h4>{post.date}</h4>
                                        </Card>
                                    </div>
                                </Col>
                                )
                            })

    const pageCount = Math.ceil(posts.length / postsPerPage);

    const changePage = ({selected}) => {
        setPageNumber(selected)
    }
    // data 2
    const [postsPaginate2, setPostsPaginate2] = useState(posts);
    const [pageNumber2, setPageNumber2] = useState(0);

    const postsPerPage2 = 3;
    const pagesVisited2 = pageNumber2 * postsPerPage2;

    const displayPosts2 = postsPaginate2
                            .slice(pagesVisited2, pagesVisited2 + postsPerPage2)
                            .map(post=>{
                                return(
                                    <div className="row-4-3" key={post.id}>
                                    <Col className="gutter-row" span={8}>
                                        <div style={style}>
                                            <Card  hoverable="hoverable" style={{ height: 350, width: 300  }} cover={
                                            <img alt = ""  style = {{height: 180}}
                                                src = {post.img} />}>
                                                <div style={{ height: 100 }}>
                                                    <a href="/">{post.text}</a>
                                                </div>
                                            </Card>
                                        </div>
                                    </Col>
                                </div>
                                )
                            })

    const pageCount2 = Math.ceil(posts.length / postsPerPage2);

    const changePage2 = ({selected}) => {
        setPageNumber2(selected)
    }

    return (
        <div className='container'>

            <ParticlesBg color='#0d3b66' type='cobweb' num={35} bg={true}/>

            <div
                className={"home-img"}
                style={{
                    marginTop: 120
                }}>
                <img src={qabulHero} alt=''/>
            </div>

            <div className={"rectangle"}>
                <div className={'home-title'}>
                    <h1
                        style={{
                            color: "#00a0e9",
                            marginTop: 15
                        }}>{news[language]}</h1>
                </div>

                <div>
                    <div
                        className='row'
                        style={{
                            marginBottom: 30
                        }}>
                        {
                           displayPosts
                        }
                        <ReactPaginate 
                            breakLabel="..."
                            previousLabel="<"
                            nextLabel=">"
                            onPageChange={changePage}
                            pageRangeDisplayed={5}
                            pageCount={pageCount}
                            renderOnZeroPageCount={null}
                            containerClassName={"react-pagination-me"}
                            previousLinkClassName={'prevPaginateBtn'}
                            nextLinkClassName={'prevPaginateBtn'}
                            disabledClassName={'not-active-paginate'}
                            activeClassName={'active-paginate'}
                        />
                    </div>
                </div>
            </div>

            <div className={"announcement"}>
                <div className={'home-title'}>
                    <h1
                        style={{
                            color: "#00a0e9",
                            marginTop: 15
                        }}>{announcement[language]}</h1>
                </div>

                <div>
                    <div className='row'>
                        {displayPosts2}
                        <ReactPaginate 
                            breakLabel="..."
                            previousLabel="<"
                            nextLabel=">"
                            onPageChange={changePage2}
                            pageRangeDisplayed={5}
                            pageCount={pageCount2}
                            renderOnZeroPageCount={null}
                            containerClassName={"react-pagination-me"}
                            previousLinkClassName={'prevPaginateBtn'}
                            nextLinkClassName={'prevPaginateBtn'}
                            disabledClassName={'not-active-paginate'}
                            activeClassName={'active-paginate'}
                        />
                    </div>
                </div>
            </div>

            <div className={'rectangle'}>
                <div className={'home-title'}>
                    <h1
                        style={{
                            color: "#00a0e9",
                            marginTop: 15
                        }}>{router[language]}</h1>
                </div>

                <div className="row">
                    <Col span={6} gutter={[6, 12, 12, 24]} className='gutter-row'>
                        <div
                            style={{
                                width: 300,
                                textAlign: "center"
                            }}>
                            <div className='numbers'>
                                <b>1</b>
                            </div>

                            <div>
                                <h1
                                    style={{
                                        color: "#00a0e9"
                                    }}>Arizani to'ldiring</h1>
                            </div>
                            <div>
                                <h3
                                    style={{
                                        color: "#00a0e9"
                                    }}>
                                    Ariza formasini to'ldiring va kerakli hujjatlarni tizimga yuklang
                                </h3>
                            </div>
                        </div>

                    </Col>

                    <Col span={6} gutter={[6, 12, 12, 24]} className='gutter-row'>
                        <div
                            style={{
                                width: 300,
                                textAlign: "center"
                            }}>
                            <div className='numbers'>
                                <b>2</b>
                            </div>

                            <div>
                                <h1
                                    style={{
                                        color: "#00a0e9"
                                    }}>Yo'nalishni tanlang</h1>
                                <h3
                                    style={{
                                        color: "#00a0e9"
                                    }}>
                                    Ariza topshirmoqchi bo'lgan ta'lim yo'nalishlaridan birini tanlang
                                </h3>
                            </div>
                        </div>
                    </Col>

                    <Col span={6} gutter={[6, 12, 12, 24]} className='gutter-row'>
                        <div
                            style={{
                                width: 300,
                                textAlign: "center"
                            }}>
                            <div className='numbers'>
                                <b>3</b>
                            </div>

                            <div>
                                <h1
                                    style={{
                                        color: "#00a0e9"
                                    }}>Arizani tasdiqlang</h1>
                                <h3
                                    style={{
                                        color: "#00a0e9"
                                    }}>
                                    Ariza va hujjatlaringiz universitet qabul komissiyasi tomonidan ko'rib chiqilib
                                    tasdiqlanadi
                                </h3>
                            </div>
                        </div>
                    </Col>
                    <div className="gutter-row">
                        <Col span={6} gutter={[6, 12, 12, 24]} className='gutter-row'>
                            <div
                                style={{
                                    width: 300,
                                    textAlign: "center",
                                    marginTop: 25
                                }}>
                                <div className='numbers'>
                                    <b>4</b>
                                </div>

                                <div>
                                    <h1
                                        style={{
                                            color: "#00a0e9"
                                        }}>Qaydnomani yuklab oling</h1>
                                </div>
                                <div>
                                    <h3
                                        style={{
                                            color: "#00a0e9"
                                        }}>
                                        Login va parol orqali tizimga kiring hamda abituriyent qaydnomasini yuklab oling
                                    </h3>
                                </div>
                            </div>

                        </Col>
                    </div>

                </div>
                <div className="youtube">
                    <button className="youtube-btn">
                        <a
                            style={{
                                color: "red"
                            }}
                            href="/">
                            <YoutubeFilled/>
                            <b>TO'LIQ YO'RIQNOMA</b>
                        </a>
                    </button>
                </div>

            </div>

            <div className={'rectangle2'}>
                <div>
                    <h3
                        style={{
                            color: "white"
                        }}><EnvironmentFilled/>
                        <b>Manzil:</b>
                        <a target="_blank" href="https://goo.gl/maps/yTkSZdFJnDFJiZDj8">
                            <b
                                style={{
                                    color: "white"
                                }}>
                                Toshkent sh. Navoiy ko'chasi, 32-uy, 100011</b>
                        </a>
                    </h3>
                    <h3
                        style={{
                            color: "white"
                        }}><PhoneFilled/>
                        Telefon:
                        <a
                            style={{
                                color: "white"
                            }}
                            href="tel:+998712447915">
                            (998-71) 244-79-15
                        </a>,
                        <a
                            style={{
                                color: "white"
                            }}
                            href="tel:+998712447918">
                            (998-71) 244-79-18
                        </a>,<a
                            style={{
                color: "white"
            }}
                            href="tel:+998712447920">
                            (998-71) 244-79-20
                        </a>
                    </h3>
                    <h3
                        style={{
                            color: "white"
                        }}><MailFilled/>
                        Email:
                        <a
                            style={{
                                color: "white"
                            }}
                            href="mailto:info@tcti.uz">
                            info@tcti.uz</a>
                    </h3>
                </div>
            </div>
            <br/>
        </div>
    )
}

export default Home

// fake data
const posts = [
    {
        id: 1,
        text: 'Toshkent kimyo-texnologiyalari instituti rektori Toshkent kimyo-texnologiyalar' +
                ' instituti Yangiyer filialiga tashrif buyurdi',
        img: firstPhoto,
        date: '13.04.2022'
    }, {
        id: 2,
        text: 'Najot - maktabda, najot - ta\'limda, najot - bilimda!',
        img: secondPhoto,
        date: '13.04.2022'
    }, {
        id: 3,
        text: '"Korrupsiyasiz soha" loyihasi amalda',
        img: thirdPhoto,
        date: '13.04.2022'
    }, {
        id: 4,
        text: 'Vinochilik texnologiyasi va sanoat uzumchilik fakulteti "Karyera kuni" bo\'lib' +
                ' o\'tdi',
        img: fourPhoto,
        date: '13.04.2022'
    }, {
        id: 5,
        text: 'Toshkent kimyo-texnologiyalari instituti rektori Toshkent kimyo-texnologiyalar' +
                ' instituti Yangiyer filialiga tashrif buyurdi',
        img: firstPhoto,
        date: '13.04.2022'
    }, {
        id: 6,
        text: 'Najot - maktabda, najot - ta\'limda, najot - bilimda!',
        img: firstPhoto,
        date: '13.04.2022'
    }, {
        id: 7,
        text: '"Korrupsiyasiz soha" loyihasi amalda',
        img: firstPhoto,
        date: '13.04.2022'
    }, {
        id: 8,
        text: 'Vinochilik texnologiyasi va sanoat uzumchilik fakulteti "Karyera kuni" bo\'lib' +
                ' o\'tdi',
        img: firstPhoto,
        date: '13.04.2022'
    }
]
