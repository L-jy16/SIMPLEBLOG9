import React, { useState } from 'react'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
                    <button type="submit" className="login__btn mt30">로그인</button>
                </fieldset>
            </form>
        </div>
    )
}

export default Login
