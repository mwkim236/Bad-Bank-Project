function Login() {
  const ctx = React.useContext(UserContext);
  const [loggedOut, setLoggedOut]     = React.useState(false);
  const [email, setEmail]           = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [password, setPassword]     = React.useState("");
  const [passError, setPassError]   = React.useState("");

  function isEmailValid(mail) {
    return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail));
  }

  function validateEmail(email) {
    if (!email) {
      setEmailError("Email not entered");
      return false;
    }
    if (!isEmailValid(email)) {
      setEmailError("Invalid email address!");
      return false;
    }
    let ind = ctx.users.map(el => el.email).indexOf(email);
 
    if (ind === -1) {
      setEmailError("Email not found");
      return false;
    }
    setEmailError("");
    return true;
  }

  function validatePassword(password) {
    if (!password) {
      setPassError('password not entered');
      return false;
    }
    setPassError("");
    return true;
  }

  function handleLogin() {
    let errorCount = 0;
    if (!validateEmail(email)) errorCount++;
    if (!validatePassword(password)) errorCount++;
    if (errorCount > 0) return false;

    // check email & password match
    let ind = ctx.users.map(el => el.email).indexOf(email);
    let user = ctx.users[ind];
    if (user.password !== password) {
      setPassError('Wrong Password!');
    }
    else {
      ctx.currentUser = ind;
      //login success!
      //display buttons to direct to deposit & withdraw
      setEmail("")
    }
  }

  function handleLogout() {
    ctx.currentUser = null;
    setLoggedOut(true);
    setTimeout(()=> setLoggedOut(false), 3000)
  }

  console.log('rerender')
  console.log(ctx)

  return (
    <Card
      bgcolor="success" 
      header="Login"
      body={

        loggedOut ? (
          <>
            <p>successfully logged out</p>
          </>
        ) :

        (ctx.currentUser === null) ? (
        <>
          Email {(<span className="red">{emailError}</span>)} <br/>
          <input
            type="input"
            className="form-control"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />

          Password {(<span className="red">{passError}</span>)}
          <br/>
          <input
            type="password"
            className="form-control"
            id="email"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <br/>
          <button
            type="submit"
            className="btn btn-light"
            onClick={handleLogin}
          >Log In
          </button>
        </>
        ) : (
          <>
            <h1>Log In Successful!</h1>
            <h2>Welcome!</h2>
            <h2>{JSON.stringify(ctx.users[ctx.currentUser].name)}</h2>
            <button className="btn btn-dark" onClick={handleLogout}>Log Out</button>
          </>
        )
      }
    />
  );
}
