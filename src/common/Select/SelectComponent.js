import Select from "react-select";
import "./Select.css";

const SelectComponent = ({ title, value, ...rest }) => {
  return (
    <div className="selectContainer">
      <span>{title}</span>
      <Select {...rest} className="select" />
    </div>
  );
};

export default SelectComponent;
