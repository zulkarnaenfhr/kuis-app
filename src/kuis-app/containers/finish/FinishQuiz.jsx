import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import styles from "./FinishQuiz.module.css";

class FinishQuiz extends Component {
    constructor(props) {
        super(props);

        this.state = {
            status: "",
        };
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
                status: `Keep your head up, you got ${percent}% correct answer`,
            });
        }
    }
    render() {
        return (
            <div id={styles["FinishQuiz"]}>
                <Row className={styles["FinishQuiz-Content-Container"]}>
                    <Col className={styles["Column-Container"]}>
                        <div>
                            <h1 className={styles["FinishQuiz-Text"]}>Quiz Finish</h1>
                            <h1 className={styles["FinishQuiz-Text"]}>{this.state.status}</h1>
                        </div>
                    </Col>
                    <Col className={styles["Column-Container"]}>
                        <div>
                            <img className={styles["Finish-Vector"]} src={require("../../src/Finish-Vector.png")} alt="" />
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default FinishQuiz;
