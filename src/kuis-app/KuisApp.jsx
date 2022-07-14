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
            category: [18, 19, 11, 12, 27],
        };
        this.handleStartClick = this.handleStartClick.bind(this);
    }

    handleStartClick = async (status, dataApi) => {
        if (dataApi.category === "") {
            let randomCategory = this.state.category[Math.floor(Math.random() * (5 - 0) + 0)];
            let dataApiTemp = { ...dataApi };
            dataApiTemp["category"] = randomCategory;

            await axios.get(`https://opentdb.com/api.php?amount=${dataApiTemp.numberOfQuestion}&category=${dataApiTemp.category}&difficulty=${dataApiTemp.difficulty}&type=multiple`).then((resp) => {
                this.setState({
                    question: resp.data.results,
                });
            });

            this.setState({
                statusPage: status,
            });
        } else {
            await axios.get(`https://opentdb.com/api.php?amount=${dataApi.numberOfQuestion}&category=${dataApi.category}&difficulty=${dataApi.difficulty}&type=multiple`).then((resp) => {
                this.setState({
                    question: resp.data.results,
                });
            });

            this.setState({
                statusPage: status,
            });
        }
    };

    render() {
        return (
            <div>{this.state.statusPage === "start" ? <StartQuiz onStartClick={(status, dataApi) => this.handleStartClick(status, dataApi)} /> : this.state.statusPage === "quiz" ? <QuestionQuiz dataKuis={this.state.question} /> : ""} </div>
        );
    }
}

export default KuisApp;
