function Spa() {

  return (
    <HashRouter>
      <NavBar/>

      <UserContext.Provider 
        value={
          {users:[
            {name:'abel',email:'abel@mit.edu',password:'secret',balance:100},
            {name:'min',email:'mkim236@gmail.com',password:'abcd',balance:100},
            {name:'selly',email:'namselly56@gmail.com',password:'efg',balance:100}
          ],
          currentUser: null
          }}>
        
        <div className="container" style={{padding: "20px"}}>
          <Route path="/"         exact component={Home} />
          <Route path="/CreateAccount/" component={CreateAccount} />
          <Route path="/DeleteAccount/" component={DeleteAccount} />
          <Route path="/login/"         component={Login} />
          <Route path="/deposit/"       component={Deposit} />
          <Route path="/withdraw/"      component={Withdraw} />
          <Route path="/alldata/"       component={AllData} />
        </div>
      </UserContext.Provider>    
    </HashRouter>
  );
}

ReactDOM.render(
  <Spa/>,
  document.getElementById('root')
);
