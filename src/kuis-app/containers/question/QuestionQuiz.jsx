import React, { Component } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./QuestionQuiz.module.css";

class QuestionQuiz extends Component {
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
                    <div>
                        <h1>masuk question kuis</h1>
                        <button onClick={() => console.log(this.props.dataKuis)}>data</button>
                    </div>
                </motion.div>
            </AnimatePresence>
        );
    }
}

export default QuestionQuiz;
