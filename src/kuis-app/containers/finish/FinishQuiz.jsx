import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import styles from "./FinishQuiz.module.css";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, motion } from "framer-motion";

class FinishQuiz extends Component {
    constructor(props) {
        super(props);

        this.state = {
            status: "",
        };
        this.handlePlayAgain = this.handlePlayAgain.bind(this);
    }
    componentDidMount() {
        let percent = (this.props.rightAnswer / (this.props.number + 1)) * 100;
        if (percent > 80) {
            this.setState({
                status: `Congratulation, you got ${percent}% correct answer`,
            });
        } else if (80 >= percent > 50) {
            this.setState({
                status: `You did it well, you got ${percent}% correct answer`,
            });
        } else {
            this.setState({
                status: `Keep your head up, and just try again. you got ${percent}% correct answer`,
            });
        }
    }
    handlePlayAgain = () => {
        this.props.onPlayAgain("start");
    };
    render() {
        return (
            <AnimatePresence exitBeforeEnter>
                <motion.div
                    initial="pageInitial"
                    animate="pageAnimate"
                    variants={{
                        pageInitial: {
                            opacity: 0,
                        },
                        pageAnimate: {
                            opacity: 1,
                            transition: { duration: 1.5 },
                        },
                        pageExit: {
                            opacity: 0,
                            transition: {
                                duration: 6,
                            },
                        },
                    }}
                    exit="pageExit"
                    key="loading-page"
                >
                    <div id={styles["FinishQuiz"]}>
                        <Row className="justify-content-md-center">
                            <Col md={6} className={styles["Column-Left"]}>
                                <div>
                                    <h1 data-aos="fade-right" className={styles["FinishQuiz-Text"]}>
                                        Quiz Finish
                                    </h1>
                                    <h1 data-aos="fade-right" data-aos-delay="200" className={styles["FinishQuiz-Text"]}>
                                        {this.state.status}
                                    </h1>
                                    <div className={styles["FinishQuiz-Button-Row"]}>
                                        <button data-aos="fade-right" data-aos-delay="400" onClick={this.handlePlayAgain} className={styles["FinishQuiz-Button"]}>
                                            Play Again{" "}
                                            <span>
                                                <FontAwesomeIcon icon={faArrowRight} />
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </Col>
                            <Col md={6} className={styles["Column-Right"]}>
                                <div>
                                    <img className={styles["Finish-Vector"]} src={require("../../src/Finish-Vector.png")} alt="" />
                                </div>
                            </Col>
                        </Row>
                    </div>
                </motion.div>
            </AnimatePresence>
        );
    }
}

export default FinishQuiz;
