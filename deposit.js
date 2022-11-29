function Deposit(){
  const [deposit, setDeposit]       = React.useState(0)
  const [depositted, setDepositted] = React.useState(false); 
  const ctx = React.useContext(UserContext);
  const user = ctx.users[ctx.currentUser];

  function handleDeposit() {
    console.log(deposit);
    console.log(user.balance);
    user.balance = Number(user.balance) + Number(deposit);
    setDeposit(0);
    setDepositted(true);
    setTimeout(()=> setDepositted(false), 3000);
  }

  return (
    depositted ? (
      <>
        <Card
          bgcolor="info"
          header="Deposit"
          body= {
            <h1>Deposit Completed!</h1>
          }
        />
      </>
    ) : 
    (ctx.currentUser !== null) ? (
      <>
        <Card
          bgcolor="secondary"
          header="Deposit"
          body={
            <>
              Balance: ${JSON.stringify(user.balance)}
              <br/>
              Deposit Amount
              <input
                type="number"
                min="0"
                className="form-control"
                id="deposit"
                placeholder="Enter deposit amount"
                value={deposit}
                onChange={(e) => setDeposit(e.currentTarget.value)}
              />
              <br/>
              <button
                type="submit"
                className="btn btn-dark"
                onClick={handleDeposit}
              >
                Deposit
              </button>

            </>
          }
        />
      </>) : (
      <>
        <h1>Please Log In</h1>
      </>
    )
  )
}
