import React, { Component } from "react";
import styles from "./StartQuiz.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { Container, Row, Col } from "react-bootstrap";

export default class StartQuiz extends Component {
    constructor(props) {
        super(props);

        this.state = {
            first: "",
        };
        this.handleStartClick = this.handleStartClick.bind(this);
    }
    handleStartClick = () => {
        this.props.onStartClick("quiz");
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
                    <div key="loading-page" id={styles["StartQuiz"]}>
                        <Row>
                            <Col md={5} className={styles["Column-Left"]}>
                                <form action="" className={styles["Column-Left-Form"]}>
                                    <label htmlFor="">Number of Question</label>
                                    <br />
                                    <input type="number" name="" defaultValue={10} min={0} max={20} />
                                    <br />
                                    <label htmlFor="">Select Category</label>
                                    <br />
                                    <select name="" id="">
                                        <option value="18">Science: Computers</option>
                                        <option value="19">Science: Mathematics</option>
                                        <option value="27">Animals</option>
                                        <option value="11">Entertainment: Film</option>
                                        <option value="12">Entertainment: Music</option>
                                    </select>
                                    <label htmlFor="">Select Difficulty</label>
                                    <br />
                                    <select name="" id="">
                                        <option value="easy">Easy</option>
                                        <option value="medium">Medium</option>
                                        <option value="hard">Hard</option>
                                    </select>
                                </form>
                            </Col>
                            <Col md={7} className={styles["Column-Right"]}>
                                <img className={styles["Column-Right-Vector"]} src={require("../../src/Start-Vector.png")} alt="" />
                            </Col>
                        </Row>
                    </div>
                </motion.div>
            </AnimatePresence>
        );
    }
}
