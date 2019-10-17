import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import sortdown from './img/sortdown.png';
import sortup from './img/sortup.png'

class App extends Component {
  constructor(){
    super();
    this.state={
      listData:[],
      data:0,
      setData:10,
      firstNameSort:false,
      filterData:[],
      searchString:"",
      countData:0
    }
    this.handleLink = this.handleLink.bind(this);
  }
  componentWillMount(){
    axios
    .get('https://my.api.mockaroo.com/users.json?key=cde45810')
  .then(res =>{ 
     this.setState({listData:res.data})
  })
   
  };
  //Handle last name filter
  dataFilterHandler = (e ,data) => {
    let currentList = [];
        this.finalList = [];
        if (e.target.value !== "") {
            currentList= this.state.listData? this.state.listData:"";
            currentList.filter(item => {
            const lc = item&&item[`${data}`]?item[`${data}`].toLowerCase():"";
            const filter = e.target.value.toLowerCase();
            var datass=lc.includes(filter);
            if(datass){
                this.finalList.push(
                    item
                );
            }});
        }
        else{
            this.finalList=this.state.listData?this.state.listData:"";
        }
        this.setState({filterData:this.finalList, searchString:e.target.value})
  }
  // next button handle 
  nextHandler = () => {
    if(this.state.data < (this.tableListData && this.tableListData.length/  this.state.setData -1)){
      this.setState({data:this.state.data + 1})
    }
    if(this.state.data < (this.tableListData && this.tableListData.length/  this.state.setData -1)){
      this.setState({ countData: this.state.countData + 1})
    }
  };

  // select dropdown handle
  handleSelect = (event) => {
    this.setState({ setData: event.target.value, countData:0, data:0 })
  }
  // sort by firstName
  firstNameSortHandler = () => {
     this.state.listData.sort((a, b) => { 
              if (a.first_name === b.first_name) {
                return a > b ? 1 : -1;
              }
              if(this.state.firstNameSort){
                return a.first_name > b.first_name ? -1 : 1;
              }
              else{
                return a.first_name > b.first_name ? 1 : -1;
              }
            })
    this.setState({firstNameSort: !this.state.firstNameSort})

  }
  //handle back button click
  backhandlerHandler = () => {
    if(this.state.data >=1){
      this.setState({data:this.state.data - 1})
      if(this.state.countData>0){
        this.setState({countData:this.state.countData - 1})
      }
    }
  };
  // hadle link
  handleLink(data) {
  this.setState({countData:data-1,data:data-1})
  };
  // render
  render() {
    var GetTableData =[]
    this.tableListData =this.state.searchString&&this.state.searchString.length>0?this.state.filterData:( this.state.listData ?this.state.listData:"")
    this.tableListData&&this.tableListData.forEach((data, index) =>{
      // for fetching the detail in table
      if(index >= this.state.data *  this.state.setData  && index < (this.state.data + 1) *  this.state.setData  && index <100)
      GetTableData.push(
        <tr className={index%2 ===0 ? "color-row":"simple-row"}>
          <td className="first-name">{data.first_name}</td>
          <td className="last-name">{data.last_name}</td>
          <td className="email">{data.email}</td>
          <td className="gender">{data.gender}</td>
        </tr>
      );
    })
    // for showing the list of link
    var linkData =[];
    var linkDataList=[];
    var linkCount = this.tableListData&&this.tableListData.length/this.state.setData>=1?Math.ceil(this.tableListData.length/this.state.setData):1;
    for(var i=1; i <= linkCount; i++){
      linkData.push(
        i
      )
    }
// for showing the active link
    linkData&&linkData.forEach((object, index) => {
      linkDataList.push(
        <div className={(this.state.countData  === object-1)?"active-link":"unactive-link"} onClick={() => this.handleLink(index + 1)}> {object}</div>
      )
    });
    return (
      <div className="App">
        <div className="table-container"> 
          <table className="table">
              <thead>
                <tr className="table-header">
                  <th onClick={this.firstNameSortHandler}>
                     <p> FirstName<img src={this.state.firstNameSort? sortup: sortdown} /></p>
                  </th>
                  <th> LastName</th>
                  <th>Email</th>
                  <th> Gender</th>
                </tr>
                <tr className="table-header">
                  <th>
                  <input 
                   className="input"
                   onChange={ (e) => this.dataFilterHandler(e, "first_name")}/>
                  </th>
                  <th>
                  <input
                   className="input" 
                   onChange={ (e) => this.dataFilterHandler(e, "last_name")}/>
                  </th>
                  <th>
                  <input
                   className="input" 
                   onChange={ (e) => this.dataFilterHandler(e, "email")}/>
                  </th>
                  <th>
                  <input
                   className="input" 
                   onChange={ (e) => this.dataFilterHandler(e, "gender")}/>
                  </th>
                </tr>
              </thead>
              <tbody>
                {GetTableData}
              </tbody>
            </table>
            <div className="bottom-container" >
              <div className="bottom-left">
                <div onClick={this.backhandlerHandler} className="button-class">{"prev"}</div>
                   { linkDataList} 
                <div onClick={this.nextHandler} className="button-class">{"next"}</div>
              </div>
              <div className="bottom-right">
                <select
                onChange={this.handleSelect}
                className="ant-input selectBox"
                style={{ width: 100 }}
                placeholder="Select list Count"
                ref={ref => {
                  this._select = ref
                }}
                defaultValue={this.state.value}>
                  <option>10</option>
                  <option>20</option>
                  <option>30</option>
                  <option>40</option>
                  <option>50</option>
                </select>
                <div className="show-info">
                  {" showing " + this.state.setData + " records"}
                </div>
              </div> 
            </div>
          </div>

        <div>
        </div>
      </div>
    );
  }
}

export default App;
