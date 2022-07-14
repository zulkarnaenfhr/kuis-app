import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./global.css";
import StartQuiz from "./containers/start container/StartQuiz";
import QuestionQuiz from "./containers/question/QuestionQuiz";
const axios = require("axios");

class KuisApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            question: "",
            statusPage: "start",
        };
        this.handleStartClick = this.handleStartClick.bind(this);
    }

    componentDidMount() {
        axios.get("https://opentdb.com/api.php?amount=10&category=26&difficulty=easy&type=multiple").then((resp) => {
            this.setState({
                question: resp.data.results,
            });
        });
    }

    handleStartClick = (status) => {
        this.setState({
            statusPage: status,
        });
    };

    render() {
        return <div>{this.state.statusPage === "start" ? <StartQuiz onStartClick={(status) => this.handleStartClick(status)} /> : this.state.statusPage === "quiz" ? <QuestionQuiz /> : ""}</div>;
    }
}

export default KuisApp;
