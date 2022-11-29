function AllData() {
  const ctx = React.useContext(UserContext);
  return (
    <>
      <h5>All Data in Store</h5>
      <br/>
      <table className="table table-bordered table-hover">
        <thead className="thead-dark">
          <tr className="bold">
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Password</th>
            <th scope="col">Balance</th>
          </tr>
        </thead>
        <tbody>  
          {
            ctx.users.map((el,i) => (
              <tr scope="row" key={i}>
                <td>{el.name}</td>
                <td>{el.email}</td>
                <td>{el.password}</td>
                <td>{el.balance}</td>
              </tr>))
          }
        </tbody>
      </table>
    </>
  );
}
