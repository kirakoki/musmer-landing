import { motion } from "framer-motion";
import { styles } from "../styles";
import { staggerContainer } from "../utils/motion";

const StarWrapper = (Component, idName) => {
  // Accept props as an argument and pass them to the wrapped component
  return function HOC(props) {
    return (
      <motion.section
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
      >
        <span className="hash-span" id={idName}>
          &nbsp;
        </span>

        {/* Pass the received props to the wrapped Component */}
        <Component {...props} />
      </motion.section>
    );
  };
};

export default StarWrapper;
