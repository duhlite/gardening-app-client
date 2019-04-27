import React, { Component } from "react";
import { API } from "aws-amplify";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { PageHeader, ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import vegBase from "../Vegetable";
import "./Home.css";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      garden: [],
      year: "",
      display: false
    };
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }

    try {
      const garden = await this.garden();
      this.setState({ garden });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
    this.getdate();
  }

  garden() {
    return API.get("dev-garden-api", "/garden");
  }

  getdate() {
    let d = new Date();
    this.setState({year: d.getFullYear()});
  }

  getIdea = event => {
    let g = this.state.garden;
    this.makeRecommend(g);
    this.setState({display: true})
  }

  getPlants (garden) {
    return garden.plants.map(
      (plant, i) =>
        plant.myPlant.year === this.state.year.toString()
          ? <span key={i} >{plant.myPlant.name}</span>
          : null
    )
  }

  makeRecommend (garden) {
    const rec = [];
    for(let x of garden) {
      let t = [];
      for(let y of x.plants) {
        t.push(y.myPlant.year === this.state.year.toString())
      }
      if(!t.includes(true)) {
        let plant = x.plants.find(y => y.myPlant.year === (this.state.year-1).toString());
        let id = vegBase.find(y => y.speciesId.toString() === plant.myPlant.speciesId);
        if(id.rotation === 0){
          rec.push({name: x.name, plants: x.speciesName})
        } else if(id.rotation === 5) {
          let list = vegBase.filter(x => x.rotation === 1);
          rec.push({name: x.name, plants: list})
        } else {
          let list = vegBase.filter(x => x.rotation === (id.rotation+1));
          rec.push({name: x.name, plants: list})
        }
      }
    }
    this.setState({rec: rec});
    console.log(rec);
  }

  setDateSelect(date) {
    const menu = [];
    for(let x = (parseInt(date)-3);x<=(parseInt(date)+10);x++){
      menu.push(<option value={x.toString()} key={x}>{x}</option>);
    }
    return menu;
  }

  dateChange = event => {
    this.setState({year: event.target.value})
  }

  renderRec(rec) {
    return rec.map(
      (x) =>
      <div key={x.name} className="rec-body">
        <h4 className="rec-title">{x.name}</h4>
        <div className="rec-scroll">
         <ul>
         {x.plants.map(
           (x) =>
           <li key={x.species}>{x.species}</li>
         )}
         </ul>
        </div>
      </div>
    )
  }

  renderGardenBed(garden) {
    return garden.map(
      (garden, i) =>
            <LinkContainer
              key={garden.bedId}
              to={`/garden/${garden.bedId}`}
              className="bedlink"
            >
              <ListGroupItem header={garden.name}>
              {this.getPlants(garden)}
              </ListGroupItem>
            </LinkContainer>
    );
  }

  renderLander() {
    return (
      <div className="lander">
        <h1>Gardening App</h1>
        <p>work in progress</p>
        <div>
          <Link to="/login" className="btn btn-info btn-lg">
            Login
          </Link>
          <Link to="/signup" className="btn btn-success btn-lg">
            Signup
          </Link>
        </div>
      </div>
    );
  }

  renderBeds() {
    return (
      <div className="container">
        <PageHeader>Your Beds</PageHeader>
        <div className="datebar">
          <h4>Planting Year: {this.state.year} </h4>
          <div id="year">
            <h5>Change Year:</h5>
            <FormControl 
              componentClass="select" 
              onChange={this.dateChange}
              id="year-select"
              value={this.state.year}
            >
              {this.setDateSelect(this.state.year)}
            </FormControl>
          </div>
          <LinkContainer
            key="new"
            to="/garden/new"
            id="newbed"
          >
            <ListGroupItem>
              <h4>
                <b>{"\uFF0B"}</b> New garden bed
              </h4>
            </ListGroupItem>
          </LinkContainer>
        </div>
        <ListGroup id="beds">
          {!this.state.isLoading && this.renderGardenBed(this.state.garden)}
        </ListGroup>
        <button onClick={this.getIdea} id="recButton">Recommend Plants</button>
        <div className="rec-holder">
          {this.state.display && this.renderRec(this.state.rec)}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="Home">
        {this.props.isAuthenticated ? this.renderBeds() : this.renderLander()}
      </div>
    );
  }
}
