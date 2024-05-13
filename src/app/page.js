"use client"
import Navbar from './componnent/NavbarComponent/navBar';
import { Carousel, Card } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'react-bootstrap/Image';
import {
  API_HOUSE_ESTATE,
} from '../../api'
import GetRequest from './ConfigAPI'

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fecthHouse_Estate() {
      try {
        const result = await GetRequest(API_HOUSE_ESTATE, 'GET', null);
        setData(result.data);
        console.log(result.data);

      } catch (error) {
        console.log('error', error);
      }
    }
    fecthHouse_Estate();
  }, []);

  return (
    <>
      <Navbar />
      <div className='container-color'>
        <div className='row'>
          <div className='col-md-12 mb-4' >
            <Carousel >
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="/images/Life.jpg"
                  alt="First slide"
                  style={{ width: '1080px', height: '800px' }}
                />
                <Carousel.Caption>
                  {data[0] && data.map((val, idx) => (
                    <h1>{val.name} </h1>
                  ))}
                  <p>บ้านเลอค่าดุจมนี.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="/images/Main-Site.jpg"
                  alt="Second slide"
                  style={{ width: '1080px', height: '800px' }}
                />
                <Carousel.Caption>
                  {data[0] && data.map((val, idx) => (
                    <h1>{val.name} </h1>
                  ))}
                  <p>บ้านเลอค่าดุจมณี.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="/images/asagha.jpg"
                  alt="Third slide"
                  style={{ width: '1080px', height: '800px' }}
                />
                <Carousel.Caption>
                  {data[0] && data.map((val, idx) => (
                    <h1 >{val.name} </h1>
                  ))}
                  <p>บ้านเลอค่าดุจมณี.</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>
          <div className='col-md-12'>
            <div className='container-fluid px-5'>
              <div className='row'>


                <div className="container marketing " id='section1'>
                  <div className="p-5 mb-4 bg-light rounded-3">
                    <div className="container-fluid py-5">
                      {data[0] && data.map((val, idx) => (
                        <h1 className="display-5 fw-bold">{val.name}</h1>
                      ))}
                      {data[0] && data.map((val, idx) => (
                        <p className="col-md-8 fs-4">
                          พิเศษของโครงการนี้ ทำให้คุณได้สัมผัสถึงความอบอุ่นและความเป็นส่วนตัวของบ้านในคำพูดที่เราสร้างขึ้น เข้ามาค้นพบความสุขและความสมบูรณ์ของชีวิตใน '{val.name}' กับเราวันนี้ !!!
                        </p>
                      ))}
                    </div>
                  </div>
                  <div className="row align-items-md-stretch">
                    <div className="col-md-6">
                      <div
                        className="h-100 p-5 text-white bg-dark rounded-3"
                        style={{
                          backgroundImage: `url(/images/Life.jpg)`,
                          backgroundSize: "cover"
                        }}
                      >
                        <h2>จองได้แล้ววันนี้ !!!</h2>
                        <button className="btn btn-outline-light" type="button">
                          จองเลย
                        </button>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="h-100 p-5 bg-light border rounded-3">
                        <h2>แนวคิดของโครงการ</h2>
                        {data[0] && data.map((val, idx) => (
                          <p className="lead">
                            แนวคิดหลักของ "{val.name}" คือการสร้างบ้านที่เป็นที่อยู่อาศัยที่มีคุณภาพและสะดวกสบายตามกระแสสมัยในย่านที่เติบโตอย่างรวดเร็ว ด้วยคำคมที่โดดเด่นเช่น "ความสุขคือการมีบ้านที่สร้างให้เรา" หรือ "บ้านไม่ใช่เพียงแค่สถานที่ แต่เป็นช่องที่อุ่นใจของเรา" เราจะสร้างประสบการณ์ให้กับลูกค้าของเราที่หน้าเว็บไซต์โดยการเน้นที่คำพูดที่สร้างสรรค์และแรงบันดาลใจ เช่น "เราไม่ได้ขายบ้าน แต่เราขายความฝันของคุณ" หรือ "{val.name} สร้างบ้าน เพื่อให้คุณสร้างประสบการณ์ที่ไม่มีวันลืม" ด้วยการใช้คำพูดที่โดดเด่นและชัดเจน เราจะสร้างความประทับใจและเป็นที่จดจำในใจของลูกค้าของเราในทุกการติดต่อที่เกิดขึ้นในหน้าเว็บไซต์ของเรา.
                          </p>))}

                        <button className="btn btn-outline-secondary" type="button">
                          อ่านเพิ่ม
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="row featurette mt-4 mb-4">
                    <div className="col-md-7 p-5 bg-light border rounded-3">
                      <h2 className="featurette-heading">ห้องนอนให้เป็นรองรับทุกสถานการณ์ของชีวิต <span className="text-muted">It’ll blow your mind.</span></h2>
                      {data[0] && data.map((val, idx) => (
                        <p className="lead">{val.name} ให้ความสำคัญกับความสบายสบายและความสงบสุข ด้วยการออกแบบที่พิถีพิถันและสม่ำเสมอ เราเชื่อว่าห้องนอนคือศูนย์กลางของความสุขของคุณ ดังนั้นเราได้นำเสนอพื้นที่ที่มอบความสบาย สะดวกสบายและความเป็นส่วนตัวให้กับผู้อยู่อาศัยทุกคน เราให้คำอธิบายถึงห้องนอนใน 'พวงเพรช 4' ว่าเป็นสถานที่ที่ให้คุณเริ่มต้นและสิ้นสุดวันของคุณด้วยความสงบสุขและความเพลิดเพลิน พร้อมทั้งเป็นพื้นที่ที่ทุกคนสามารถหลับใหลในสบายใจได้อย่างแท้จริง.</p>
                      ))}
                      <button className="btn btn-outline-secondary" type="button">
                        อ่านเพิ่ม
                      </button>
                    </div>
                    <div className="col-md-5 order-md-1">
                      <Image
                        src="\images\indor2.jpg"
                        width={745}
                        height={600}
                        className="rounded border"
                      />
                    </div>
                  </div>

                  <div className="row featurette mt-4 mb-4">
                    <div className="col-md-7 order-md-2 p-5 bg-light border rounded-3">
                      <h2 className="featurette-heading">นอกเหนือจากบ้านที่สวยงามและสะดวกสบายที่. <span className="text-muted">See for yourself.</span></h2>
                      {data[0] && data.map((val, idx) => (
                        <p className="lead"> '{val.name}' มอบให้กับคุณ เรายังให้ความสำคัญกับห้องครัว เป็นส่วนสำคัญที่จะเป็นศูนย์กลางของครอบครัวและที่มีความสุขของคุณ เราออกแบบห้องครัวให้เป็นที่ที่ทุกคนในครอบครัวมีส่วนร่วมในการทำอาหารและสร้างความสนุกสนาน ด้วยอุปกรณ์ที่ใช้งานง่ายและมีคุณภาพ พร้อมพื้นที่ที่กว้างขวางเพื่อให้คุณมีส่วนที่จะสร้างสรรค์ และสร้างประสบการณ์ครัวที่น่าจดจำได้อย่างที่คุณต้องการ.</p>

                      ))}
                      <button className="btn btn-outline-secondary" type="button">
                        อ่านเพิ่ม
                      </button>
                    </div>
                    <div className="col-md-5 order-md-1">
                      <Image
                        src="\images\kit.jpg"
                        width={745}
                        height={600}
                        className="rounded border"
                      />
                    </div>

                  </div>
                  <br />
                  <br />
                  <div className="container text-center mt-4 mb-4" id='section2'>
                    <Image
                      src="\images\profile.png"
                      alt="Logo"
                      width={130}
                      height={130}
                      className="rounded border"
                    />
                    {data[0] && data.map((val, idx) => (
                      <div key={idx}>
                        <br />
                        <p>ผู้บริหาร {val.md_name}</p>
                        <p> {val.company} </p>
                      </div>
                    ))}
                    <br />
                    <br />
                    <br />

                    {data[0] && data.map((val, idx) => (
                      <div className='container' key={idx}>
                        <h2>ทำเลที่ตั้ง</h2>
                        <p>{val.address} </p>
                        <p>สะดวกทุกการเดินทาง พร้อมเข้าถึงทุกเส้นทางได้อย่างรวดเร็ว
                          บนทำเลคุณภาพ รายล้อมด้วยสิ่งอำนวยความสะดวกครบครัน
                          ทั้ง สนามบิน โลตัส โฮมโปร รวมถึงโรงพยาบาล และสถานศึกษาชั้นนำ​.</p>
                      </div>
                    ))}
                  </div>
                </div >
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1137.6161183308652!2d102.79695610219576!3d16.45175965944799!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x312261dc935121f9%3A0xc255b3873a211c67!2z4Lir4Lih4Li54LmI4Lia4LmJ4Liy4LiZ4Lie4Lin4LiH4LmA4Lie4LiK4LijIDQ!5e0!3m2!1sth!2sth!4v1714397807817!5m2!1sth!2sth" width="100%" height="50%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
              </div>
              <br />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

