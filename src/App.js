import React, { Component } from "react";
import Customer from "./components/Customer";
import CustomerAdd from "./components/CustomerAdd";
import "./App.css";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
// import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: "20px",
    overflowX: "auto"
  },
  table: {
    minWidth: 1080
  },
  prograss: {
    margin: "20px"
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: "",
      completed: 0
    };
    this.stateRefresh = this.stateRefresh.bind(this);
  }

  stateRefresh() {
    this.setState({
      customers: "",
      completed: 0
    });
    this.callApi()
      .then(res => this.setState({ customers: res }))
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then(res => this.setState({ customers: res }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch("/api/customers");
    const body = await response.json();
    return body;
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  };

  render() {
    return (
      <div>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Birth</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Job</TableCell>
                <TableCell> </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.customers
                ? this.state.customers.map(c => {
                    return (
                      <Customer
                        stateRefresh={this.stateRefresh}
                        key={c.id}
                        id={c.id}
                        image={c.image}
                        name={c.name}
                        birthday={c.birthday}
                        gender={c.gender}
                        job={c.job}
                      />
                    );
                  })
                : ""}
              <TableRow>
                {/* <TableCell colSpan="6" align="center">
                <CircularProgress className={classes.prograss} variant="determinate" value={this.state.completed} />
              </TableCell> */}
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
        <CustomerAdd stateRefresh={this.stateRefresh} />
      </div>
    );
  }
}
export default withStyles(styles)(App);
