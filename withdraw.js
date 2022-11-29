function Withdraw(){
  const [withdraw, setWithdraw]       = React.useState(0)
  const [withdrawn, setWithdrawn]     = React.useState(false); 
  const [notEnough, setNotEnough]     = React.useState(false);
  const ctx = React.useContext(UserContext);
  const user = ctx.users[ctx.currentUser];

  function handleWithdraw() {
    if (Number(user.balance) < Number(withdraw)) {
      setNotEnough(true);
      setTimeout(()=> setNotEnough(false), 5000);
      return;
    }

    user.balance = Number(user.balance) - Number(withdraw);
    setWithdraw(0);
    setWithdrawn(true);
    setTimeout(()=> setWithdrawn(false), 3000);
  }

  return (
    notEnough ? (
      <>
        <h1>Sorry You don't have enough money</h1>
        <img src="sorrynomoney.jpg" alt="No money"/>
      </>
    ) : (withdrawn) ? (
      <>
        <Card
          bgcolor="info"
          header="Withdraw"
          body= {
            <h1>Withdraw Completed!</h1>
          }
        />
      </>
    ) : (ctx.currentUser !== null) ? (
      <>
        <Card
          bgcolor="dark"
          header="Withdraw"
          body={
            <>
              Balance: ${JSON.stringify(user.balance)}
              <br/>
              Withdraw Amount
              <input
                type="number"
                min="0"
                className="form-control"
                id="withdraw"
                placeholder="Enter withdraw amount"
                value={withdraw}
                onChange={(e) => setWithdraw(e.currentTarget.value)}
              />
              <br/>
              <button
                type="submit"
                className="btn btn-light"
                onClick={handleWithdraw}
              >
                Withdraw
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
