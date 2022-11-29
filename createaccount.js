function CreateAccount() {
  const [show, setShow]             = React.useState(true);
  const [status, setStatus]         = React.useState("");
  const [name, setName]             = React.useState("");
  const [nameError, setNameError]   = React.useState("");
  const [email, setEmail]           = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [password, setPassword]     = React.useState("");
  const [passError, setPassError]   = React.useState("");
  const ctx = React.useContext(UserContext);

  function validateName(name) {
    if (!name) {
      setNameError("Name not Entered");
      return false;
    }
    setNameError("");
    return true;
  }

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
    if (ctx.users.map(el => el.email).indexOf(email) !== -1) {
      setEmailError("Email Already Exists");
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
    if (password.length < 8) {
      setPassError("Password has to be longer than 8 characters");
      return false;
    }
    setPassError("");
    return true;
  }

  function handleCreate() {
    let errorCount = 0;
    if (!validateName(name, "name")) errorCount++;
    if (!validateEmail(email, "email")) errorCount++;
    if (!validatePassword(password, "password")) errorCount++;
    if (errorCount > 0) {
      setStatus("Account Create Unsuccessful");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }

    ctx.users.push({ name, email, password, balance: 100 });
    setShow(false);
  }

  function clearForm() {
    setName("");
    setEmail("");
    setPassword("");
    setShow(true);
  }

  return (
    <Card
      bgcolor="primary"
      header="Create Account"
      status={status}
      body={
        show ? (
          <>
            Name {(<span className="red">{nameError}</span>)}
            <br />
            <input
              type="input"
              className="form-control"
              id="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            />
            <br />
            Email address {(<span className="red">{emailError}</span>)}
            <br />
            <input
              type="input"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <br />
            Password {(<span className="red">{passError}</span>)}
            <br />
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <br />
            <button
              type="submit"
              className="btn btn-light"
              onClick={handleCreate}
            >
              Create Account
            </button>
          </>
        ) : (
          <>
            <h5>Success</h5>
            <button type="submit" className="btn btn-light" onClick={clearForm}>
              Add another account
            </button>
          </>
        )
      }
    />
  );
}
