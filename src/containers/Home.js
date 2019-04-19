import React, { Component } from "react";
import { API } from "aws-amplify";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { PageHeader, ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import "./Home.css";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      garden: [],
      year: ""
    };
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }

    try {
      const garden = await this.garden();
      console.log([{}].concat(garden));
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

  getPlants (garden) {
    return garden.plants.map(
      (plant, i) =>
        plant.myPlant.year === this.state.year.toString()
          ? <div key={i} >{plant.myPlant.name}</div>
          : <div key={i}></div>
    )
  }

  setDateSelect = (date) => {
      let year = (parseInt(date) - 3);
      while ((parseInt(date)-3) < (parseInt(date)+20)) {
      year ++;
      <option value={year}>{year}</option>;
    }
  }

  renderGardenBed(garden) {
    return [{}].concat(garden).map(
      (garden, i) =>
        i !== 0
          ? <LinkContainer
              key={garden.bedId}
              to={`/garden/${garden.bedId}`}
              className="bedlink"
            >
              <ListGroupItem header={garden.name}>
              {this.getPlants(garden)}
              </ListGroupItem>
            </LinkContainer>
          : <LinkContainer
              key="new"
              to="/garden/new"
            >
              <ListGroupItem>
                <h4>
                  <b>{"\uFF0B"}</b> Create a new garden bed
                </h4>
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
      <div className="gardenbeds">
        <PageHeader>Your Beds</PageHeader>
        <h4>Planting Year: {this.state.year} </h4>
        <h5>Change Year:</h5>
        <FormControl componentClass="select">
        {this.setDateSelect(this.state.year)}
        </FormControl>
        <ListGroup>
          {!this.state.isLoading && this.renderGardenBed(this.state.garden)}
        </ListGroup>
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
