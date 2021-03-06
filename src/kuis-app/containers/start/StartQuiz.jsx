import React, { Component } from "react";
import styles from "./StartQuiz.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { Row, Col } from "react-bootstrap";

export default class StartQuiz extends Component {
    constructor(props) {
        super(props);

        this.state = {
            option: {
                numberOfQuestion: 10,
                category: "",
                difficulty: "",
            },
        };
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        this.props.onStartClick("quiz", this.state.option);
    };

    handleCategoryChange = (name, value) => {
        let optionTemp = { ...this.state.option };
        optionTemp[name] = value;
        this.setState({
            option: optionTemp,
        });
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
                            <Col lg={5} className={styles["Column-Left"]}>
                                <div
                                    style={{
                                        width: "100%",
                                        maxWidth: "400px",
                                    }}
                                >
                                    <h1 data-aos="fade-right">Trivia Quiz</h1>
                                    <p data-aos="fade-right" data-aos-delay="100">
                                        Select Option
                                    </p>
                                    <form action="" className={styles["Column-Left-Form"]} data-aos="fade-right" data-aos-delay="200">
                                        <label data-aos="fade-right" data-aos-delay="300" className={styles["Column-Left-Form-Label"]} htmlFor="">
                                            Number of Question
                                        </label>
                                        <br />
                                        <input
                                            data-aos="fade-right"
                                            data-aos-delay="400"
                                            onChange={(e) => this.handleCategoryChange(e.target.name, e.target.value)}
                                            className={styles["Columnt-Left-Form-Input"]}
                                            type="number"
                                            name="numberOfQuestion"
                                            defaultValue={10}
                                            min={0}
                                            max={20}
                                        />
                                        <br />
                                        <label data-aos="fade-right" data-aos-delay="500" className={styles["Column-Left-Form-Label"]} htmlFor="">
                                            Select Category
                                        </label>
                                        <br />
                                        <select data-aos="fade-right" data-aos-delay="600" onChange={(e) => this.handleCategoryChange(e.target.name, e.target.value)} className={styles["Columnt-Left-Form-Input"]} name="category" id="">
                                            <option value="">Any Type</option>
                                            <option value="18">Science: Computers</option>
                                            <option value="19">Science: Mathematics</option>
                                            <option value="27">Animals</option>
                                            <option value="11">Entertainment: Film</option>
                                            <option value="12">Entertainment: Music</option>
                                        </select>
                                        <br />
                                        <label data-aos="fade-right" data-aos-delay="700" className={styles["Column-Left-Form-Label"]} htmlFor="">
                                            Select Difficulty
                                        </label>
                                        <br />
                                        <select data-aos="fade-right" data-aos-delay="800" onChange={(e) => this.handleCategoryChange(e.target.name, e.target.value)} className={styles["Columnt-Left-Form-Input"]} name="difficulty" id="">
                                            <option value="">Any Type</option>
                                            <option value="easy">Easy</option>
                                            <option value="medium">Medium</option>
                                            <option value="hard">Hard</option>
                                        </select>
                                        <div data-aos="fade-right" data-aos-delay="900" className={styles["Columnt-Left-Form-Submit-Row"]}>
                                            <button onClick={this.handleFormSubmit} className={styles["Columnt-Left-Form-Submit"]} type="submit">
                                                Mulai
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </Col>
                            <Col lg={7} className={styles["Column-Right"]}>
                                <img className={styles["Column-Right-Vector"]} src={require("../../src/Start-Vector.png")} alt="" />
                            </Col>
                        </Row>
                    </div>
                </motion.div>
            </AnimatePresence>
        );
    }
}
