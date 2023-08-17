import React from "react"


const Register = () => {

    const handleSubmit = event => {
        event.preventDefault()

        const form = event.currentTarget

        const name = form.elements.userName.value
        const email = form.elements.userEmail.value
        const password = form.elements.userPassword.value

        const finalUserData = {
            name,
            email,
            password
        }
        console.log('finalUserData', finalUserData);
        

    }
    return (
        <div>
            <h1>Register your Account</h1>
            <form onSubmit={handleSubmit}>
                <label>
                <p>Name:</p>
                <input name="userName" type="text" required minLength={2} />
                </label>
                <br />
                <label>
                <p>Email:</p>
                <input name="userEmail" type="email" required  />
                </label>
                <br />
                <label>
                <p>Password:</p>
                <input name="userPassword" type="password" required minLength={7} />
                </label>
                <br />
                <button type="submit">Sign In</button>
            </form>
        </div>
    )
}
export default Register