function Divider({ style }) {
  const styles = {
    ...style,
    ...{
      backgroundColor: "#dedede",
      border: "none",
      height: "1px",
      margin: "10px 0 10px 0",
    },
  };
  return <hr style={styles} />;
}

export default Divider;
