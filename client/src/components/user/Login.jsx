import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import firebase from "../../firebase.js";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

    const LoginFunc = async (e) => {
        e.preventDefault();
        if (!(email && password)) {
            return alert("모든 값을 채워주세요");
        }
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            alert("로그인 성공하셨습니다.")
            navigate("/")
        }
        catch (err) {
            console.log(err)
            if (err.code === "auth/invalid-email") {
                setErrorMsg("존재하지 않은 이메일입니다.")
            } else if (err.code === "auth/invalid-credential") {
                setErrorMsg("비밀번호가 일치하지 않습니다.")
            } else {
                setErrorMsg("로그인 실패하였습니다.")
            }
        }
    }

    return (
        <div className='login__wrap'>
            <div className='login__header'>
                <h2> 로그인 </h2>
            </div>
            <form>
                <fieldset>
                    <legend className="blind">로그인 영역</legend>
                    <div>
                        <label htmlFor="youEmail" className="required blind">이메일</label>
                        <input
                            type="email"
                            id="youEmail"
                            name="youEmail"
                            placeholder="이메일"
                            autoComplete="off"
                            className="input__style"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.currentTarget.value)} />
                    </div>
                    <div>
                        <label htmlFor="youPass" className="required blind">비밀번호</label>
                        <input
                            type="password"
                            id="youPass"
                            name="youPass"
                            placeholder="비밀번호"
                            autoComplete="off"
                            className="input__style"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.currentTarget.value)}
                        />
                    </div>
                    <div>
                        {errorMsg !== "" && <p>{errorMsg}</p>}
                    </div>
                    <button type="submit" onClick={(e) => LoginFunc(e)} className="login__btn mt30">로그인</button>
                </fieldset>
            </form>
        </div>
    )
}

export default Login
