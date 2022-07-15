import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./global.css";
import StartQuiz from "./containers/start/StartQuiz";
import QuestionQuiz from "./containers/question/QuestionQuiz";
import FinishQuiz from "./containers/finish/FinishQuiz";
import Aos from "aos";
import "aos/dist/aos.css";
var he = require("he");
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
        this.handleQuizFinish = this.handleQuizFinish.bind(this);
        this.handlePlayAgain = this.handlePlayAgain.bind(this);
    }

    handleStartClick = async (status, dataApi) => {
        if (dataApi.category === "") {
            let randomCategory = this.state.category[Math.floor(Math.random() * (5 - 0) + 0)];
            let dataApiTemp = { ...dataApi };
            dataApiTemp["category"] = randomCategory;

            await axios.get(`https://opentdb.com/api.php?amount=${dataApiTemp.numberOfQuestion}&category=${dataApiTemp.category}&difficulty=${dataApiTemp.difficulty}&type=multiple`).then((resp) => {
                resp.data.results.map(async (item) => {
                    let questionTemp = he.decode(item.question);
                    let correctAnswerTemp = he.decode(item.correct_answer);
                    let tempIncorrectAnswer1 = he.decode(item.incorrect_answers[0]);
                    let tempIncorrectAnswer2 = he.decode(item.incorrect_answers[1]);
                    let tempIncorrectAnswer3 = he.decode(item.incorrect_answers[2]);
                    let tempIncorrectAnswerArray = [tempIncorrectAnswer1, tempIncorrectAnswer2, tempIncorrectAnswer3];
                    this.state.question.push({
                        question: questionTemp,
                        options: shuffle([...tempIncorrectAnswerArray, item.correct_answer]),
                        correctAnswer: correctAnswerTemp,
                    });
                });
            });

            this.setState({
                statusPage: status,
            });
        } else {
            await axios.get(`https://opentdb.com/api.php?amount=${dataApi.numberOfQuestion}&category=${dataApi.category}&difficulty=${dataApi.difficulty}&type=multiple`).then((resp) => {
                resp.data.results.map(async (item) => {
                    let questionTemp = he.decode(item.question);
                    let correctAnswerTemp = he.decode(item.correct_answer);
                    let tempIncorrectAnswer1 = he.decode(item.incorrect_answers[0]);
                    let tempIncorrectAnswer2 = he.decode(item.incorrect_answers[1]);
                    let tempIncorrectAnswer3 = he.decode(item.incorrect_answers[2]);
                    let tempIncorrectAnswerArray = [tempIncorrectAnswer1, tempIncorrectAnswer2, tempIncorrectAnswer3];
                    this.state.question.push({
                        question: questionTemp,
                        options: shuffle([...tempIncorrectAnswerArray, item.correct_answer]),
                        correctAnswer: correctAnswerTemp,
                    });
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
