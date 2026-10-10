import { useState } from "react"
import "./auth.css"
function LoginAuth()
{
    const [email,setEmail] = useState<String>();
    const [password,setPassword] = useState <String> ()

    return (<>
                <form action="" method="post">
        <div className = "title">
            <h2>Login</h2>
        </div>
        <div>
            <input type="email" placeholder="email"/>
            <input type="password" placeholder="password"/>
            
        </div>
        

    </form>
    </>

    )
}
export default LoginAuth