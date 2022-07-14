import React, { Component } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./QuestionQuiz.module.css";
import { Col, Row } from "react-bootstrap";

class QuestionQuiz extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataKuis: this.props.dataKuis,
            number: 0,
            rightAnswer: 0,
            seconds: 10,
        };
        this.handleAnswer = this.handleAnswer.bind(this);
    }

    handleAnswer = (event) => {
        if (this.state.number === this.props.dataKuis.length - 1) {
            this.props.onQuizFinish("finish", this.state.rightAnswer, this.state.number);
        } else {
            if (this.state.dataKuis[this.state.number].correctAnswer === event.target.value) {
                this.setState({
                    rightAnswer: this.state.rightAnswer + 1,
                    number: this.state.number + 1,
                    seconds: 10,
                });
            } else {
                this.setState({
                    seconds: 10,
                    number: this.state.number + 1,
                });
            }
        }
    };

    componentDidMount() {
        this.myInterval = setInterval(() => {
            const { seconds } = this.state;
            if (seconds > 0) {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 0.5,
                }));
            } else {
                if (seconds === 0 && this.state.number === 9) {
                    this.props.onQuizFinish("finish", this.state.rightAnswer, this.state.number);
                }
                if (seconds === 0) {
                    clearInterval(this.myInterval);
                } else {
                    this.setState({
                        seconds: 10,
                        number: this.state.number + 1,
                    });
                }
            }
        }, 1000);
    }

    render() {
        return (
            <AnimatePresence>
                <motion.div
                    key="currentpaeg"
                    initial="pageInitial"
                    animate="pageAnimate"
                    variants={{
                        pageInitial: {
                            opacity: 0,
                            transition: { duration: 1.5 },
                        },
                        pageAnimate: {
                            opacity: 1,
                        },
                    }}
                    transition={{
                        duration: 1,
                        ease: "easeInOut",
                    }}
                    exit="pageInitial"
                    className="loading-page"
                >
                    <div id={styles["QuestionPage"]}>
                        <div>
                            <Row>
                                <Col>
                                    <h1 className={styles["QuestionPage-TimeRemaining"]}>Time Remaining {this.state.seconds}</h1>
                                </Col>
                                <Col>
                                    <h1 className={styles["QuestionPage-CorrectAnswer-Indicator"]}>
                                        Correct Answer {this.state.rightAnswer}/{this.state.number + 1}{" "}
                                    </h1>
                                </Col>
                            </Row>
                            <div className={styles["QuestionPage-Content-Container"]}>
                                <h1 className={styles["QuestionPage-Title"]}>{this.state.dataKuis[this.state.number].question}</h1>
                                <Row>
                                    {this.state.dataKuis[this.state.number].options.map((jawaban) => (
                                        <Col key={jawaban} md={6}>
                                            <button onClick={this.handleAnswer} className={styles["AnswerButton"]} value={jawaban}>
                                                {jawaban}
                                            </button>
                                        </Col>
                                    ))}
                                </Row>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        );
    }
}

export default QuestionQuiz;
