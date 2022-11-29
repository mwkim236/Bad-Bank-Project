function DeleteAccount() {
  const [show, setShow]             = React.useState(true);
  const [status, setStatus]         = React.useState("");
  const [email, setEmail]           = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [password, setPassword]     = React.useState("");
  const [passError, setPassError]   = React.useState("");
  const [index, setIndex]   = React.useState("");
  const ctx = React.useContext(UserContext);

  console.log(ctx)

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
  
  function handleDelete() {
    let errorCount = 0;
    if (!validateEmail(email)) errorCount++;
    if (!validatePassword(password)) errorCount++;
    if (errorCount > 0) return false;

    // check email & password match
    let ind = ctx.users.map(el => el.email).indexOf(email);
    let user = ctx.users[ind];
    setIndex(ind);
    console.log(user);
    if (user.password !== password) {
      setPassError('Wrong Password!');
    }
    else {
      console.log('password matches');
      setShow(false);
    }
  }

  function confirmDelete(ind) {
    setEmail("");
    setPassword("");
    setShow(true);
    ctx.users.splice(index, 1);
    setStatus("Account Deleted");
    setTimeout(() => {
      setStatus("")
    }, 3000);
  }

  function cancelDelete() {
    console.log('cancel delete')
    setEmail("");
    setPassword("");
    setShow(true);
    setStatus("Account Delete Canceled");
    setTimeout(() => {
      setStatus("")
    }, 3000);
  }

  return (
    <Card
      bgcolor="warning" 
      header="Delete Account"
      status={status}
      body={
        show ? (
        <>
          Email {(<span className="red">{emailError}</span>)}
          <br/>
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
            onClick={handleDelete}
          >
            Delete Account
          </button>
        </>
        ) : (
          <>
            <h5>Are you sure you want to delete account?</h5>
            <button type="submit" className="btn btn-light" onClick={confirmDelete}>
              YES
            </button><span> </span>
            <button type="submit" className="btn btn-light" onClick={cancelDelete}>
              NO
            </button>
          </>
        )
      }
    />
  );
}
