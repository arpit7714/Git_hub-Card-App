
function Cardlist (props){
  const len  = props.profile.length;
  var rows = [];
  for (var i = 0; i < len; i++) {
      rows.push(<Cards {...props.profile[i]} />);
  }
  return (
    <div>
      {rows}
   </div>
  );
  
}

class Cards extends React.Component{
  render(){
    const profile = this.props;
    return (
      <div className="github-profile" style={{ margin : '1rem' , color: Math.random() < 0.5 ? 'black' : 'red' }}>
          <img style = {{ width: 100 , height: 100,  }}src={profile.avatar_url}/>
            <div className="info" style={{display : 'inline-block', margin:10 }}>
              <div className="name" style={{  }}>{profile.name}</div>
               <div className="company">{ profile.company }</div>
            </div>
      </div>
    );
  }
}
class Input extends React.Component{
  state = { username : ''} ;
  handlesubmit = async (event) => {
       event.preventDefault();
       const resp = await axios.get(`https://api.github.com/users/${this.state.username}`)
       // console.log(resp.data)
       this.props.onsubmit(resp.data);
       // console.log(this.state.username)
   };
    render(){
     return ( 
          <form onSubmit = { this.handlesubmit }  style={{ magin:30 , padding: 40,  border: '4px solid #eee', }}>
             <input placeholder="Github_user" value = { this.state.username } onChange={event => this.setState({username : event.target.value})} required/>
         <button>Add User </button>
         </form>
       );
    }
}
class App extends React.Component{
  state = {
    profile : [],
  }
  addnewprofile  = (newpro) => {
    console.log({newpro});
    this.setState(prevState => ({
      profile: [...prevState.profile, newpro]
    }))
  };
  render(){
     return( 
        <div>
           <div className="header" style={{color: Math.random() < 0.4 ? 'blue' : 'green', padding:20}}>
             {this.props.title}
           </div>
          <Input onsubmit = {this.addnewprofile}/>
           <Cardlist profile = {this.state.profile} />
       </div>  
     );
   }
  
}

ReactDOM.render(
  <App title="The GitHub Card Application" />,
  document.getElementById('mountNode'),
);