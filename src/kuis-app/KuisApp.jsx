import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./global.css";
import StartQuiz from "./containers/start/StartQuiz";
import QuestionQuiz from "./containers/question/QuestionQuiz";
import FinishQuiz from "./containers/finish/FinishQuiz";
import Aos from "aos";
import "aos/dist/aos.css";
const axios = require("axios");

const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

class KuisApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            question: [],
            statusPage: "start",
            // statusPage: "start",
            category: [18, 19, 11, 12, 27],
            rightAnswer: "",
            number: "",
        };
        this.handleStartClick = this.handleStartClick.bind(this);
    }

    handleStartClick = async (status, dataApi) => {
        if (dataApi.category === "") {
            let randomCategory = this.state.category[Math.floor(Math.random() * (5 - 0) + 0)];
            let dataApiTemp = { ...dataApi };
            dataApiTemp["category"] = randomCategory;

            await axios.get(`https://opentdb.com/api.php?amount=${dataApiTemp.numberOfQuestion}&category=${dataApiTemp.category}&difficulty=${dataApiTemp.difficulty}&type=multiple`).then((resp) => {
                resp.data.results.map(async (item) => {
                    await item.question.replaceAll(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gim, "");
                    await item.question.replaceAll("&amp;", "&");
                    await item.question.replaceAll("&#039", "'");
                    // console.log(questionTemp);
                    this.state.question.push({
                        question: item.question.replaceAll("&quot;", `"`),
                        options: shuffle([...item.incorrect_answers, item.correct_answer]),
                        correctAnswer: item.correct_answer,
                    });
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

    handleQuizFinish = (status, rightAnswer, number) => {
        this.setState({
            statusPage: status,
            number: number,
            rightAnswer: rightAnswer,
        });
    };

    componentDidMount() {
        Aos.init({
            duration: 1000,
        });
    }

    handlePlayAgain = (status) => {
        this.setState({
            question: [],
            statusPage: status,
        });
    };

    render() {
        return (
            <div>
                {this.state.statusPage === "start" ? (
                    <StartQuiz onStartClick={(status, dataApi) => this.handleStartClick(status, dataApi)} />
                ) : this.state.statusPage === "quiz" ? (
                    <QuestionQuiz dataKuis={this.state.question} onQuizFinish={(status, rightAnswer, number) => this.handleQuizFinish(status, rightAnswer, number)} />
                ) : this.state.statusPage === "finish" ? (
                    <FinishQuiz rightAnswer={this.state.rightAnswer} number={this.state.number} onPlayAgain={(status) => this.handlePlayAgain(status)} />
                ) : (
                    ""
                )}{" "}
            </div>
        );
    }
}

export default KuisApp;
