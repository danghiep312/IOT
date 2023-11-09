import React from 'react';
import './Profile.css';

const avatar = "avatar.jpg"

export default function Profile() {
    return (
            <div className="all"
                style={{
                    height: "100vh"}}>
                <section className="w-100 px-4 py-5">
                    <div className="row d-flex justify-content-center">
                        <div className="col col-lg-7 mb-4 mb-lg-0">
                            <div className="card">
                                <div className="row g-0">
                                    <div className="col-md-4 gradient-custom text-center text-white"
                                        // style="border-top-left-radius: .5rem; border-bottom-left-radius: .5rem;"
                                         style={{
                                             borderTopLeftRadius: ".5rem",
                                             borderBottomLeftRadius: ".5rem"
                                         }}
                                    >
                                        <img
                                            src={avatar}
                                            alt="avatar" className="img-fluid my-5" style={{width: "100%"}}/>
                                        <h5>Đặng Hoàng Hiệp</h5>
                                        <p>Developer</p>
                                        <i className="far fa-edit mb-5"></i>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body p-4">
                                            <h6>Information</h6>
                                            <hr className="mt-0 mb-4"/>
                                            <div className="row pt-1">
                                                <div className="col-6 mb-3">
                                                    <h6>ID</h6>
                                                    <p className="text-muted">B20DCCN236</p>
                                                </div>
                                                <div className="col-6 mb-3">
                                                    <h6>Group</h6>
                                                    <p className="text-muted">IOT_09</p>
                                                </div>
                                            </div>
                                            {/*<h6>Projects</h6>*/}
                                            {/*<hr className="mt-0 mb-4"/>*/}
                                            <div className="row pt-1">
                                                <div className="col-6 mb-3">
                                                    <h6>Email</h6>
                                                    <p className="text-muted">hiepdang0312@gmail.com</p>
                                                </div>
                                                <div className="col-6 mb-3">
                                                    <h6>Phone</h6>
                                                    <p className="text-muted">0967890558</p>
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-start">
                                                <a href="#!"><i className="fab fa-facebook-f fa-lg me-3"></i></a>
                                                <a href="#!"><i className="fab fa-twitter fa-lg me-3"></i></a>
                                                <a href="#!"><i className="fab fa-instagram fa-lg"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

    );
}