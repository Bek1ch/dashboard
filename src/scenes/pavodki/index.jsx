import Iframe from "react-iframe";

const IframePage = () => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Iframe
        url="https://app.powerbi.com/view?r=eyJrIjoiZTlkNTlhMDEtZWY0ZC00MjQ3LWI1ZDYtY2MyMmVmZGFhZDlmIiwidCI6IjVhODRlYTRhLTg5ZjktNDFjYy04NGZiLTQ5MTM1YWJjNjZjOCIsImMiOjl9"
        width="100%"
        height="100%"
        id="situation_floods"
        className="floods"
        display="block"
        position="relative"
      />
    </div>
  );
};

export default IframePage;
